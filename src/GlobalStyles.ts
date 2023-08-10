import { createGlobalStyle } from "styled-components";
import Myfonts from "./Fonts/Linotype-HelveticaNeueLTGEO75Bold.ttf"



const GlobalStyles=createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
};

body{  
    background-color: rgba(242, 243, 246, 1);
}
@font-face {
    font-family: 'YourFontName';
    src: url(${Myfonts}) format('truetype');
  }
`

export default GlobalStyles