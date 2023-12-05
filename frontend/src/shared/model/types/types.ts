import { ICustomNavLinkProps } from "@/components/Header/CustomNavLink";

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
    darkRed: string;

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
      loading: string;
      burgerMenu: string;
    };
  };

  media: {
    mobile: string;
    desktop: string;
  };
}

export interface ILayout {
  children: React.ReactNode;
}

export interface INavLinks {
  [key: string]: ICustomNavLinkProps;
}

export interface IAphorism {
  text: string;
  author: string;
}


