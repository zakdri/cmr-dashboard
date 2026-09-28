<?php

declare(strict_types=1);

header('Cache-Control: no-store');

const INNOVATION_SPACES = [
    'project' => [
        'id' => '511786',
        'view_id' => '513659',
        'required' => ['sys_Title', 'SyntheseDuProjet'],
        'fields' => ['sys_Title', 'SyntheseDuProjet', 'Objectif', 'EquipeProjet', 'Mentor', 'Insights'],
        'files' => ['image' => 'ImageDuProjet'],
        'folder' => 'Intranet CMR/Espace Innovation/Fiches Projets/Suivi des projets',
    ],
    'spontaneous' => [
        'id' => '512140',
        'view_id' => '513737',
        'required' => ['sys_Title', 'Theme', 'DescriptionDeLIdee'],
        'fields' => ['sys_Title', 'Theme', 'DescriptionDeLIdee'],
        'files' => [],
        'folder' => 'Intranet CMR/Espace Innovation/Espace Idées/Dépôt d idée spontanée',
    ],
    'cmr-innov' => [
        'id' => '512002',
        'view_id' => '513704',
        'required' => ['sys_Title', 'Description'],
        'fields' => ['sys_Title', 'Description'],
        'files' => ['image' => 'Image'],
        'folder' => 'Intranet CMR/Espace Innovation/Espace Idées/CMR Innov',
    ],
    'project-idea' => [
        'id' => '512282',
        'view_id' => '513770',
        'required' => ['sys_Title', 'Theme'],
        'fields' => ['sys_Title', 'Theme', 'Periode'],
        'files' => ['image' => 'ImageIllustrative', 'documents' => 'SupportsDocumentaires'],
        'folder' => 'Intranet CMR/Espace Innovation/Fiches Projets/Projets Idées',
    ],
    'event' => [
        'id' => '512449',
        'view_id' => '513812',
        'required' => ['sys_Title', 'Date', 'Description'],
        'fields' => ['sys_Title', 'Date', 'Description'],
        'files' => ['image' => 'Image'],
        'folder' => 'Intranet CMR/Espace Innovation/Innov Event',
    ],
];

function innovation_respond(int $status, array $payload): void
{
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function innovation_config(): array
{
    $localConfig = __DIR__ . '/smi-config.local.php';
    $fileConfig = is_file($localConfig) ? require $localConfig : [];
    $baseUrl = rtrim((string)($fileConfig['moovapps_base_url'] ?? getenv('MOOVAPPS_BASE_URL') ?: 'http://localhost:8080'), '/');

    return [
        'base_url' => $baseUrl,
        'login' => (string)($fileConfig['login'] ?? getenv('MOOVAPPS_LOGIN') ?: ''),
        'password' => (string)($fileConfig['password'] ?? getenv('MOOVAPPS_PASSWORD') ?: ''),
        'timeout' => (string)($fileConfig['timeout'] ?? getenv('MOOVAPPS_TIMEOUT') ?: '500'),
        'library_uri' => (string)($fileConfig['ged_library_protocol_uri'] ?? getenv('GED_LIBRARY_PROTOCOL_URI') ?: 'uri://vdoc/datastore/036-000002-000'),
    ];
}

function innovation_request(string $url, string $method, array $headers, $body = null): array
{
    $options = [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 60,
        CURLOPT_HTTPHEADER => $headers,
    ];
    if ($body !== null) {
        $options[CURLOPT_POSTFIELDS] = $body;
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, $options);
    $raw = curl_exec($ch);
    $error = curl_error($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($raw === false) {
        innovation_respond(502, ['error' => 'MOOVAPPS_REQUEST_FAILED', 'message' => $error]);
    }
    $decoded = trim((string)$raw) === '' ? null : json_decode((string)$raw, true);
    if ($decoded === null && trim((string)$raw) !== '' && json_last_error() !== JSON_ERROR_NONE) {
        $decoded = ['raw' => substr((string)$raw, 0, 1000)];
    }
    return ['status' => $status, 'data' => $decoded];
}

function innovation_json_request(string $url, string $method, array $headers, array $body): array
{
    $payload = json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($payload === false) {
        innovation_respond(400, ['error' => 'INVALID_JSON_BODY']);
    }
    return innovation_request($url, $method, array_merge($headers, ['Content-Type: application/json', 'Accept: application/json']), $payload);
}

function innovation_authenticate(array $config): string
{
    if ($config['login'] === '' || $config['password'] === '') {
        innovation_respond(500, ['error' => 'MOOVAPPS_CONFIG_MISSING']);
    }
    $cacheFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR
        . 'cmr-moovapps-token-' . sha1($config['base_url'] . '|' . $config['login']) . '.json';
    if (is_file($cacheFile) && time() - (int)filemtime($cacheFile) < 240) {
        $cached = json_decode((string)file_get_contents($cacheFile), true);
        if (is_array($cached) && is_string($cached['token'] ?? null) && $cached['token'] !== '') {
            return $cached['token'];
        }
    }

    $url = $config['base_url'] . '/moovapps/navigation/flow?module=portal&cmd=authenticate&flowmode=json';
    $response = innovation_json_request($url, 'POST', [], [
        'authenticate' => [
            'header' => [
                'login' => $config['login'],
                'password' => $config['password'],
                'timeout' => $config['timeout'],
            ],
        ],
    ]);
    $token = $response['data']['authenticate']['body']['token']['@key'] ?? null;
    if (!is_string($token) || $token === '') {
        innovation_respond(502, ['error' => 'MOOVAPPS_TOKEN_MISSING', 'response' => $response['data']]);
    }
    @file_put_contents($cacheFile, json_encode(['token' => $token]), LOCK_EX);
    return $token;
}

function innovation_api_headers(string $token): array
{
    return ['X-AUTHENTICATION-KEY: ' . $token, 'Accept: application/json'];
}

function innovation_download_file(array $config, string $token, string $downloadReference): void
{
    $url = $config['base_url'] . '/moovapps/api/v2/files/' . rawurlencode($downloadReference)
        . '?_AuthenticationKey=' . rawurlencode($token);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 60,
        CURLOPT_HTTPHEADER => innovation_api_headers($token),
    ]);
    $content = curl_exec($ch);
    $error = curl_error($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $contentType = (string)(curl_getinfo($ch, CURLINFO_CONTENT_TYPE) ?: 'application/octet-stream');
    curl_close($ch);

    if ($content === false || $status >= 400) {
        innovation_respond(502, [
            'error' => 'MOOVAPPS_FILE_DOWNLOAD_FAILED',
            'status' => $status,
            'message' => $error,
        ]);
    }
    header('Content-Type: ' . $contentType);
    header('Content-Length: ' . strlen((string)$content));
    echo $content;
    exit;
}

function innovation_uploaded_file(string $key): ?array
{
    if (!isset($_FILES[$key]) || !is_array($_FILES[$key])) {
        return null;
    }
    $file = $_FILES[$key];
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }
    if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK || !is_uploaded_file((string)($file['tmp_name'] ?? ''))) {
        innovation_respond(400, ['error' => 'FILE_UPLOAD_INVALID', 'field' => $key]);
    }
    if ((int)($file['size'] ?? 0) > 25 * 1024 * 1024) {
        innovation_respond(413, ['error' => 'FILE_TOO_LARGE', 'field' => $key]);
    }
    return $file;
}

function innovation_find_file_reference($value): ?array
{
    if (!is_array($value)) {
        return null;
    }
    $guid = $value['guid'] ?? $value['@guid'] ?? null;
    $fileName = $value['fileName'] ?? $value['name'] ?? $value['@name'] ?? null;
    if (is_string($guid) && $guid !== '') {
        return ['guid' => $guid, 'fileName' => is_string($fileName) && $fileName !== '' ? $fileName : 'fichier'];
    }
    foreach ($value as $child) {
        $match = innovation_find_file_reference($child);
        if ($match !== null) {
            return $match;
        }
    }
    return null;
}

function innovation_upload_file(array $config, string $token, array $file): array
{
    $curlFile = new CURLFile((string)$file['tmp_name'], (string)($file['type'] ?? 'application/octet-stream'), (string)$file['name']);
    $url = $config['base_url'] . '/moovapps/api/v2/files?_AuthenticationKey=' . rawurlencode($token);
    $response = innovation_request($url, 'POST', innovation_api_headers($token), ['file' => $curlFile]);
    $reference = innovation_find_file_reference($response['data']);
    if ($response['status'] >= 400 || $reference === null) {
        innovation_respond(502, ['error' => 'MOOVAPPS_FILE_UPLOAD_FAILED', 'status' => $response['status'], 'response' => $response['data']]);
    }
    return $reference;
}

function innovation_flow(array $config, string $token, string $module, string $cmd, array $body): array
{
    $url = $config['base_url'] . '/moovapps/navigation/flow?' . http_build_query([
        '_AuthenticationKey' => $token,
        'module' => $module,
        'cmd' => $cmd,
        'flowmode' => 'json',
    ]);
    return innovation_json_request($url, 'POST', [], $body);
}

function innovation_normalize_segment(string $value): string
{
    $lower = function_exists('mb_strtolower') ? mb_strtolower(trim($value), 'UTF-8') : strtolower(trim($value));
    $ascii = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $lower);
    return preg_replace('/[^a-z0-9]+/', '', is_string($ascii) ? $ascii : $lower) ?? $lower;
}

function innovation_list($value): array
{
    if (!is_array($value) || $value === []) {
        return [];
    }
    return array_keys($value) === range(0, count($value) - 1) ? $value : [$value];
}

function innovation_find_child_folder(array $response, string $name): ?array
{
    $wanted = innovation_normalize_segment($name);
    foreach (innovation_list($response['data']['view']['body']['folder'] ?? []) as $folder) {
        if (is_array($folder) && innovation_normalize_segment((string)($folder['@name'] ?? '')) === $wanted) {
            return $folder;
        }
    }
    return null;
}

function innovation_resolve_folder(array $config, string $token, string $path): string
{
    $segments = array_values(array_filter(explode('/', trim(str_replace('\\', '/', $path), '/'))));
    $scopeType = 'library';
    $scopeUri = $config['library_uri'];
    foreach ($segments as $segment) {
        $response = innovation_flow($config, $token, 'library', 'view', [
            'view' => [
                '@xmlns:vw1' => 'http://www.axemble.com/vdoc/view',
                'header' => [
                    'scopes' => [$scopeType => ['@protocol-uri' => $scopeUri, '@self-closing' => 'true']],
                    'configuration' => ['param' => ['@name' => 'maxlevel', '@value' => '1', '@self-closing' => 'true']],
                    'definition' => ['@class' => 'com.axemble.vdoc.sdk.interfaces.IFolder'],
                ],
            ],
        ]);
        if ($response['status'] >= 400) {
            return '';
        }
        $folder = innovation_find_child_folder($response, $segment);
        if ($folder === null || empty($folder['@protocol-uri'])) {
            return '';
        }
        $scopeType = 'folder';
        $scopeUri = (string)$folder['@protocol-uri'];
    }
    return $scopeUri;
}

function innovation_read_view(array $config, string $token, string $viewId): array
{
    $url = $config['base_url'] . '/moovapps/api/v2/workflows/views/' . rawurlencode($viewId)
        . '?_AuthenticationKey=' . rawurlencode($token);
    return innovation_request($url, 'GET', innovation_api_headers($token));
}

function innovation_publish_to_ged(array $config, string $token, array $file, string $folderPath): array
{
    $folderUri = innovation_resolve_folder($config, $token, $folderPath);
    if ($folderUri === '') {
        return ['ok' => false, 'message' => 'Dossier documentaire introuvable', 'path' => $folderPath];
    }
    $reference = innovation_upload_file($config, $token, $file);
    $response = innovation_flow($config, $token, 'library', 'create', [
        'create' => [
            'header' => [],
            'body' => [
                'resource' => [
                    '@class' => 'com.axemble.vdoc.sdk.interfaces.IFile',
                    'header' => [
                        '@reference' => (string)$file['name'],
                        '@description' => 'Pièce jointe publiée depuis l intranet CMR',
                        'folder' => ['@protocol-uri' => $folderUri, '@self-closing' => 'true'],
                        'attachments' => [
                            'file' => [
                                'content' => [
                                    '@name' => $reference['fileName'],
                                    '@guid' => $reference['guid'],
                                    '@self-closing' => 'true',
                                ],
                            ],
                        ],
                    ],
                    'body' => [],
                ],
            ],
        ],
    ]);
    return [
        'ok' => $response['status'] < 400,
        'path' => $folderPath,
        'fileName' => $reference['fileName'],
        'response' => $response['data'],
    ];
}

if (!function_exists('curl_init')) {
    innovation_respond(500, ['error' => 'PHP_CURL_MISSING']);
}
$method = strtoupper((string)($_SERVER['REQUEST_METHOD'] ?? 'GET'));
$config = innovation_config();

if ($method === 'GET') {
    $token = innovation_authenticate($config);
    $downloadReference = trim((string)($_GET['downloadReference'] ?? ''));
    if ($downloadReference !== '') {
        innovation_download_file($config, $token, $downloadReference);
    }
    $spaceKey = strtolower(trim((string)($_GET['space'] ?? '')));
    $space = INNOVATION_SPACES[$spaceKey] ?? null;
    if ($space === null) {
        innovation_respond(400, ['error' => 'UNKNOWN_SPACE']);
    }
    $response = innovation_read_view($config, $token, $space['view_id']);
    if ($response['status'] >= 400) {
        innovation_respond(502, [
            'error' => 'MOOVAPPS_VIEW_FAILED',
            'status' => $response['status'],
            'response' => $response['data'],
        ]);
    }
    innovation_respond(200, [
        'data' => $response['data'],
        'meta' => [
            'space' => $spaceKey,
            'viewId' => $space['view_id'],
        ],
    ]);
}

if ($method !== 'POST') {
    header('Allow: GET, POST');
    innovation_respond(405, ['error' => 'METHOD_NOT_ALLOWED']);
}

$spaceKey = strtolower(trim((string)($_POST['space'] ?? '')));
$space = INNOVATION_SPACES[$spaceKey] ?? null;
if ($space === null) {
    innovation_respond(400, ['error' => 'UNKNOWN_SPACE']);
}
$inputValues = json_decode((string)($_POST['values'] ?? ''), true);
if (!is_array($inputValues)) {
    innovation_respond(400, ['error' => 'VALUES_REQUIRED']);
}
$values = [];
foreach ($space['fields'] as $field) {
    if (array_key_exists($field, $inputValues)) {
        $values[$field] = is_string($inputValues[$field]) ? trim($inputValues[$field]) : $inputValues[$field];
    }
}
foreach ($space['required'] as $field) {
    if (!isset($values[$field]) || $values[$field] === '') {
        innovation_respond(422, ['error' => 'FIELD_REQUIRED', 'field' => $field]);
    }
}

$token = innovation_authenticate($config);
$uploadedFiles = [];
foreach ($space['files'] as $inputName => $fieldName) {
    $file = innovation_uploaded_file($inputName);
    if ($file === null) {
        continue;
    }
    $reference = innovation_upload_file($config, $token, $file);
    $values[$fieldName] = [$reference];
    $uploadedFiles[] = ['input' => $inputName, 'file' => $file, 'reference' => $reference];
}

$dataUrl = $config['base_url'] . '/moovapps/api/v2/datauniverse/' . rawurlencode($space['id'])
    . '?_AuthenticationKey=' . rawurlencode($token);
$dataResponse = innovation_json_request($dataUrl, 'POST', innovation_api_headers($token), ['values' => $values]);
if ($dataResponse['status'] >= 400) {
    innovation_respond(502, [
        'error' => 'MOOVAPPS_DATAUNIVERSE_FAILED',
        'status' => $dataResponse['status'],
        'response' => $dataResponse['data'],
    ]);
}

$ged = [];
foreach ($uploadedFiles as $uploadedFile) {
    $ged[] = innovation_publish_to_ged($config, $token, $uploadedFile['file'], $space['folder']);
}

innovation_respond(201, [
    'data' => $dataResponse['data'],
    'files' => array_column($uploadedFiles, 'reference'),
    'ged' => $ged,
    'meta' => ['space' => $spaceKey, 'dataUniverseId' => $space['id'], 'folder' => $space['folder']],
]);
