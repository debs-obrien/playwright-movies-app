
import css from 'styled-jsx/css';

import theme from './theme';
import CLASS_NAMES from 'utils/constants/class-names';

export default css.global`
  :root {
    color-scheme: light dark;
    --duration: 0.5s;
    --timing: ease;
    --palette-background-backdrop: rgba(0, 0, 0, 0.5);
    --palette-common-white: #fff;
    --palette-common-black: #000;
    --palette-custom-lightBlue: lightblue;
    --palette-custom-tmdbLightBlue: #01b4e4;
  }

  body {
    color: var(--palette-text-primary);
    background-color: var(--palette-background-default);
    /* MEMO: inspired by https://web.dev/prefers-color-scheme/#smooth-transitions-between-modes */
    transition: color var(--duration) var(--timing), background-color var(--duration) var(--timing);
  }

  body.${CLASS_NAMES.LIGHT} {
    /* Modern light mode with fresh, vibrant colors */
    --palette-background-default: #f5f7fa;
    --palette-text-primary: #1a202c;
    --palette-text-secondary: #4a5568;
    --palette-text-disabled: rgba(0, 0, 0, 0.38);
    --palette-divider: rgba(0, 0, 0, 0.08);

    --palette-action-active: rgba(0, 0, 0, 0.54);
    --palette-action-hover: rgba(99, 102, 241, 0.08);
    --palette-action-hover-opacity: 0.08;
    --palette-action-selected: rgba(99, 102, 241, 0.12);
    --palette-action-disabled: rgba(0, 0, 0, 0.26);
    --palette-action-disabled-background: rgba(0, 0, 0, 0.12);

    --palette-background-paper: #ffffff;
    --palette-background-paper-rgb: 255, 255, 255;
    --palette-background-elevated: #ffffff;

    /* Modern indigo/purple primary */
    --palette-primary-main: #6366f1;
    --palette-primary-main-rgb: 99, 102, 241;
    --palette-primary-dark: #4f46e5;
    --palette-primary-light: #818cf8;
    --palette-primary-contrast-text: #ffffff;

    /* Vibrant pink/rose secondary */
    --palette-secondary-main: #ec4899;
    --palette-secondary-main-rgb: 236, 72, 153;
    --palette-secondary-dark: #db2777;
    --palette-secondary-light: #f472b6;
    --palette-secondary-contrast-text: #ffffff;

    /* Modern amber warning */
    --palette-warning-main: #f59e0b;
    --palette-warning-dark: #d97706;
    --palette-warning-light: #fbbf24;
    --palette-warning-contrast-text: #ffffff;

    /* Success color */
    --palette-success-main: #10b981;
    --palette-success-dark: #059669;
    --palette-success-light: #34d399;

    /* Gradient backgrounds */
    --background-blend-gradient: linear-gradient(rgba(255, 255, 255, 0) 68%, rgb(245, 247, 250) 100%);
    --background-gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --background-gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --background-gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }

  body.${CLASS_NAMES.DARK} {
    /* Modern dark mode with rich, deep colors */
    --image-filter: grayscale(0%);

    --palette-background-default: #0f172a;
    --palette-text-primary: #f1f5f9;
    --palette-text-secondary: #cbd5e1;
    --palette-text-disabled: rgba(255, 255, 255, 0.5);
    --palette-divider: rgba(255, 255, 255, 0.08);

    --palette-action-active: #f1f5f9;
    --palette-action-hover: rgba(99, 102, 241, 0.15);
    --palette-action-hover-opacity: 0.15;
    --palette-action-selected: rgba(99, 102, 241, 0.2);
    --palette-action-disabled: rgba(255, 255, 255, 0.3);
    --palette-action-disabled-background: rgba(255, 255, 255, 0.12);

    --palette-background-paper: #1e293b;
    --palette-background-paper-rgb: 30, 41, 59;
    --palette-background-elevated: #334155;

    /* Modern indigo/purple primary - brighter for dark mode */
    --palette-primary-main: #818cf8;
    --palette-primary-main-rgb: 129, 140, 248;
    --palette-primary-dark: #6366f1;
    --palette-primary-light: #a5b4fc;
    --palette-primary-contrast-text: #0f172a;

    /* Vibrant pink secondary */
    --palette-secondary-main: #f472b6;
    --palette-secondary-main-rgb: 244, 114, 182;
    --palette-secondary-dark: #ec4899;
    --palette-secondary-light: #f9a8d4;
    --palette-secondary-contrast-text: #0f172a;

    /* Amber warning */
    --palette-warning-main: #fbbf24;
    --palette-warning-dark: #f59e0b;
    --palette-warning-light: #fcd34d;
    --palette-warning-contrast-text: #0f172a;

    /* Success color */
    --palette-success-main: #34d399;
    --palette-success-dark: #10b981;
    --palette-success-light: #6ee7b7;

    /* Gradient backgrounds for dark mode */
    --background-blend-gradient: linear-gradient(rgba(15, 23, 42, 0) 68%, rgb(15, 23, 42) 100%);
    --background-gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --background-gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --background-gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }

  /* MEMO: inspired by https://web.dev/prefers-color-scheme/#re-colorize-and-darken-photographic-images */
  body.dark img:not([src*=".svg"]) {
    filter: var(--image-filter);
  }

  * {
    margin: 0;
    padding: 0;
  }

  button {
    outline: none;
    cursor: pointer;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 62.5%; // 1rem = 10px
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  @media screen and (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
  @media ${theme.mediaQueries.largest} {
    html {
      font-size: 57.5%;
    }
  }
  @media ${theme.mediaQueries.large} {
    html {
      font-size: 55%;
    }
  }

  body {
    font-family: 'Inter', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: ${theme.typography.fontWeightRegular};
    line-height: 1.65;
    letter-spacing: -0.011em;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: ${theme.typography.fontWeightBold};
    line-height: 1.2;
    letter-spacing: -0.025em;
  }

  h1 {
    font-size: 3.6rem;
    font-weight: 800;
  }

  h2 {
    font-size: 3rem;
    font-weight: 700;
  }

  h3 {
    font-size: 2.4rem;
    font-weight: 700;
  }

  h4 {
    font-size: 2rem;
    font-weight: 600;
  }

  h5 {
    font-size: 1.8rem;
    font-weight: 600;
  }

  h6 {
    font-size: 1.6rem;
    font-weight: 600;
  }

  form,
  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    text-decoration: none;
  }
  
  li {
    list-style: none;
  }

  .${CLASS_NAMES.VISIBLE} {
    visibility: visible;
  }

  .${CLASS_NAMES.INVISIBLE} {
    visibility: hidden;
  }
`;
