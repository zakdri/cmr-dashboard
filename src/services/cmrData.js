export async function loadApplicationData() {
  window.CMR_DATA = { data: {} };
  const response = await fetch('data/cmr-data.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Impossible de charger data/cmr-data.json (${response.status})`);
  }

  const manifest = await response.json();
  if (!Array.isArray(manifest.spaces)) {
    window.CMR_DATA = manifest;
    return;
  }

  const spaces = await Promise.all(
    manifest.spaces.map(async file => {
      const spaceResponse = await fetch(`data/${file}`, { cache: 'no-store' });
      if (!spaceResponse.ok) {
        throw new Error(`Impossible de charger data/${file} (${spaceResponse.status})`);
      }
      return spaceResponse.json();
    })
  );

  window.CMR_DATA = {
    ...manifest,
    data: spaces.reduce((acc, space) => ({ ...acc, ...(space.data || {}) }), {})
  };
}
