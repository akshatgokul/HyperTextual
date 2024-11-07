/**
 * Shuffles the elements of an array in-place using the Durstenfeld algorithm.
 *
 * @link https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
