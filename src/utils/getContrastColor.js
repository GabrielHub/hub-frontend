export const getContrastColor = (hex) => {
  // Ensure hex is in the correct format
  const cleanedHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // If the cleaned hex is in short format, expand it to full format
  const fullHex =
    cleanedHex.length === 3
      ? cleanedHex
          .split('')
          .map((char) => char + char)
          .join('')
      : cleanedHex;

  // Parse r, g, b values
  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light colors and white for dark colors
  return luminance > 0.6 ? '#363636' : '#FFFFFF';
};

export default {};
