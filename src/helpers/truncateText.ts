export function truncateText(text: string, maxLength: number = 5) {
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + "...";
}
