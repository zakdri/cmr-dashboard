import { createIcons, icons } from 'lucide';

export function renderLucideIcons(options = {}) {
  return createIcons({
    icons,
    ...options
  });
}

window.lucide = {
  icons,
  createIcons: renderLucideIcons
};
