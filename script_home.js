blist = ["#FFFFFF", "#F2F3F5", "#76D3F9", "#7DA8F7", "#AA90F7", "#D798F8", "#DE799D", "#F19286", "#F3A884", "#F7C783", "#FAD885", "#FFF8A2", "#EDF29B", "#BADD95"];
flist = ["#000000", "#37393E", "#1D4C63", "#0A3075", "#170F4F", "#3F1556", "#4F1729", "#791E0E", "#732F10", "#744C16", "#74581A", "#8C8529", "#717524", "#3F5623"];

function theme(bgindex, foindex, inverted) {
  localStorage.setItem('dark', String(inverted))
  dark = inverted
  if (inverted) {
    bgcolor = flist[bgindex];
    focolor = blist[foindex];
  } else {
    bgcolor = blist[bgindex];
    focolor = flist[foindex];
  }
  localStorage.setItem('b', bgcolor);
  localStorage.setItem('f', focolor);
  setcolor();
}