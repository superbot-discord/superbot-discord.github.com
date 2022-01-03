var boxes_ = ["timestamp", "Y", "M", "D", "h", "m", "s"];
var boxes = ["Y", "M", "D", "h", "m", "s"];
var date_now = new Date();

timestamp_i = localStorage.getItem('timestamp') || "0";
Y_i = date_now.getFullYear();
M_i = date_now.getMonth() + 1;
D_i = date_now.getDate();
h_i = date_now.getHours();
m_i = date_now.getMinutes();
s_i = date_now.getSeconds();

for (i of boxes_) {
  window[i + "_box"] = document.getElementById(i + "_box");
  window[i + "_box"].value = window[i + "_i"]
}


var i, j, k, name_;
for (k=1; k<=2; k++) {
  for (i=1; i<=7; i++) {
    for (j=1; j<=3; j++) {
      name_ = 't' + String(k) + String(i) + String(j)
      window['elm_'+name_] = document.getElementById(name_)
    }
  }
}

var dt1
function convert_1() {
  timestamp_box.value = timestamp_box.value.replace(/[^\d-]/g,'');
  timestamp_i = timestamp_box.value
  localStorage.setItem('ts', timestamp_i);
  
  if (timestamp_i == "" || timestamp_i == "-") {
    timestamp_i = "0"
  }
  dt1 = new Date(parseInt(timestamp_i)*1000)
  convert(timestamp_i, "1", dt1)
}

var dt2
function convert_2() {
  for (i of boxes) {
    window[i + "_box"].value = window[i + "_box"].value.replace(/[^\d-]/g,'');
    window[i + "_i"] = window[i + "_box"].value
    localStorage.setItem(i, window[i + "_i"]);
    
    if (window[i + "_i"] == "" || window[i + "_i"] == "-") {
      window[i + "_i"] = "0"
    }
  }
  dt2 = new Date(Y_i, M_i - 1, D_i, h_i, m_i, s_i)
  convert(dt2.getTime() / 1000, "2", dt2)
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var weekdays=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var dt_, dt_12h
function convert(ts, tb_id, dt) {
  dt_ = [dt.getFullYear(), String(dt.getMonth()+1).padStart(2, "0"), months[dt.getMonth()], dt.getDate(), String(dt.getDate()).padStart(2, "0"), weekdays[dt.getDay()], String(dt.getHours()).padStart(2, "0"), String(dt.getMinutes()).padStart(2, "0"), String(dt.getSeconds()).padStart(2, "0")]
  if (dt.getHours() >= 13) {
    dt_12h = [dt.getHours() - 12, "PM"]
  } else if (dt.getHours() == 12) {
    dt_12h = [dt.getHours(), "PM"]
  } else {
    dt_12h = [dt.getHours(), "AM"]
  }

  if (ts.length >= 13) {
    window[`elm_t${tb_id}11`].className = "small code"
    window[`elm_t${tb_id}21`].className = "smalle code"
    window[`elm_t${tb_id}31`].className = "smalle code"
    window[`elm_t${tb_id}41`].className = "smalle code"
    window[`elm_t${tb_id}51`].className = "smalle code"
    window[`elm_t${tb_id}61`].className = "smalle code"
    window[`elm_t${tb_id}71`].className = "smalle code"
  } else {
    window[`elm_t${tb_id}11`].className = "code"
    if (ts.length == 12) {
      window[`elm_t${tb_id}21`].className = "small code"
      window[`elm_t${tb_id}31`].className = "small code"
      window[`elm_t${tb_id}41`].className = "small code"
      window[`elm_t${tb_id}51`].className = "small code"
      window[`elm_t${tb_id}61`].className = "small code"
      window[`elm_t${tb_id}71`].className = "small code"
    } else if (ts.length < 12) {
      window[`elm_t${tb_id}21`].className = "code"
      window[`elm_t${tb_id}31`].className = "code"
      window[`elm_t${tb_id}41`].className = "code"
      window[`elm_t${tb_id}51`].className = "code"
      window[`elm_t${tb_id}61`].className = "code"
      window[`elm_t${tb_id}71`].className = "code"
    }
  }
  
  window[`elm_t${tb_id}11`].innerHTML = `&lt;t:${ts}&gt;`
  window[`elm_t${tb_id}12`].innerHTML = `${dt_[2]} ${dt_[3]}, ${dt_[0]} ${dt_12h[0]}:${dt_[7]} ${dt_12h[1]}`
  window[`elm_t${tb_id}13`].innerHTML = `${dt_[3]} ${dt_[2]} ${dt_[0]} ${dt_[6]}:${dt_[7]}`

  window[`elm_t${tb_id}21`].innerHTML = `&lt;t:${ts}:F&gt;`
  window[`elm_t${tb_id}22`].innerHTML = `${dt_[5]}, ${dt_[2]} ${dt_[3]}, ${dt_[0]} ${dt_12h[0]}:${dt_[7]} ${dt_12h[1]}`
  window[`elm_t${tb_id}23`].innerHTML = `${dt_[5]}, ${dt_[3]} ${dt_[2]} ${dt_[0]} ${dt_[6]}:${dt_[7]}`

  window[`elm_t${tb_id}31`].innerHTML = `&lt;t:${ts}:f&gt;`
  window[`elm_t${tb_id}32`].innerHTML = `${dt_[2]} ${dt_[3]}, ${dt_[0]} ${dt_12h[0]}:${dt_[7]} ${dt_12h[1]}`
  window[`elm_t${tb_id}33`].innerHTML = `${dt_[3]} ${dt_[2]} ${dt_[0]} ${dt_[6]}:${dt_[7]}`

  window[`elm_t${tb_id}41`].innerHTML = `&lt;t:${ts}:D&gt;`
  window[`elm_t${tb_id}42`].innerHTML = `${dt_[2]} ${dt_[3]}, ${dt_[0]}`
  window[`elm_t${tb_id}43`].innerHTML = `${dt_[3]} ${dt_[2]} ${dt_[0]}`

  window[`elm_t${tb_id}51`].innerHTML = `&lt;t:${ts}:d&gt;`
  window[`elm_t${tb_id}52`].innerHTML = `${dt_[1]}/${dt_[4]}/${dt_[0]} (M/D/Y)`
  window[`elm_t${tb_id}53`].innerHTML = `${dt_[4]}/${dt_[1]}/${dt_[0]} (D/M/Y)`

  window[`elm_t${tb_id}61`].innerHTML = `&lt;t:${ts}:T&gt;`
  window[`elm_t${tb_id}62`].innerHTML = `${dt_12h[0]}:${dt_[7]}:${dt_[8]} ${dt_12h[1]}`
  window[`elm_t${tb_id}63`].innerHTML = `${dt_[6]}:${dt_[7]}:${dt_[8]}`

  window[`elm_t${tb_id}71`].innerHTML = `&lt;t:${ts}:t&gt;`
  window[`elm_t${tb_id}72`].innerHTML = `${dt_12h[0]}:${dt_[7]} ${dt_12h[1]}`
  window[`elm_t${tb_id}73`].innerHTML = `${dt_[6]}:${dt_[7]}`
}

function copy_(x) {
  navigator.clipboard.writeText(x.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML.replace("&lt;", "<").replace("&gt;", ">"));
  x.innerHTML = "Copied!";
}

function uncopy_(x) {
  x.innerHTML = "Copy";
}

convert_1();
convert_2();