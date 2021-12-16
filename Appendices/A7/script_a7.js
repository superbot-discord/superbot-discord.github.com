var flipper = document.getElementById('flipper')

function flip() {
  dark=!dark;
  [bgcolor,focolor]=[focolor,bgcolor]
  localStorage.setItem('dark', String(dark))
  setcolor();
}

function hs_flipper() {
  console.log(flipper.style.display)
  if (flipper.style.display == 'block') {
    flipper.style.display = 'none'
  } else if (flipper.style.display == 'none') {
    flipper.style.display = 'block'
  }
}