const SCOPE_PATH = new URL(self.registration.scope).pathname;
const CONTEXT_PATH = '/' + (SCOPE_PATH.split('/').filter(Boolean)[0] || '');
const FILE_PREFIX = SCOPE_PATH + 'ged-file/';

const MIME_TYPES = {
  pdf: 'application/pdf',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  csv: 'text/csv',
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif',
  webp: 'image/webp', bmp: 'image/bmp', avif: 'image/avif', svg: 'image/svg+xml',
  mp4: 'video/mp4', webm: 'video/webm', ogv: 'video/ogg', ogg: 'video/ogg',
  mov: 'video/quicktime', m4v: 'video/x-m4v',
};
const FORCED_DOWNLOAD = new Set(['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'csv']);

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(FILE_PREFIX)) return;
  event.respondWith(serveGedFile(event.request, url));
});

function extensionOf(name) {
  const match = /\.([A-Za-z0-9]+)$/.exec(name || '');
  return match ? match[1].toLowerCase() : '';
}

function contentTypeFor(name, reported) {
  const known = MIME_TYPES[extensionOf(name)];
  if (known) return known;
  const type = String(reported || '').split(';')[0].trim().toLowerCase();
  if (type && !['application/octet-stream', 'text/plain', 'text/html'].includes(type)) return reported;
  return 'application/octet-stream';
}

function contentDisposition(name, forceDownload) {
  const clean = String(name || 'document').replace(/[\x00-\x1F\x7F]/g, '').split(/[\\/]/).pop() || 'document';
  const fallback = clean.replace(/[^\x20-\x7E]/g, '_').replace(/["\\]/g, '\\$&');
  const disposition = forceDownload || FORCED_DOWNLOAD.has(extensionOf(clean)) ? 'attachment' : 'inline';
  return `${disposition}; filename="${fallback}"; filename*=UTF-8''${encodeURIComponent(clean)}`;
}

function errorResponse(status, code, message) {
  return new Response(JSON.stringify({ error: code, message }), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

async function serveGedFile(request, url) {
  const protocolUri = url.searchParams.get('protocolUri');
  if (!protocolUri) return errorResponse(400, 'PROTOCOL_URI_REQUIRED', 'Paramètre protocolUri manquant.');
  const forceDownload = url.searchParams.get('download') === '1';
  const fallbackName = decodeURIComponent(url.pathname.slice(FILE_PREFIX.length)) || 'document.pdf';
  try {
    const flowUrl = `${self.location.origin}${CONTEXT_PATH}/navigation/flow?module=library&cmd=get&flowmode=json`;
    const flow = await fetch(flowUrl, {
      method: 'POST',
      credentials: 'include',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        get: {
          '@xmlns:d1': 'http://www.axemble.com/vdoc/file',
          body: { resource: { '@class': 'com.axemble.vdoc.sdk.interfaces.IFile', header: { '@protocol-uri': protocolUri, '@self-closing': 'true' } } },
        },
      }),
    });
    if (flow.status === 401 || flow.status === 403) return errorResponse(flow.status, 'SESSION_REQUIRED', 'Session Moovapps expirée ou droits insuffisants.');
    if (!flow.ok) return errorResponse(502, 'MOOVAPPS_HTTP_ERROR', `Flux library/get : HTTP ${flow.status}`);
    const payload = await flow.json();
    const files = payload?.resource?.header?.attachments?.file;
    const first = Array.isArray(files) ? files[0] : files;
    const content = first?.content;
    if (!content?.['@uri']) return errorResponse(404, 'ATTACHMENT_NOT_FOUND', 'Pièce jointe introuvable.');

    const name = String(content['@name'] || fallbackName);
    const upstreamHeaders = {};
    const range = request.headers.get('Range');
    if (range) upstreamHeaders.Range = range;
    const upstream = await fetch(`${self.location.origin}${CONTEXT_PATH}/portal${content['@uri']}`, { credentials: 'include', headers: upstreamHeaders });
    if (!upstream.ok && upstream.status !== 206) return errorResponse(502, 'MOOVAPPS_DOWNLOAD_FAILED', `Téléchargement Moovapps : HTTP ${upstream.status}`);

    const headers = new Headers();
    headers.set('Content-Type', contentTypeFor(name, upstream.headers.get('Content-Type')));
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Content-Disposition', contentDisposition(name, forceDownload));
    headers.set('Cache-Control', 'private, no-store');
    ['Accept-Ranges', 'Content-Range', 'Content-Length'].forEach((header) => {
      const value = upstream.headers.get(header);
      if (value) headers.set(header, value);
    });
    if (range && !headers.has('Accept-Ranges')) headers.set('Accept-Ranges', 'bytes');
    return new Response(upstream.body, { status: upstream.status === 206 ? 206 : 200, headers });
  } catch (error) {
    return errorResponse(502, 'GED_FILE_FAILED', String(error?.message || error));
  }
}
