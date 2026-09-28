<?php

declare(strict_types=1);

header('Cache-Control: no-store');

const DU_SPACES = [
    'faq' => [
        'id' => '512676',
        'view_id' => '513848',
        'fields' => ['sys_Title', 'Reponse'],
        'required' => ['sys_Title', 'Reponse'],
    ],
    'ideas' => [
        'id' => '512792',
        'view_id' => '513878',
        'fields' => ['sys_Title', 'Description', 'Qualite'],
        'required' => ['sys_Title', 'Description', 'Qualite'],
    ],
    'reports' => [
        'id' => '512924',
        'view_id' => '513911',
        'fields' => ['sys_Title', 'Type', 'Description'],
        'required' => ['sys_Title', 'Type', 'Description'],
    ],
];

function du_respond(int $status, array $payload): void
{
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function du_config(): array
{
    $localConfig = __DIR__ . '/smi-config.local.php';
    $fileConfig = is_file($localConfig) ? require $localConfig : [];
    $cookieFile = tempnam(sys_get_temp_dir(), 'moovapps_du_');
    if (is_string($cookieFile)) {
        register_shutdown_function(static function () use ($cookieFile): void {
            if (is_file($cookieFile)) {
                @unlink($cookieFile);
            }
        });
    }

    return [
        'base_url' => rtrim((string)($fileConfig['moovapps_base_url'] ?? getenv('MOOVAPPS_BASE_URL') ?: 'http://localhost:8080'), '/'),
        'login' => (string)($fileConfig['login'] ?? getenv('MOOVAPPS_LOGIN') ?: ''),
        'password' => (string)($fileConfig['password'] ?? getenv('MOOVAPPS_PASSWORD') ?: ''),
        'timeout' => (string)($fileConfig['timeout'] ?? getenv('MOOVAPPS_TIMEOUT') ?: '500'),
        'cookie_file' => is_string($cookieFile) ? $cookieFile : '',
    ];
}

function du_curl(array $config, string $url, string $method, ?array $body = null, array $extraHeaders = []): array
{
    $headers = array_merge(['Accept: application/json'], $extraHeaders);
    $options = [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTPHEADER => $headers,
    ];

    if ($body !== null) {
        $payload = json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if ($payload === false) {
            du_respond(400, ['error' => 'INVALID_JSON_BODY']);
        }
        $options[CURLOPT_POSTFIELDS] = $payload;
        $options[CURLOPT_HTTPHEADER][] = 'Content-Type: application/json';
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, $options);
    if ($config['cookie_file'] !== '') {
        curl_setopt($ch, CURLOPT_COOKIEJAR, $config['cookie_file']);
        curl_setopt($ch, CURLOPT_COOKIEFILE, $config['cookie_file']);
    }

    $raw = curl_exec($ch);
    $error = curl_error($ch);
    $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($raw === false) {
        du_respond(502, ['error' => 'MOOVAPPS_REQUEST_FAILED', 'message' => $error]);
    }

    $decoded = trim((string)$raw) === '' ? null : json_decode((string)$raw, true);
    if (trim((string)$raw) !== '' && $decoded === null && json_last_error() !== JSON_ERROR_NONE) {
        if ($status >= 400) {
            $decoded = ['raw' => substr((string)$raw, 0, 1000)];
        } else {
            du_respond(502, ['error' => 'MOOVAPPS_INVALID_JSON', 'status' => $status]);
        }
    }

    return ['status' => $status, 'data' => $decoded];
}

function du_authenticate(array $config): string
{
    if ($config['login'] === '' || $config['password'] === '') {
        du_respond(500, [
            'error' => 'MOOVAPPS_CONFIG_MISSING',
            'message' => 'Configurer les identifiants Moovapps dans api/smi-config.local.php.',
        ]);
    }

    $cacheFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR
        . 'cmr-moovapps-token-' . sha1($config['base_url'] . '|' . $config['login']) . '.json';
    if (is_file($cacheFile) && time() - (int)filemtime($cacheFile) < 240) {
        $cached = json_decode((string)file_get_contents($cacheFile), true);
        if (is_array($cached) && is_string($cached['token'] ?? null) && $cached['token'] !== '') {
            return $cached['token'];
        }
    }

    $url = $config['base_url'] . '/moovapps/navigation/flow?' . http_build_query([
        'module' => 'portal',
        'cmd' => 'authenticate',
        'flowmode' => 'json',
    ]);
    $response = du_curl($config, $url, 'POST', [
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
        du_respond(502, ['error' => 'MOOVAPPS_TOKEN_MISSING']);
    }

    @file_put_contents($cacheFile, json_encode(['token' => $token]), LOCK_EX);

    return $token;
}

function du_values(array $space): array
{
    $payload = json_decode((string)file_get_contents('php://input'), true);
    if (!is_array($payload) || !is_array($payload['values'] ?? null)) {
        du_respond(400, ['error' => 'VALUES_REQUIRED']);
    }

    $values = [];
    foreach ($space['fields'] as $field) {
        if (array_key_exists($field, $payload['values'])) {
            $values[$field] = trim((string)$payload['values'][$field]);
        }
    }
    foreach ($space['required'] as $field) {
        if (($values[$field] ?? '') === '') {
            du_respond(422, ['error' => 'FIELD_REQUIRED', 'field' => $field]);
        }
    }

    return $values;
}

if (!function_exists('curl_init')) {
    du_respond(500, ['error' => 'PHP_CURL_MISSING']);
}

$spaceKey = strtolower(trim((string)($_GET['space'] ?? '')));
$space = DU_SPACES[$spaceKey] ?? null;
if ($space === null) {
    du_respond(400, ['error' => 'UNKNOWN_SPACE']);
}

$config = du_config();
$token = du_authenticate($config);
$method = strtoupper((string)($_SERVER['REQUEST_METHOD'] ?? 'GET'));

if ($method === 'GET') {
    $url = $config['base_url'] . '/moovapps/api/v2/workflows/views/' . rawurlencode($space['view_id'])
        . '?_AuthenticationKey=' . rawurlencode($token);
    $response = du_curl($config, $url, 'GET', null, ['X-AUTHENTICATION-KEY: ' . $token]);
    if ($response['status'] >= 400) {
        du_respond(502, [
            'error' => 'MOOVAPPS_HTTP_ERROR',
            'status' => $response['status'],
            'response' => $response['data'],
        ]);
    }
    du_respond(200, [
        'data' => $response['data'],
        'meta' => ['source' => 'moovapps', 'space' => $spaceKey, 'viewId' => $space['view_id']],
    ]);
}

if ($method !== 'POST') {
    header('Allow: GET, POST');
    du_respond(405, ['error' => 'METHOD_NOT_ALLOWED']);
}

$url = $config['base_url'] . '/moovapps/api/v2/datauniverse/' . rawurlencode($space['id'])
    . '?_AuthenticationKey=' . rawurlencode($token);
$response = du_curl($config, $url, 'POST', ['values' => du_values($space)], ['X-AUTHENTICATION-KEY: ' . $token]);

if ($response['status'] >= 400) {
    du_respond(502, [
        'error' => 'MOOVAPPS_HTTP_ERROR',
        'status' => $response['status'],
        'response' => $response['data'],
    ]);
}

du_respond(201, [
    'data' => $response['data'],
    'meta' => ['source' => 'moovapps', 'space' => $spaceKey, 'dataUniverseId' => $space['id']],
]);
