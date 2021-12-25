<?php ob_start(); ?>

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
    <a target="_self" href="/api/Dashboard" style="float: right;" class="active">Dashboard</a>
  </div>

  <script src="/script_generic.js"></script>
  <h1>Web Dashboard</h1>
  <p class="smaller">Please kindly put down the ugly look for a moment and appreciate the work behind all this. Thank you!</p><br>
  <?php
    // $REDIR_URI = "http://127.0.0.1:5500/api/Dashboard";
    $REDIR_URI = "https://superbot-website.vercel.app/api/Dashboard";
    if (isset($_COOKIE["ACT"])) {
      $auth = $_COOKIE["ACT"];
    } else {
      if (isset($_COOKIE["RST"])) {
        $data = array(
          'refresh_token' => $_COOKIE["RST"],
          'client_id'     => $_ENV['CLID'],
          'client_secret' => $_ENV['CLSE'],
          'grant_type'    => "authorization_code",
        );
      } else {
        $data = array(
          'code'          => $_GET['code'],
          'client_id'     => $_ENV['CLID'],
          'client_secret' => $_ENV['CLSE'],
          'redirect_uri'  => $REDIR_URI,
          'grant_type'    => "authorization_code",
        );
      }
      $opts = array('http'=>array(
        'method' => "POST",
        'content'=> http_build_query($data),
        'header' => "Content-type: application/x-www-form-urlencoded"
      ));
      $context = stream_context_create($opts);
      $auth = json_decode(file_get_contents('https://discord.com/api/v9/oauth2/token', false, $context), true);
      setcookie("ACT", $auth['access_token'], time() + $auth['expires_in'], "/api/Dashboard");
      setcookie("RST", $auth['refresh_token'],2147483647, "/api/Dashboard");
      $auth = $auth['access_token'];
    }
    ob_end_flush();
    $opts = array('http'=>array(
      'method' => "GET",
      'header' => "Authorization: Bearer {$auth}"
    ));
    $context = stream_context_create($opts);
    $user = json_decode(file_get_contents('https://discord.com/api/v9/users/@me?' . $_ENV['CLIENTSTR'], false, $context), true);
    echo "<p>Logged in as: <span class='bold'>" . $user['username'] . "#" . $user['discriminator'] . "</span></p>";
    $servers = json_decode(file_get_contents('https://discord.com/api/v9/users/@me/guilds?' . $_ENV['CLIENTSTR'], false, $context), true);
    $opts = array('http'=>array(
      'method' => "GET",
      'header' => "Authorization: Bot {$_ENV['TOKEN']}"
    ));
    $context = stream_context_create($opts);
    $bot_servers = json_decode(file_get_contents('https://discord.com/api/v9/users/@me/guilds?' . $_ENV['CLIENTSTR'], false, $context), true);
    $bot_server_ids = array_column($bot_servers, 'id');
    $server_ids = array_column($servers, 'id');
    $support_server_index = array_search(805441351033552916, $server_ids);
    if ($support_server_index) {
      array_unshift($servers, $servers[$support_server_index]);
      array_splice($servers, $support_server_index+1, 1);
    }
    foreach ($servers as $x) {
      if (in_array($x['id'], $bot_server_ids, true)) {
        $extra_class = " class='bot_in'";
        $extra_url = "window.location.href=\"{$REDIR_URI}/Server?id={$x['id']}\"";
        $extra_bold = " class='bold'";
      } else {
        $extra_class = "";
        $extra_url = "window.open(\"https://discord.com/api/oauth2/authorize?client_id={$_ENV['CLID']}&redirect_uri={$REDIR_URI}&scope=bot+applications.commands&guild_id={$x['id']}&disable_guild_select=true\", \"_blank\");";
        $extra_bold = "";
      }
      echo "<div class='server'><img{$extra_class} onclick='{$extra_url}' src='";
      if ($x['icon'] != null) {
        echo "https://cdn.discordapp.com/icons/{$x['id']}/{$x['icon']}";
      } else {
        echo "https://cdn.discordapp.com/embed/avatars/1";
      }
      echo ".png'><p{$extra_bold}>{$x['name']}</p></div>";
    }
  ?>
</body>

</html>