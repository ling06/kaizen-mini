export interface IBaseTheme {
  colors: {
    realWhite: string;
    realBlack: string;
    dark: string;

    mainBlue: string;
    darkBlue: string;
    lightBlue: string;

    greyF1: string;
    greyF5: string;
    greyEO: string;
    grey93: string;
    grey57: string;

    yRed: string;

    mainGreen: string;

    mainYellow: string;
  };

  utils: {
    transition: string;
    br: string;
    zIndex: {
      popup: string;
      modalControls: string;
      darkOverlay: string;
      overDarkOverlay: string;
    };
  };

  media: {
    mobile: string;
  };
}

export interface ILayoutProps {
  children: React.ReactNode;
}
