function filter() {
  var name
  var search_box = document.getElementById("search")
  search_box.value = search_box.value.replace(/[^A-z\s]/g,'');
  var input = search_box.value
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