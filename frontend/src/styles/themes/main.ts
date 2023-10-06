import { IBaseTheme } from "@/types/types";

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

    mainGreen: '#5B8930',

    mainYellow: '#F1FF0D',
  },

  utils: {
    transition: 'all .2s ease-in-out',
    br: '15px',
    zIndex: {
      popup: '100',
      modalControls: '200',
      darkOverlay: '500',
      overDarkOverlay: '501',
    }
  },

  media: {
    mobile: '(max-width: 768px)',
  },

};

export default baseTheme;
