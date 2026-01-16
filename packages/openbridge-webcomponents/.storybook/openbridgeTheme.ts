import {create} from 'storybook/theming/create';

// OpenBridge Design System Colors
const colors = {
  // Day/Light theme colors
  day: {
    // Backgrounds
    containerGlobal: 'rgb(252, 252, 252)',
    containerBackground: 'rgb(247, 247, 247)',
    containerSection: 'rgb(240, 240, 240)',
    containerBackdrop: 'rgb(224, 224, 224)',

    // Elements
    elementActive: 'rgb(31, 31, 31)',
    elementNeutral: 'rgb(83, 83, 83)',
    elementInactive: 'rgb(112, 112, 112)',
    elementDisabled: 'rgb(190, 190, 190)',

    // Borders
    outline: 'rgb(221, 221, 221)',
    divider: 'rgb(221, 221, 221)',
    focus: 'rgb(66, 113, 179)',

    // Brand blues
    blue400: 'rgb(66, 113, 179)',
    blue500: 'rgb(45, 84, 139)',
    blue600: 'rgb(29, 60, 103)',

    // Inputs
    inputBg: 'rgb(255, 255, 255)',
    inputBorder: 'rgb(190, 190, 190)',
    inputHover: 'rgb(237, 237, 237)',
  },

  // Night/Dark theme colors
  night: {
    // Backgrounds
    containerGlobal: 'rgb(18, 18, 18)',
    containerBackground: 'rgb(24, 24, 24)',
    containerSection: 'rgb(31, 31, 31)',
    containerBackdrop: 'rgb(38, 38, 38)',

    // Elements
    elementActive: 'rgb(233, 233, 233)',
    elementNeutral: 'rgb(180, 180, 180)',
    elementInactive: 'rgb(140, 140, 140)',
    elementDisabled: 'rgb(90, 90, 90)',

    // Borders
    outline: 'rgb(60, 60, 60)',
    divider: 'rgb(50, 50, 50)',
    focus: 'rgb(150, 196, 254)',

    // Brand blues
    blue300: 'rgb(93, 143, 213)',
    blue400: 'rgb(66, 113, 179)',
    blue100: 'rgb(202, 222, 252)',

    // Inputs
    inputBg: 'rgb(38, 38, 38)',
    inputBorder: 'rgb(60, 60, 60)',
    inputHover: 'rgb(50, 50, 50)',
  },
};

// Typography
const typography = {
  fontBase: '"Noto Sans", sans-serif',
  fontCode: 'monospace',
};

// Brand
const brand = {
  brandTitle: 'OpenBridge',
  brandUrl: 'https://www.openbridge.no/',
  // brandImage: '/assets/openbridge-logo.svg', // Uncomment if you have a logo
};

/**
 * OpenBridge Dark Theme (Night/Dusk)
 * Use this for dark mode preference
 */
export const openbridgeDark = create({
  base: 'dark',

  // Typography
  ...typography,

  // Brand
  ...brand,

  // Primary colors - using brighter colors for better visibility
  colorPrimary: colors.night.focus, // Light blue - used for selected sidebar item
  colorSecondary: colors.night.elementActive,

  // UI backgrounds
  appBg: colors.night.containerBackground,
  appContentBg: colors.night.containerSection,
  appPreviewBg: colors.night.containerSection,
  appBorderColor: colors.night.outline,
  appBorderRadius: 4,

  // Text colors - improved contrast
  textColor: colors.night.elementActive,
  textInverseColor: colors.day.elementActive,
  textMutedColor: colors.night.elementNeutral,

  // Toolbar colors
  barTextColor: colors.night.elementNeutral,
  barHoverColor: colors.night.elementActive,
  barSelectedColor: colors.night.elementActive,
  barBg: colors.night.containerBackdrop,

  // Form colors - fixes the search input issue!
  inputBg: colors.night.inputBg,
  inputBorder: colors.night.inputBorder,
  inputTextColor: colors.night.elementActive,
  inputBorderRadius: 4,

  // Button colors
  buttonBg: colors.night.inputBg,
  buttonBorder: colors.night.inputBorder,

  // Boolean inputs
  booleanBg: colors.night.inputBg,
  booleanSelectedBg: colors.night.blue400,
});

/**
 * OpenBridge Light Theme (Day/Bright)
 * Use this for light mode preference
 */
export const openbridgeLight = create({
  base: 'light',

  // Typography
  ...typography,

  // Brand
  ...brand,

  // Primary colors
  colorPrimary: colors.day.blue600,
  colorSecondary: colors.day.blue500,

  // UI backgrounds
  appBg: colors.day.containerBackground,
  appContentBg: colors.day.containerGlobal,
  appPreviewBg: colors.day.containerSection,
  appBorderColor: colors.day.outline,
  appBorderRadius: 4,

  // Text colors
  textColor: colors.day.elementActive,
  textInverseColor: colors.night.elementActive,
  textMutedColor: colors.day.elementNeutral,

  // Toolbar colors
  barTextColor: colors.day.elementNeutral,
  barHoverColor: colors.day.elementActive,
  barSelectedColor: colors.day.blue500,
  barBg: colors.day.containerGlobal,

  // Form colors - fixes the search input issue!
  inputBg: colors.day.inputBg,
  inputBorder: colors.day.inputBorder,
  inputTextColor: colors.day.elementActive,
  inputBorderRadius: 4,

  // Button colors
  buttonBg: colors.day.inputBg,
  buttonBorder: colors.day.inputBorder,

  // Boolean inputs
  booleanBg: colors.day.containerBackdrop,
  booleanSelectedBg: colors.day.blue500,
});

// Default export for backwards compatibility
export default openbridgeDark;
