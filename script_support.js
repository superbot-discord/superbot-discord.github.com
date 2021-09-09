var bgcolor = localStorage.getItem('b') || "#ffffff";
var focolor = localStorage.getItem('f') || "#000000";
var dark = localStorage.getItem('dark') || false
var mysheet = document.getElementById("mystyle").sheet;

document.body.style.backgroundColor = bgcolor;
document.getElementsByTagName('body')[0].style.color = focolor;
if (dark == "true") {
  document.getElementById('discord').src = "https://discord.com/widget?id=805441351033552916&theme=dark";
} else {
  document.getElementById('discord').src = "https://discord.com/widget?id=805441351033552916&theme=light";
}

links = document.getElementsByTagName('a')
for (var i = 0; i < links.length; i++) {
  links[i].style.color = focolor;
}
for (var i = 1; i < 8; i++) {
  mysheet.deleteRule(mysheet.cssRules.length - 1);
}

function adjust(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

mysheet.insertRule(`
body, a {
  color: `+ focolor + `;
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
  border-color: `+ focolor +`;
  width: 98vw;
  margin-top: 5vw;
  margin-bottom: 2vw;
}`, mysheet.cssRules.length);

if (dark) {
  adjusted_bg = adjust(bgcolor, -20);
  adjusted_fo = adjust(focolor, -20);
} else {
  adjusted_bg = adjust(bgcolor, 20);
  adjusted_fo = adjust(focolor, 20);
}

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

localStorage.setItem('b', bgcolor);
localStorage.setItem('f', focolor);