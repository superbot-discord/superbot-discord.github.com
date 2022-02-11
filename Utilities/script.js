var boxes_ = ["timestamp", "Y", "M", "D", "h", "m", "s"];
var boxes = ["Y", "M", "D", "h", "m", "s"];
var date_now;

timestamp_i = localStorage.getItem('timestamp') || "0";

for (i of boxes_) { // Input boxes
  window[i + "_box"] = document.getElementById(i + "_box");
  window[i + "_box"].value = window[i + "_i"]
}


var i, j, k, name_;
for (k=1; k<=2; k++) { // For each table
  for (i=1; i<=8; i++) { // For each tr
    for (j=1; j<=3; j++) { // For each td
      name_ = 't' + String(k) + String(i) + String(j)
      window['elm_'+name_] = document.getElementById(name_)
    }
  }
}

var dt1
function convert_1() { // Table 1 conversion
  timestamp_box.value = timestamp_box.value.replace(/[^\d-]/g,'');
  if (parseInt(timestamp_box.value) > 8640000000000) {
    timestamp_box.value = "8640000000000"
  } else if (parseInt(timestamp_box.value) < -8640000000000) {
    timestamp_box.value = "-8640000000000"
  }
  timestamp_i = timestamp_box.value
  localStorage.setItem('timestamp', timestamp_i);
  
  if (timestamp_i == "" || timestamp_i == "-") {
    timestamp_i = "0"
  }
  dt1 = new Date(parseInt(timestamp_i)*1000)
  convert(timestamp_i, "1", dt1)
}

var dt2
function convert_2() { // Table 2 conversion
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
var dt_, dt_12h, time_diff, rel_disp
function convert(ts, tb_id, dt) {
  dt_ = [dt.getFullYear(), String(dt.getMonth()+1).padStart(2, "0"), months[dt.getMonth()], dt.getDate(), String(dt.getDate()).padStart(2, "0"), weekdays[dt.getDay()], String(dt.getHours()).padStart(2, "0"), String(dt.getMinutes()).padStart(2, "0"), String(dt.getSeconds()).padStart(2, "0")]
  // dt_ = [2038, "01", "January", 9, "09", "Saturday", "03", "14", "07"] 10 days before Y2K38
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

  date_now = new Date();
  time_diff = (date_now - dt) / 1000
  if (time_diff < 45) { // 45s
    rel_disp = "a few seconds ago"
  } else if (time_diff < 60 * 2) { // 2m
    rel_disp = "a minute ago"
  } else if (time_diff < 60 * 45) { // 45m
    rel_disp = `${(time_diff/60) << 0} minutes ago`
  } else if (time_diff < 60 * 90) { // 90m
    rel_disp = "an hour ago"
  } else if (time_diff < 60 * 60 * 21) { // 21h
    rel_disp = `${Math.round(time_diff/3600)} hours ago`
  } else {
    rel_disp = "Beta"
  }
  window[`elm_t${tb_id}81`].innerHTML = `&lt;t:${ts}:R&gt;`
  window[`elm_t${tb_id}82`].innerHTML = window[`elm_t${tb_id}83`].innerHTML = rel_disp
}

function copy_(x) {
  navigator.clipboard.writeText(x.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML.replace("&lt;", "<").replace("&gt;", ">"));
  x.innerHTML = "Copied!";
}

function uncopy_(x) {
  x.innerHTML = "Copy";
}

function stn() {
  date_now = new Date();
  Y_i = date_now.getFullYear();
  M_i = date_now.getMonth() + 1;
  D_i = date_now.getDate();
  h_i = date_now.getHours();
  m_i = date_now.getMinutes();
  s_i = date_now.getSeconds();
  for (i of boxes_) { // Input boxes
    window[i + "_box"].value = window[i + "_i"]
  }
  convert_2();
}

function update() {
  convert_1();
  convert_2();
}

stn();
convert_1();