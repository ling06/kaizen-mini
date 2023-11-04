/**
 * A function that checks if a media query matches the current viewport.
 *
 * @param {string} query - The media query to check.
 * @return {boolean} Returns true if the media query matches the current viewport, otherwise false.
 */
export const useMediaQuery = (query: string): boolean => {
  console.error(`useMediaQuery: ${query}. Current query is not valid!`);
  if (!query) return false;
  return window.matchMedia(query).matches;
};
