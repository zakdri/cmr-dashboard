<?php

declare(strict_types=1);

header('Cache-Control: no-store');

const DEFAULT_GED_LIBRARY_PROTOCOL_URI = 'uri://vdoc/datastore/036-000002-000';
const DEFAULT_INTRANET_ROOT_PATH = 'Intranet CMR';
const DEFAULT_SMI_FILTER_PATH = 'Intranet CMR/Organisation & RSE/SMI';
const DEFAULT_CACHE_TTL_SECONDS = 300;
const DEFAULT_FOLDER_PROTOCOL_CACHE_TTL_SECONDS = 86400;

function respond(int $status, array $payload): void
{
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function load_config(): array
{
    $localConfig = __DIR__ . '/smi-config.local.php';
    $fileConfig = is_file($localConfig) ? require $localConfig : [];
    $cookieFile = tempnam(sys_get_temp_dir(), 'moovapps_smi_');
    if (is_string($cookieFile)) {
        register_shutdown_function(static function () use ($cookieFile): void {
            if (is_file($cookieFile)) {
                @unlink($cookieFile);
            }
        });
    }

    return [
        'moovapps_base_url' => rtrim((string)($fileConfig['moovapps_base_url'] ?? getenv('MOOVAPPS_BASE_URL') ?: 'http://localhost:8080'), '/'),
        'moovapps_file_base_url' => rtrim((string)($fileConfig['moovapps_file_base_url'] ?? getenv('MOOVAPPS_FILE_BASE_URL') ?: (($fileConfig['moovapps_base_url'] ?? getenv('MOOVAPPS_BASE_URL') ?: 'http://localhost:8080') . '/moovapps/portal')), '/'),
        'ged_library_protocol_uri' => (string)($fileConfig['ged_library_protocol_uri'] ?? getenv('GED_LIBRARY_PROTOCOL_URI') ?: DEFAULT_GED_LIBRARY_PROTOCOL_URI),
        'intranet_root_path' => trim((string)($fileConfig['intranet_root_path'] ?? getenv('INTRANET_ROOT_PATH') ?: DEFAULT_INTRANET_ROOT_PATH), '/'),
        'login' => (string)($fileConfig['login'] ?? getenv('MOOVAPPS_LOGIN') ?: ''),
        'password' => (string)($fileConfig['password'] ?? getenv('MOOVAPPS_PASSWORD') ?: ''),
        'timeout' => (string)($fileConfig['timeout'] ?? getenv('MOOVAPPS_TIMEOUT') ?: '500'),
        'cache_enabled' => config_bool($fileConfig['cache_enabled'] ?? getenv('MOOVAPPS_DOCUMENTS_CACHE_ENABLED') ?: true),
        'cache_ttl_seconds' => max(0, (int)($fileConfig['cache_ttl_seconds'] ?? getenv('MOOVAPPS_DOCUMENTS_CACHE_TTL') ?: DEFAULT_CACHE_TTL_SECONDS)),
        'cache_dir' => (string)($fileConfig['cache_dir'] ?? getenv('MOOVAPPS_DOCUMENTS_CACHE_DIR') ?: (sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'cmr-dashboard-documents-cache')),
        'folder_protocol_uris' => normalize_folder_protocol_uris($fileConfig['folder_protocol_uris'] ?? []),
        'auto_resolve_folder_protocol_uris' => config_bool($fileConfig['auto_resolve_folder_protocol_uris'] ?? getenv('MOOVAPPS_AUTO_RESOLVE_FOLDER_PROTOCOL_URIS') ?: true),
        'folder_protocol_cache_ttl_seconds' => max(0, (int)($fileConfig['folder_protocol_cache_ttl_seconds'] ?? getenv('MOOVAPPS_FOLDER_PROTOCOL_CACHE_TTL') ?: DEFAULT_FOLDER_PROTOCOL_CACHE_TTL_SECONDS)),
        'cookie_file' => is_string($cookieFile) ? $cookieFile : '',
    ];
}

function config_bool($value): bool
{
    if (is_bool($value)) {
        return $value;
    }

    $normalized = strtolower(trim((string)$value));
    return !in_array($normalized, ['0', 'false', 'no', 'off'], true);
}

function normalize_folder_protocol_uris($value): array
{
    if (!is_array($value)) {
        return [];
    }

    $normalized = [];
    foreach ($value as $path => $protocolUri) {
        $path = normalize_path((string)$path);
        $protocolUri = trim((string)$protocolUri);
        if ($path !== '' && $protocolUri !== '' && strtoupper($protocolUri) !== 'CHANGE_ME') {
            $normalized[$path] = $protocolUri;
        }
    }

    uksort($normalized, static fn(string $a, string $b): int => count(split_path($b)) <=> count(split_path($a)));
    return $normalized;
}

function moovapps_post(array $config, string $module, string $cmd, array $body, ?string $token = null): array
{
    $query = [
        'module' => $module,
        'cmd' => $cmd,
        'flowmode' => 'json',
    ];

    if ($token !== null) {
        $query = ['_AuthenticationKey' => $token] + $query;
    }

    $url = $config['moovapps_base_url'] . '/moovapps/navigation/flow?' . http_build_query($query);
    $payload = json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'Accept: application/json'],
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 30,
    ]);
    if ($config['cookie_file'] !== '') {
        curl_setopt($ch, CURLOPT_COOKIEJAR, $config['cookie_file']);
        curl_setopt($ch, CURLOPT_COOKIEFILE, $config['cookie_file']);
    }

    $raw = curl_exec($ch);
    $error = curl_error($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($raw === false || $raw === '') {
        respond(502, ['error' => 'MOOVAPPS_EMPTY_RESPONSE', 'message' => $error ?: 'Moovapps n a retourne aucune donnee.']);
    }

    $decoded = json_decode((string)$raw, true);
    if (!is_array($decoded)) {
        respond(502, ['error' => 'MOOVAPPS_INVALID_JSON', 'status' => $status, 'raw' => substr((string)$raw, 0, 500)]);
    }

    if ($status >= 400) {
        respond(502, ['error' => 'MOOVAPPS_HTTP_ERROR', 'status' => $status, 'response' => $decoded]);
    }

    return $decoded;
}

function authenticate(array $config): string
{
    if ($config['login'] === '' || $config['password'] === '') {
        respond(500, [
            'error' => 'MOOVAPPS_CONFIG_MISSING',
            'message' => 'Configurer MOOVAPPS_LOGIN/MOOVAPPS_PASSWORD ou api/smi-config.local.php sur le serveur.',
        ]);
    }

    $response = moovapps_post($config, 'portal', 'authenticate', [
        'authenticate' => [
            'header' => [
                'login' => $config['login'],
                'password' => $config['password'],
                'timeout' => $config['timeout'],
            ],
        ],
    ]);

    $token = $response['authenticate']['body']['token']['@key'] ?? null;
    if (!is_string($token) || $token === '') {
        respond(502, ['error' => 'MOOVAPPS_TOKEN_MISSING', 'response' => $response]);
    }

    return $token;
}

function normalize_list($value): array
{
    if (!is_array($value)) {
        return [];
    }

    if ($value === []) {
        return [];
    }

    return is_sequential_array($value) ? $value : [$value];
}

function is_sequential_array(array $value): bool
{
    if ($value === []) {
        return true;
    }

    return array_keys($value) === range(0, count($value) - 1);
}

function contains_text(string $haystack, string $needle): bool
{
    return strpos($haystack, $needle) !== false;
}

function normalize_path(string $path): string
{
    return trim(str_replace('\\', '/', $path), '/');
}

function split_path(string $path): array
{
    return array_values(array_filter(explode('/', normalize_path($path)), static fn($segment) => $segment !== ''));
}

function path_starts_with(array $pathSegments, array $prefixSegments): bool
{
    if (count($prefixSegments) > count($pathSegments)) {
        return false;
    }

    foreach ($prefixSegments as $index => $segment) {
        if (!same_path_segment($pathSegments[$index], $segment)) {
            return false;
        }
    }

    return true;
}

function same_path_segment(string $left, string $right): bool
{
    $normalize = static function (string $value): string {
        $value = trim($value);
        $lower = function_exists('mb_strtolower') ? mb_strtolower($value, 'UTF-8') : strtolower($value);
        $ascii = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $lower);
        return preg_replace('/[^a-z0-9]+/', '', is_string($ascii) ? $ascii : $lower) ?? $lower;
    };

    return $normalize($left) === $normalize($right);
}

function find_path_prefix_offset(array $pathSegments, array $prefixSegments): ?int
{
    if ($prefixSegments === []) {
        return 0;
    }

    for ($index = 0; $index <= count($pathSegments) - count($prefixSegments); $index++) {
        if (path_starts_with(array_slice($pathSegments, $index), $prefixSegments)) {
            return $index;
        }
    }

    return null;
}

function path_after_marker(string $path, string $marker): string
{
    $pathSegments = split_path($path);
    $markerSegments = split_path($marker);

    $offset = find_path_prefix_offset($pathSegments, $markerSegments);
    if ($offset !== null) {
        return implode('/', array_slice($pathSegments, $offset + count($markerSegments)));
    }

    return normalize_path($path);
}

function document_scope_from_request(array $config): array
{
    $path = trim((string)($_GET['path'] ?? ''), '/');

    if ($path === '') {
        $space = trim((string)($_GET['space'] ?? ''), '/');
        $rubrique = trim((string)($_GET['rubrique'] ?? ''), '/');
        $sousRubrique = trim((string)($_GET['sousRubrique'] ?? ''), '/');

        if ($space !== '') {
            $path = implode('/', array_filter([
                $config['intranet_root_path'],
                $space,
                $rubrique,
                $sousRubrique,
            ], static fn($segment) => $segment !== ''));
        }
    }

    if ($path === '') {
        $path = DEFAULT_SMI_FILTER_PATH;
    }

    $normalizedPath = normalize_path($path);
    $folderProtocol = folder_protocol_uri_for_path($config, $normalizedPath);

    return [
        'filter_path' => $normalizedPath,
        'filter_segments' => split_path($normalizedPath),
        'scope_protocol_uri' => $folderProtocol['protocolUri'],
        'scope_protocol_path' => $folderProtocol['path'],
    ];
}

function folder_protocol_uri_for_path(array $config, string $filterPath): array
{
    $filterSegments = split_path($filterPath);
    foreach ($config['folder_protocol_uris'] as $configuredPath => $protocolUri) {
        $configuredSegments = split_path((string)$configuredPath);
        if (path_starts_with($filterSegments, $configuredSegments)) {
            return [
                'path' => (string)$configuredPath,
                'protocolUri' => (string)$protocolUri,
            ];
        }
    }

    return [
        'path' => '',
        'protocolUri' => '',
    ];
}

function cache_file_for_scope(array $config, array $scope): ?string
{
    if (!$config['cache_enabled'] || $config['cache_ttl_seconds'] <= 0) {
        return null;
    }

    $cacheDir = rtrim((string)$config['cache_dir'], "\\/");
    if ($cacheDir === '') {
        return null;
    }

    $key = sha1($config['ged_library_protocol_uri'] . '|' . $scope['filter_path']);
    return $cacheDir . DIRECTORY_SEPARATOR . 'documents-' . $key . '.json';
}

function read_cached_documents(array $config, array $scope): ?array
{
    if ((string)($_GET['refresh'] ?? '') === '1') {
        return null;
    }

    $cacheFile = cache_file_for_scope($config, $scope);
    if ($cacheFile === null || !is_file($cacheFile) || !is_readable($cacheFile)) {
        return null;
    }

    $age = time() - filemtime($cacheFile);
    if ($age > $config['cache_ttl_seconds']) {
        return null;
    }

    $cached = json_decode((string)file_get_contents($cacheFile), true);
    if (!is_array($cached) || !isset($cached['data'], $cached['meta'])) {
        return null;
    }

    $cached['meta']['cache'] = 'hit';
    $cached['meta']['cacheAgeSeconds'] = max(0, $age);
    return $cached;
}

function write_cached_documents(array $config, array $scope, array $payload): void
{
    $cacheFile = cache_file_for_scope($config, $scope);
    if ($cacheFile === null) {
        return;
    }

    $cacheDir = dirname($cacheFile);
    if (!is_dir($cacheDir) && !@mkdir($cacheDir, 0775, true) && !is_dir($cacheDir)) {
        return;
    }

    if (!is_writable($cacheDir)) {
        return;
    }

    $tmpFile = $cacheFile . '.' . bin2hex(random_bytes(4)) . '.tmp';
    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false || @file_put_contents($tmpFile, $json, LOCK_EX) === false) {
        if (is_file($tmpFile)) {
            @unlink($tmpFile);
        }
        return;
    }

    @rename($tmpFile, $cacheFile);
}

function folder_protocol_cache_file(array $config): ?string
{
    if (!$config['cache_enabled'] || $config['folder_protocol_cache_ttl_seconds'] <= 0) {
        return null;
    }

    $cacheDir = rtrim((string)$config['cache_dir'], "\\/");
    if ($cacheDir === '') {
        return null;
    }

    return $cacheDir . DIRECTORY_SEPARATOR . 'folder-protocol-uris-' . sha1($config['ged_library_protocol_uri']) . '.json';
}

function read_folder_protocol_cache(array $config): array
{
    $cacheFile = folder_protocol_cache_file($config);
    if ($cacheFile === null || !is_file($cacheFile) || !is_readable($cacheFile)) {
        return [];
    }

    $age = time() - filemtime($cacheFile);
    if ($age > $config['folder_protocol_cache_ttl_seconds']) {
        return [];
    }

    $cached = json_decode((string)file_get_contents($cacheFile), true);
    return normalize_folder_protocol_uris(is_array($cached) ? $cached : []);
}

function write_folder_protocol_cache(array $config, array $folderProtocolUris): void
{
    $cacheFile = folder_protocol_cache_file($config);
    if ($cacheFile === null) {
        return;
    }

    $cacheDir = dirname($cacheFile);
    if (!is_dir($cacheDir) && !@mkdir($cacheDir, 0775, true) && !is_dir($cacheDir)) {
        return;
    }

    $json = json_encode(normalize_folder_protocol_uris($folderProtocolUris), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json !== false) {
        @file_put_contents($cacheFile, $json, LOCK_EX);
    }
}

function best_folder_protocol_match(array $folderProtocolUris, string $filterPath): array
{
    $filterSegments = split_path($filterPath);
    foreach (normalize_folder_protocol_uris($folderProtocolUris) as $configuredPath => $protocolUri) {
        $configuredSegments = split_path((string)$configuredPath);
        if (path_starts_with($filterSegments, $configuredSegments)) {
            return [
                'path' => (string)$configuredPath,
                'protocolUri' => (string)$protocolUri,
            ];
        }
    }

    return ['path' => '', 'protocolUri' => ''];
}

function library_view_payload(string $scopeType, string $scopeUri, string $maxLevel): array
{
    return [
        'view' => [
            '@xmlns:vw1' => 'http://www.axemble.com/vdoc/view',
            'header' => [
                'scopes' => [
                    $scopeType => [
                        '@protocol-uri' => $scopeUri,
                        '@self-closing' => 'true',
                    ],
                ],
                'configuration' => [
                    'param' => [
                        '@name' => 'maxlevel',
                        '@value' => $maxLevel,
                        '@self-closing' => 'true',
                    ],
                ],
                'definition' => [
                    '@class' => 'com.axemble.vdoc.sdk.interfaces.IFolder',
                    'definition' => [
                        '@class' => 'com.axemble.vdoc.sdk.interfaces.IFile',
                        '@self-closing' => 'true',
                    ],
                ],
            ],
        ],
    ];
}

function view_library_scope(array $config, string $token, string $scopeType, string $scopeUri, string $maxLevel): array
{
    return moovapps_post($config, 'library', 'view', library_view_payload($scopeType, $scopeUri, $maxLevel), $token);
}

function find_child_folder(array $response, string $name): ?array
{
    foreach (normalize_list($response['view']['body']['folder'] ?? []) as $folder) {
        if (!is_array($folder)) {
            continue;
        }

        if (same_path_segment((string)($folder['@name'] ?? ''), $name)) {
            return $folder;
        }
    }

    return null;
}

function resolve_folder_protocol_uri_from_moovapps(array $config, string $token, string $filterPath): array
{
    if (!$config['auto_resolve_folder_protocol_uris']) {
        return ['path' => '', 'protocolUri' => ''];
    }

    $folderProtocolUris = array_replace(read_folder_protocol_cache($config), $config['folder_protocol_uris']);
    $match = best_folder_protocol_match($folderProtocolUris, $filterPath);
    $currentPath = (string)$match['path'];
    $currentUri = (string)$match['protocolUri'];
    $remainingSegments = split_path($filterPath);

    if ($currentPath !== '' && $currentUri !== '') {
        $remainingSegments = array_slice($remainingSegments, count(split_path($currentPath)));
        $scopeType = 'folder';
        $scopeUri = $currentUri;
    } else {
        $scopeType = 'library';
        $scopeUri = $config['ged_library_protocol_uri'];
    }

    foreach ($remainingSegments as $segment) {
        $response = view_library_scope($config, $token, $scopeType, $scopeUri, '1');
        $folder = find_child_folder($response, $segment);
        if ($folder === null || empty($folder['@protocol-uri'])) {
            write_folder_protocol_cache($config, $folderProtocolUris);
            return ['path' => '', 'protocolUri' => ''];
        }

        $currentPath = normalize_path($currentPath === '' ? $segment : $currentPath . '/' . $segment);
        $currentUri = (string)$folder['@protocol-uri'];
        $folderProtocolUris[$currentPath] = $currentUri;
        $scopeType = 'folder';
        $scopeUri = $currentUri;
    }

    write_folder_protocol_cache($config, $folderProtocolUris);
    return ['path' => $currentPath, 'protocolUri' => $currentUri];
}

function map_resource(array $resource, string $folderPath, array $scope): ?array
{
    $fileName = (string)($resource['@reference'] ?? 'Document SMI');
    $folderSegments = split_path($folderPath);
    $filterSegments = $scope['filter_segments'];
    $filterOffset = find_path_prefix_offset($folderSegments, $filterSegments);

    if ($filterOffset === null) {
        return null;
    }

    $relativeSegments = array_slice($folderSegments, $filterOffset + count($filterSegments));
    $folderLabel = implode('/', $relativeSegments);
    $intranetRelativePath = path_after_marker($folderPath, DEFAULT_INTRANET_ROOT_PATH);

    return [
        'id' => (string)($resource['@id'] ?? $resource['@protocol-uri'] ?? $fileName),
        'title' => $fileName,
        'fileName' => $fileName,
        'protocolUri' => (string)($resource['@protocol-uri'] ?? ''),
        'folderPath' => $folderPath,
        'folderLabel' => $folderLabel !== '' ? $folderLabel : basename($scope['filter_path']),
        'segments' => $relativeSegments,
        'intranetPath' => $intranetRelativePath,
        'createdAt' => (string)($resource['@created-date'] ?? ''),
        'updatedAt' => (string)($resource['@modified-date'] ?? ''),
    ];
}

function collect_documents(array $folders, array &$documents, array $scope): void
{
    foreach ($folders as $folder) {
        if (!is_array($folder)) {
            continue;
        }

        $folderPath = (string)($folder['@path'] ?? $folder['@name'] ?? '');
        foreach (normalize_list($folder['resource'] ?? []) as $resource) {
            if (is_array($resource)) {
                $document = map_resource($resource, $folderPath, $scope);
                if ($document !== null) {
                    $documents[] = $document;
                }
            }
        }

        collect_documents(normalize_list($folder['folder'] ?? []), $documents, $scope);
    }
}

function list_smi_documents(array $config, string $token, array $scope): void
{
    $scopeProtocolUri = (string)($scope['scope_protocol_uri'] ?? '');
    if ($scopeProtocolUri === '') {
        $resolvedFolder = resolve_folder_protocol_uri_from_moovapps($config, $token, $scope['filter_path']);
        $scopeProtocolUri = (string)$resolvedFolder['protocolUri'];
        $scope['scope_protocol_uri'] = $scopeProtocolUri;
        $scope['scope_protocol_path'] = (string)$resolvedFolder['path'];
    }

    $scopeType = $scopeProtocolUri !== '' ? 'folder' : 'library';
    $scopeUri = $scopeProtocolUri !== '' ? $scopeProtocolUri : $config['ged_library_protocol_uri'];

    $response = view_library_scope($config, $token, $scopeType, $scopeUri, '-1');

    $documents = [];
    $rootResourceFolderPath = $scopeType === 'folder' ? $scope['filter_path'] : '/DefaultOrganization/GED';
    foreach (normalize_list($response['view']['body']['resource'] ?? []) as $resource) {
        if (is_array($resource)) {
            $document = map_resource($resource, $rootResourceFolderPath, $scope);
            if ($document !== null) {
                $documents[] = $document;
            }
        }
    }
    collect_documents(normalize_list($response['view']['body']['folder'] ?? []), $documents, $scope);

    $payload = [
        'data' => $documents,
        'meta' => [
            'source' => 'moovapps',
            'libraryProtocolUri' => $config['ged_library_protocol_uri'],
            'scopeType' => $scopeType,
            'scopeProtocolUri' => $scopeProtocolUri,
            'scopeProtocolPath' => (string)($scope['scope_protocol_path'] ?? ''),
            'filterPath' => $scope['filter_path'],
            'count' => count($documents),
            'cache' => 'miss',
            'cacheTtlSeconds' => $config['cache_ttl_seconds'],
        ],
    ];

    write_cached_documents($config, $scope, $payload);
    respond(200, $payload);
}

function stream_document_download(array $config, string $token): void
{
    $protocolUri = (string)($_GET['protocolUri'] ?? '');
    if ($protocolUri === '') {
        respond(400, ['error' => 'PROTOCOL_URI_REQUIRED']);
    }

    $response = moovapps_post($config, 'library', 'get', [
        'get' => [
            '@xmlns:d1' => 'http://www.axemble.com/vdoc/file',
            'body' => [
                'resource' => [
                    '@class' => 'com.axemble.vdoc.sdk.interfaces.IFile',
                    'header' => [
                        '@protocol-uri' => $protocolUri,
                        '@self-closing' => 'true',
                    ],
                ],
            ],
        ],
    ], $token);

    $files = normalize_list($response['resource']['header']['attachments']['file'] ?? []);
    $content = $files[0]['content'] ?? null;
    if (!is_array($content) || empty($content['@uri'])) {
        respond(404, ['error' => 'ATTACHMENT_NOT_FOUND', 'response' => $response]);
    }

    $name = (string)($content['@name'] ?? ($_GET['fileName'] ?? 'document.pdf'));
    $filePath = (string)($content['@filePath'] ?? '');
    $uri = (string)$content['@uri'];
    $separator = contains_text($uri, '?') ? '&' : '?';
    $downloadUrl = $config['moovapps_file_base_url'] . $uri . $separator . '_AuthenticationKey=' . rawurlencode($token);

    $ch = curl_init($downloadUrl);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 60,
    ]);
    if ($config['cookie_file'] !== '') {
        curl_setopt($ch, CURLOPT_COOKIEJAR, $config['cookie_file']);
        curl_setopt($ch, CURLOPT_COOKIEFILE, $config['cookie_file']);
    }

    $binary = curl_exec($ch);
    $error = curl_error($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $contentType = (string)curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    curl_close($ch);

    if (($binary === false || $binary === '' || $status >= 400) && $filePath !== '' && is_file($filePath) && is_readable($filePath)) {
        $extension = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        $contentType = $extension === 'pdf' ? 'application/pdf' : 'application/octet-stream';

        header('Content-Type: ' . $contentType);
        header('Content-Disposition: inline; filename="' . addcslashes($name, "\\\"") . '"');
        header('Content-Length: ' . filesize($filePath));
        http_response_code(200);
        readfile($filePath);
        exit;
    }

    if ($binary === false || $binary === '' || $status >= 400) {
        respond(502, [
            'error' => 'MOOVAPPS_DOWNLOAD_FAILED',
            'status' => $status,
            'message' => $error ?: 'Telechargement Moovapps impossible.',
            'filePathAvailable' => $filePath !== '',
            'filePathReadable' => $filePath !== '' && is_readable($filePath),
        ]);
    }

    header('Content-Type: ' . ($contentType !== '' ? $contentType : 'application/octet-stream'));
    header('Content-Disposition: inline; filename="' . addcslashes($name, "\\\"") . '"');
    header('Content-Length: ' . strlen((string)$binary));
    http_response_code(200);
    echo $binary;
    exit;
}

if (!function_exists('curl_init')) {
    respond(500, ['error' => 'PHP_CURL_MISSING', 'message' => 'Activer l extension PHP curl sur le serveur.']);
}

$config = load_config();
$action = (string)($_GET['action'] ?? 'list');

if ($action === 'download') {
    $token = authenticate($config);
    stream_document_download($config, $token);
}

$scope = document_scope_from_request($config);
$cached = read_cached_documents($config, $scope);
if ($cached !== null) {
    respond(200, $cached);
}

$token = authenticate($config);
list_smi_documents($config, $token, $scope);
