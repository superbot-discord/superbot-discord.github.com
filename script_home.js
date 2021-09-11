var bgcolor = localStorage.getItem('b') || "#ffffff";
var focolor = localStorage.getItem('f') || "#000000";
var dark = localStorage.getItem('dark') || false
var mysheet = document.getElementById("mystyle").sheet;
blist = ["#FFFFFF", "#F2F3F5", "#76D3F9", "#7DA8F7", "#AA90F7", "#D798F8", "#DE799D", "#F19286", "#F3A884", "#F7C783", "#FAD885", "#FFF8A2", "#EDF29B", "#BADD95"];
flist = ["#000000", "#37393E", "#1D4C63", "#0A3075", "#170F4F", "#3F1556", "#4F1729", "#791E0E", "#732F10", "#744C16", "#74581A", "#8C8529", "#717524", "#3F5623"];

function adjust(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function setcolor() {
  localStorage.setItem('b', bgcolor);
  localStorage.setItem('f', focolor);

  if (dark) {
    adjusted_bg = adjust(bgcolor, -20);
    adjusted_bg2 = adjust(bgcolor, -10);
    adjusted_bg3 = adjust(bgcolor, 10);
    adjusted_fo = adjust(focolor, -20);
  } else {
    adjusted_bg = adjust(bgcolor, 20);
    adjusted_bg2 = adjust(bgcolor, 10);
    adjusted_bg3 = adjust(bgcolor, -10);
    adjusted_fo = adjust(focolor, 20);
  }

  for (var i = 1; i < 12; i++) {
    mysheet.deleteRule(mysheet.cssRules.length - 1);
  }

  mysheet.insertRule(`
body, a {
  color: `+ focolor + `;
  background-color: `+ bgcolor +`;
  font-family: Font3a, Arial, Helvetica, sans-serif;
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

  mysheet.insertRule(`
div.code {
  font-size: 1.8vw;
  margin-left: 1vw;
  margin-top: 1vw;
  margin-bottom: 1vw;
  overflow-x: scroll;
  background-color: `+adjusted_bg+`;
  color: `+adjusted_fo+`
}`, mysheet.cssRules.length)

mysheet.insertRule("#nav,#nav a {background-color: "+ adjusted_bg3 +";}", mysheet.cssRules.length)

  mysheet.insertRule(`
#nav a {
  float: left;
  display: block;
  color: `+ focolor +`;
  text-align: center;
  padding: 1.2vw;
  width: 10vw;
  text-decoration: none;
}`, mysheet.cssRules.length)

  mysheet.insertRule(`
#nav a:hover:not(.active) {
  background-color: `+ adjusted_bg2 +`;
}`, mysheet.cssRules.length)

  mysheet.insertRule(`
#nav a.active {
  background-color: ` + adjusted_bg + `;
}`, mysheet.cssRules.length)
}

function theme(bgindex, foindex, inverted) {
  localStorage.setItem('dark', String(inverted))
  if (inverted) {
    bgcolor = flist[bgindex];
    focolor = blist[foindex];
  } else {
    bgcolor = blist[bgindex];
    focolor = flist[foindex];
  }
  setcolor();
}