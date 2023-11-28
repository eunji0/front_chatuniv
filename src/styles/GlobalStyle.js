import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import RobotoWoff from '../assets/fonts/Roboto.woff';
import RobotoWoff2 from '../assets/fonts/Roboto.woff2';
import RobotoTtf from '../assets/fonts/Roboto.ttf';

export default createGlobalStyle`
  ${reset}
    * {
      box-sizing : border-box;
    }
    body {
      margin: 0 auto;
      width: 1000px;
      font-family: "Roboto";
      src: url(${RobotoWoff}) format("woff"),
          url(${RobotoWoff2}) format("woff2"),
          url(${RobotoTtf}) format("truetype");
    }
    @media only screen and (max-width: 1100px) {
      * {
        width: 100%;
        margin: auto;
    }
    }
`;
