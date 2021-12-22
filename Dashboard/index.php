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
    <a target="_self" href="/Dashboard" style="float: right;" class="active">Dashboard</a>
  </div>

  <script src="/script_generic.js"></script>
  <h1>Web Dashboard</h1>
  <p class="smaller">Please kindly put down the ugly look for a moment and appreciate the work behind all this. Thank you!</p><br>
  <?php
    $CLIENT_ID = "796686363604680755";
    $CLIENT_SE = "csnkpOhO8P5O-pU3NlM9zyrDdGYxp68S";
    //$REDIR_URI = "http://127.0.0.1:5500/Dashboard";
    $REDIR_URI = "https://superbot-website.vercel.app/Dashboard";
    $data = array(
      'code'          => $_GET['code'],
      'client_id'     => $CLIENT_ID,
      'client_secret' => $CLIENT_SE,
      'redirect_uri'  => $REDIR_URI,
      'grant_type'    => "authorization_code",
    );
   $opts = array('http'=>array(
      'method' => "POST",
      'content'=> http_build_query($data),
      'header' => "Content-type: application/x-www-form-urlencoded"
    ));
    $context = stream_context_create($opts);
    $auth = json_decode(file_get_contents('https://discord.com/api/v9/oauth2/token', false, $context), true);
    $opts = array('http'=>array(
      'method' => "GET",
      'header' => "Authorization: Bearer " . $auth['access_token']
    ));
    $context = stream_context_create($opts);
    $servers = file_get_contents('https://discord.com/api/v9/users/@me/guilds?client_id=796686363604680755&client_secret=csnkpOhO8P5O-pU3NlM9zyrDdGYxp68S&grant_type=authorization_code', false, $context);
    $servers = json_decode($servers, true);
    foreach ($servers as $x) {
      echo "<div class='server'><img src='";
      if ($x['icon'] != null) {
        echo "https://cdn.discordapp.com/icons/" . $x['id'] . "/" . $x['icon'];
      } else {
        echo "https://cdn.discordapp.com/embed/avatars/1";
      }
      echo ".png'><p>" . $x['name'] . "</p></div>";
    }
  ?>
</body>

</html>