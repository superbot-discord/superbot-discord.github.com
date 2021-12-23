<!DOCTYPE html>
<html>
<head>
  <title>SuperBot Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" id="mystyle" href="/style.css">
  <base target="_blank">
</head>

<body>
  <div id="nav">
    <a target="_self" href="/">Homepage</a>
    <a target="_self" href="/Map" style="float: right;">Site Map</a>
    <a target="_self" href="/api/Dashboard" style="float: right;">Dashboard</a>
  </div>

  <script src="/script_generic.js"></script>
  <h1>Web Dashboard</h1>
  <?php
    $opts = array('http'=>array(
      'method' => "GET",
      'header' => "Authorization: Bearer " . $_COOKIE["ACT"]
    ));
    echo "<h2>Server ID: " . $_GET['id'] . "</h2>";
    $context = stream_context_create($opts);
    $servers = file_get_contents('https://discord.com/api/v9/users/@me/guilds/805441351033552916/member?client_id=796686363604680755&client_secret=csnkpOhO8P5O-pU3NlM9zyrDdGYxp68S&grant_type=authorization_code', false, $context);
    $servers = json_decode($servers, true);
  ?>
</body>

</html>