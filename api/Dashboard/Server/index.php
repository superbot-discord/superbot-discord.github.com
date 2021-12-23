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
    function errorHandler($errno, $errstr, $errfile, $errline) {
      throw new Exception($errstr, $errno);
    }
    set_error_handler('errorHandler');

    $opts = array('http'=>array(
      'method' => "GET",
      'header' => "Authorization: Bearer " . $_COOKIE["ACT"]
    ));
    $opts_token = array('http'=>array(
      'method' => "GET",
      'header' => "Authorization: Bot " . $_ENV['TOKEN']
    ));
    $context = stream_context_create($opts);
    $context_token = stream_context_create($opts_token);
    $user = json_decode(file_get_contents('https://discord.com/api/v9/users/@me?' . $_ENV['CLIENTSTR'], false, $context), true);
    echo "<p>Logged in as: <span class='bold'>" . $user['username'] . "#" . $user['discriminator'] . "</span></p>";
    try {
      $member = json_decode(file_get_contents('https://discord.com/api/v9/users/@me/guilds/' . $_GET['id'] . '/member?' . $_ENV['CLIENTSTR'], false, $context), true);
      if ($member['nick']) {
        echo "<p>Nickname: " . $member['nick'] . "</p>";
      } else {
        echo "<p>Nickname: " . $user['username'] . " (Unchanged)</p>";
      }
    } catch (Exception $e) {
      echo "<p>The ID supplied might be wrong, or the server cannot process your request currently. Please try again in a maximum of 5 minutes.</p>";
    }
    echo "<h3>Roles</h3><p class='smaller'>Roles that you have are highlighted. Automated roles (roles made by bots or connections) are italicized. Roles displayed separately are suffixed with $. Mentionable roles are suffixed with @.</p>";
    try {
      $server = json_decode(file_get_contents('https://discord.com/api/v9/guilds/' . $_GET['id'] . '?' . $_ENV['CLIENTSTR'], false, $context_token), true);
    } catch (Exception $e) {
      echo "<p>The bot is not in the server.</p>";
      exit();
    }
    $server_roles = $server['roles'];
    $positions = array_column($server_roles, 'position');
    array_multisort($positions, SORT_DESC, $server_roles);
    foreach ($server_roles as $x) {
      $extra_bold = (in_array($x['id'], $member['roles'], true)?" class='bold'":"");
      $extra_i1 = ($x['managed']?"<i>":"");
      $extra_i2 = ($x['managed']?"</i>":"");
      $extra_ho = ($x['hoist']?"$":"");
      $extra_me = ($x['mentionable']?"@":"");
      echo "<div class='colorbox_'><div class='colorbox' style='background-color: #" . str_pad(dechex($x['color']), 6, "0", STR_PAD_LEFT) . ";'></div><p{$extra_bold}>{$extra_i1}{$x['name']}{$extra_i2} {$extra_ho}{$extra_me}</p></div>";
    }
    echo "<h3>Generic Server info</h3><p>This section is still being worked on. Please be patient!</p>";
  ?>
</body>

</html>