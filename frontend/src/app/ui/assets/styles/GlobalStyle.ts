import { createGlobalStyle } from "styled-components";
import normalize from "./Normalize";

const GlobalStyle = createGlobalStyle`
${normalize}



html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  /* font-size: 100%; */
  /* font: inherit; */
  vertical-align: baseline;
  outline: none;
}

ol,
ul {
  list-style: none;
}

input {
  outline: none;
}

img {
  border: 0;
  max-width: 100%;
  height: 100%;
}

a {
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

button {
  padding: 0;
  margin: 0;
  border: 0;
  cursor: pointer;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 1;
  background-color: ${(props) => props.theme.colors.greyF1};
}

*,
::after,
::before {
  box-sizing: border-box;
}

.ck-content {
  font-size: 18px;
  line-height: 170%;
  @media ${(props) => props.theme.media.mobile} {
    font-size: 4.7vw;
    font-weight: 400;
  }
}

.ck-content[role='textbox']{
  min-height: 400px;
  border-radius: 0 0 15px 15px !important;
  ol{
    list-style-position: inside;
  }
  li{
    list-style-position: inside;
  }
}
.ck-toolbar[role='toolbar']{
  border-radius: 15px 15px 0 0 !important;
}

`;

export default GlobalStyle;
