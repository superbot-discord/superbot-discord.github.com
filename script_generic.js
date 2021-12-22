var bgcolor = localStorage.getItem('b') || "#ffffff";
var focolor = localStorage.getItem('f') || "#000000";
var dark = localStorage.getItem('dark')==='true' || false
var mysheet = document.getElementById("mystyle").sheet;
var favicons = `<link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="/favicons/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
<link rel="manifest" href="/favicons/manifest.json">
<meta name="msapplication-TileColor" content="#888888">
<meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png">
<meta name="theme-color" content="#888888">`
document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', favicons)

function adjust(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function setcolor () {
  if (dark) {
    adjusted_bg = adjust(bgcolor, 40);
    adjusted_bg2 = adjust(bgcolor, 20);
    adjusted_bg3 = adjust(bgcolor, 10);
    adjusted_bg4 = adjust(bgcolor, 20);
    adjusted_fo = adjust(focolor, -5);
    adjusted_fo2 = adjust(focolor, 40);
  } else {
    adjusted_bg = adjust(bgcolor, -20);
    adjusted_bg2 = adjust(bgcolor, -10);
    adjusted_bg3 = adjust(bgcolor, -5);
    adjusted_bg4 = adjust(bgcolor, 10);
    adjusted_fo = adjust(focolor, 20);
    adjusted_fo2 = adjust(focolor, -40);
  }
  adjusted_fo3 = adjust(focolor, 60);

  for (var i = 1; i < 18; i++) {
    mysheet.deleteRule(mysheet.cssRules.length - 1);
  }

  mysheet.insertRule(`
  .th {
  position: sticky;
  left: 5px;
  right: 5px;
  width: 99%;
  background-color: ` + bgcolor + `;
  }`, mysheet.cssRules.length)

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
  .checkbox {
  width: 2vw;
  height: 2vw;
  margin-right: 0.5vw;
  border-color: ` + focolor + `;
  border-style: solid;
  display: inline;
  float: left;
  background-color: ` + bgcolor + `;
  }`, mysheet.cssRules.length)

  mysheet.insertRule(`
  .checkbox__:hover input ~ .checkbox {
  background-color: ` + adjusted_bg4 + `;
  }`, mysheet.cssRules.length)

  mysheet.insertRule(`
  .checkbox__ input:checked ~ .checkbox {
  background-color: ` + adjusted_fo3 + `;
  }`, mysheet.cssRules.length)

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
  }`, mysheet.cssRules.length);

  mysheet.insertRule(`
  button:hover {
  color: ` + bgcolor + `;
  border-color: ` + focolor + `;
  background-color: ` + focolor + `;
  }`, mysheet.cssRules.length);

  mysheet.insertRule(`
  .card {
  height: 8vw;
  border-style: solid;
  border-radius: 0.6vw;
  border-color: `+ focolor + `;
  margin-top: 4vw;
  }`, mysheet.cssRules.length);

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
  font-family: Font2b;
  font-weight: 100;
  margin-left: 1vw;
  margin-top: 1vw;
  margin-bottom: 1vw;
  overflow-x: scroll;
  background-color: `+adjusted_bg+`;
  color: `+adjusted_fo+`
  }`, mysheet.cssRules.length)

  mysheet.insertRule(`#nav,#nav a {
    background-color: `+ adjusted_bg3 +`;
  }`, mysheet.cssRules.length)

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

  mysheet.insertRule(`
  #search {
    width: 96vw;
    font-size: 2vw;
    padding: 0.5vw 1vw;
    margin-bottom: 1vw;
    background-color: `+ adjusted_bg2 +`;
    border: 0.1vw solid `+ focolor +`;
    color: `+ focolor +`;
  }`, mysheet.cssRules.length)

  mysheet.insertRule(`
  #search::placeholder {
    color: `+ adjusted_fo2 +`;
  }`, mysheet.cssRules.length)
}

setcolor()