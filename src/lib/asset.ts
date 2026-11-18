/**
 * Builds a URL for a file in /public. Uses Vite's base path so assets resolve
 * on GitHub Pages (/Portfolio/) as well as locally.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
