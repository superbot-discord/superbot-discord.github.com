var bgcolor = localStorage.getItem('b') || "#ffffff";
var focolor = localStorage.getItem('f') || "#000000";
var mysheet = document.getElementById("mystyle").sheet;

document.body.style.backgroundColor = bgcolor;
document.getElementsByTagName('body')[0].style.color = focolor;
links = document.getElementsByTagName('a')
for (var i = 0; i < links.length; i++) {
  links[i].style.color = focolor;
}
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
  border-color: `+ focolor +`;
  width: 98vw;
  margin-top: 5vw;
  margin-bottom: 2vw;
}`, mysheet.cssRules.length);

localStorage.setItem('b', bgcolor);
localStorage.setItem('f', focolor);