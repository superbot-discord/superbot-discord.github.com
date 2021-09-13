var bgcolor = localStorage.getItem('b') || "#ffffff";
var focolor = localStorage.getItem('f') || "#000000";
var dark = localStorage.getItem('dark') || false
var mysheet = document.getElementById("mystyle").sheet;

function filter() {
  var name
  var element = document.getElementById("search")
  element.value = element.value.replace(/[^A-z]/g,'');
  var input = element.value
  var lowered = input.toLowerCase();
  var rows = document.getElementById("search_results").getElementsByTagName("tr");

  for (var i = 3; i < rows.length; i++) {
    name = rows[i].getElementsByTagName("td")[0]
    cmd_name = name.textContent || name.innerText;
    if (cmd_name.includes(lowered)) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }
  }
}

function adjust(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

for (var i = 1; i < 14; i++) {
  mysheet.deleteRule(mysheet.cssRules.length - 1);
}

if (dark) {
  adjusted_bg = adjust(bgcolor, -20);
  adjusted_bg2 = adjust(bgcolor, -10);
  adjusted_bg3 = adjust(bgcolor, 10);
  adjusted_fo = adjust(focolor, -20);
  adjusted_fo2 = adjust(focolor, 40);
} else {
  adjusted_bg = adjust(bgcolor, 20);
  adjusted_bg2 = adjust(bgcolor, 10);
  adjusted_bg3 = adjust(bgcolor, -10);
  adjusted_fo = adjust(focolor, 20);
  adjusted_fo2 = adjust(focolor, -40);
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
localStorage.setItem('b', bgcolor);
localStorage.setItem('f', focolor);

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
width: 9.5vw;
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