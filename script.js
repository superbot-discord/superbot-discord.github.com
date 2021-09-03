var bgcolor = localStorage.getItem('b') || "#ffffff";
var focolor = localStorage.getItem('f') || "#000000";
var mysheet = document.getElementById("mystyle").sheet;
blist = ["#FFFFFF", "#37393E", "#76D3F9", "#7DA8F7", "#AA90F7", "#D798F8", "#DE799D", "#F19286", "#F3A884", "#F7C783", "#FAD885", "#FFF8A2", "#EDF29B", "#BADD95"];
flist = ["#000000", "#DCDDDE", "#1D4C63", "#0A3075", "#170F4F", "#3F1556", "#4F1729", "#791E0E", "#732F10", "#744C16", "#74581A", "#8C8529", "#717524", "#3F5623"];

function setcolor() {
  document.body.style.backgroundColor = bgcolor;
  document.getElementsByTagName('body')[0].style.color = focolor;
  for (var i = 1; i < 7; i++) {
    mysheet.deleteRule(mysheet.cssRules.length - 1);
  }

  mysheet.insertRule(`
body, a {
  color: `+ focolor + `;
  font-family: Font3, Arial, Helvetica, sans-serif;
  scroll-behavior: smooth;
  position: relative;
}`, mysheet.cssRules.length)

  mysheet.insertRule(`
.inverted {
background-color: ` + focolor + `;
color: `+ bgcolor + "}", mysheet.cssRules.length);

  mysheet.insertRule(`
button {
text-align: center;
display: inline-block;
margin: 0.25vw 0.5vw;
border-style: solid;
transition-duration: 0.4s;
cursor: pointer;
color: ` + focolor + `;
border-color: ` + focolor + `;
background-color: ` + bgcolor + `;
}
`, mysheet.cssRules.length);

  mysheet.insertRule(`
button:hover {
color: ` + bgcolor + `;
border-color: ` + focolor + `;
background-color: ` + focolor + `;
}
`, mysheet.cssRules.length);

  mysheet.insertRule(`
.card {
height: 8vw;
border-style: solid;
border-radius: 0.6vw;
border-color: `+ focolor + `;
margin-top: 4vw;
}
`, mysheet.cssRules.length);

  mysheet.insertRule(`
table, th, td {
table-layout: fixed;
border-style: solid;
border-width: 0.1vw;
border-color: `+ focolor + ";}", mysheet.cssRules.length);

  mysheet.insertRule(`
hr {
  border-color: `+ focolor + `;
  width: 98vw;
  margin-top: 5vw;
  margin-bottom: 2vw;
}`, mysheet.cssRules.length);
  localStorage.setItem('b', bgcolor);
  localStorage.setItem('f', focolor);
}
function theme(bgindex, foindex, inverted) {
  if (inverted) {
    bgcolor = flist[bgindex];
    focolor = blist[foindex];
  } else {
    bgcolor = blist[bgindex];
    focolor = flist[foindex];
  }
  setcolor();
}