 import { IBaseTheme } from "@/shared/types/types";

const baseTheme: IBaseTheme = {
  colors: {
    realWhite: '#fff',
    realBlack: '#000',
    dark: '#181818',
  
    mainBlue: '#007AFF',
    darkBlue: '#0068d6',
    lightBlue: '#4BF2FD',
  
    greyF1: '#f1f1f1',
    greyF5: '#f5f5f5',
    greyEO: '#E0E0E0',
    grey93: '#939393',
    grey57: '#575757',
  
    yRed: '#E03638',
    darkRed: '#940f0f',

    mainGreen: '#5B8930',

    mainYellow: '#F1FF0D',
  },

  utils: {
    transition: 'all .2s ease-in-out',
    br: '15px',
    zIndex: {
      popup: '100',
      burgerMenu: '250',
      modalControls: '200',
      darkOverlay: '500',
      overDarkOverlay: '501',
      loading: '1000',
    }
  },

  media: {
    mobile: '(max-width: 768px)',
    desktop: '(min-width: 769px)',
  },

};

export default baseTheme;
