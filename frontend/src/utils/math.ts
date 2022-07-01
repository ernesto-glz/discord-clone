export function generateRandomIntWith(length: number, min = 0) {
  return Math.floor(Math.random() * length + min);
}
