
const theme = {
  // Modern, softer shadows with better depth perception
  shadows: [
    'none',
    '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 4px 6px 0px rgba(0, 0, 0, 0.1)',
    '0px 3px 5px 0px rgba(0, 0, 0, 0.08), 0px 5px 8px 0px rgba(0, 0, 0, 0.12)',
    '0px 4px 6px 0px rgba(0, 0, 0, 0.1), 0px 6px 10px 0px rgba(0, 0, 0, 0.14)',
    '0px 5px 7px 0px rgba(0, 0, 0, 0.12), 0px 7px 12px 0px rgba(0, 0, 0, 0.16)',
    '0px 6px 8px 0px rgba(0, 0, 0, 0.14), 0px 8px 14px 0px rgba(0, 0, 0, 0.18)',
    '0px 7px 9px 0px rgba(0, 0, 0, 0.16), 0px 9px 16px 0px rgba(0, 0, 0, 0.2)',
    '0px 8px 10px 0px rgba(0, 0, 0, 0.18), 0px 10px 18px 0px rgba(0, 0, 0, 0.22)',
    '0px 9px 11px 0px rgba(0, 0, 0, 0.2), 0px 11px 20px 0px rgba(0, 0, 0, 0.24)',
    '0px 10px 12px 0px rgba(0, 0, 0, 0.22), 0px 12px 22px 0px rgba(0, 0, 0, 0.26)',
    '0px 12px 14px 0px rgba(0, 0, 0, 0.24), 0px 14px 26px 0px rgba(0, 0, 0, 0.28)',
    '0px 14px 16px 0px rgba(0, 0, 0, 0.26), 0px 16px 30px 0px rgba(0, 0, 0, 0.3)',
    '0px 16px 18px 0px rgba(0, 0, 0, 0.28), 0px 18px 34px 0px rgba(0, 0, 0, 0.32)',
    '0px 18px 20px 0px rgba(0, 0, 0, 0.3), 0px 20px 38px 0px rgba(0, 0, 0, 0.34)',
    '0px 20px 22px 0px rgba(0, 0, 0, 0.32), 0px 22px 42px 0px rgba(0, 0, 0, 0.36)',
    '0px 22px 24px 0px rgba(0, 0, 0, 0.34), 0px 24px 46px 0px rgba(0, 0, 0, 0.38)',
    '0px 24px 26px 0px rgba(0, 0, 0, 0.36), 0px 26px 50px 0px rgba(0, 0, 0, 0.4)',
    '0px 26px 28px 0px rgba(0, 0, 0, 0.38), 0px 28px 54px 0px rgba(0, 0, 0, 0.42)',
    '0px 28px 30px 0px rgba(0, 0, 0, 0.4), 0px 30px 58px 0px rgba(0, 0, 0, 0.44)'
  ],
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195
    }
  },
  shape: {
    borderRadius: 8,
    borderRadiusSmall: 6,
    borderRadiusMedium: 8,
    borderRadiusLarge: 12,
    borderRadiusXl: 16,
    borderRadius2xl: 24
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  },
  typography: {
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    fontWeightExtraBold: 800
  },
  spacing: {
    xs: '0.4rem',
    sm: '0.8rem',
    md: '1.6rem',
    lg: '2.4rem',
    xl: '3.2rem',
    xxl: '4.8rem',
    xxxl: '6.4rem'
  },
  /**
   * MEMO: could follow Material UI in other theming options
   * Material UI breakpoints
   * MUI typography
   * MUI mobile first design principle
   * MUI AppBar and Drawer
   * MUI Link
   */
  // TODO: size and mediaQueries should go into custom section and size => sizes
  size: {
    smallest: '275px', // 25em
    smaller: '500px', // 31.25em
    small: '600px', // 37.5em
    medium: '900px', // 56.25em
    large: '1300px', // 80em
    larger: '1462.5px', // 90em
    largest: '1500px' // 97em
  },
  mediaQueries: {
    smallest: 'only screen and (max-width: 275px)',
    smaller: 'only screen and (max-width: 500px)',
    small: 'only screen and (max-width: 600px)',
    medium: 'only screen and (max-width: 900px)',
    large: 'only screen and (max-width: 1300px)',
    larger: 'only screen and (max-width: 1462.5px)',
    largest: 'only screen and (max-width: 1500px)'
  },
  custom: {
    layout: {
      appBarHeight: 56
    }
  }
};

export default theme;
