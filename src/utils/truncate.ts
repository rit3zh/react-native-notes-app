/**
 * Truncates a text to a specified length and optionally adds an ellipsis at the end.
 *
 * @param text - The text to be truncated.
 * @param maxLength - The maximum length of the truncated text including the ellipsis.
 * @param useEllipsis - Whether to add an ellipsis (`...`) if the text is too long. Defaults to true.
 * @returns The truncated text.
 */
export const truncateText = (
  text: string,
  maxLength: number,
  useEllipsis: boolean = true
): string => {
  if (text.length <= maxLength) {
    return text;
  }

  if (useEllipsis) {
    return text.slice(0, maxLength - 3) + "...";
  } else {
    return text.slice(0, maxLength);
  }
};
