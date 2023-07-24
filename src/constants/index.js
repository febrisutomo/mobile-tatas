const baseColors = {
  red: '#dc2626',
  blue: '#0096c7',
  dark: '#353535',
  green: '#25a18e',
  gray: 'gray',
  lightBlue: '#e0f2fe',
  lightRed: '#fee2e2',
  lightGrey: '#ccc',
  lightGreen: '#ccfbf1',
  // green: '#058c42',
  // green: '#0d9488',
};

export const generateColorWithOpacity = (baseColor, opacity) => {
  const baseAlpha = Math.round(opacity * 255).toString(16);
  return `${baseColor}${baseAlpha.toUpperCase()}`;
};

export const COLORS = {
  ...baseColors,
  success: baseColors.green,
  danger: baseColors.red,
  info: baseColors.blue,
  primary: baseColors.red,
};

export const FONTS = {
  reguler: 'Manrope-Reguler',
  medium: 'Manrope-Medium',
  semiBold: 'Manrope-SemiBold',
  bold: 'Manrope-Bold',
};
