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
    function channel_sign($x) {
      if($x == 0) return "#";     // Test
      elseif($x == 2) return "!"; // Voice
      elseif($x == 4) return "";  // Category
      elseif($x == 5) return ">"; // Announcement
      elseif($x == 6) return "$"; // Store
      elseif($x == 13) return "%";// Stage
      else return "";
    }

    function channel_echo($x) {
      global $everyone_id;
      echo "<p class='small'>" . channel_sign($x['type']) . " {$x['name']}";
      if ($x['type'] == 2) {
        echo " (" . $x['bitrate'] / 1000 . " KB/S";
        if ($x['user_limit'] != 0) {
          echo "; Max. {$x['user_limit']} users";
        }
        echo ")";
      }
      if ($x['nsfw']) {
        echo " &#x26A0;&#xFE0E;";
      }
      $everyone_overwrite = array_filter($x['permission_overwrites'], function($y) use ($everyone_id) {return $y['id']==$everyone_id;});
      if (count($everyone_overwrite)) {
        $overwrites = perms(perms_raw(intval(reset($everyone_overwrite)['allow']), intval(reset($everyone_overwrite)['deny'])));
        if (!in_array("VC", $overwrites)) {
          echo " <span class='emoji'>&#x1F512;</span>";
        }
      }
      echo "</p>";
    };

    function perms_raw($a, $d, $b = 0) {
      if ($b != 0) {
        return $b & ~$d | $a;
      } else {
        return ~$d | $a;
      }
    }

    function perms($x) {
      $y = [];
      /*
      Second character:
      C  Channels
      M  Messages
      N  Members or Nicknames
      T  Threads
      V  Voice Channels
      */
      (($x >> 0 ) & 1) ? $y[]="IS":null; // Create Invites
      (($x >> 1 ) & 1) ? $y[]="KN":null; // Kick Members
      (($x >> 2 ) & 1) ? $y[]="BN":null; // Ban Members
      (($x >> 3 ) & 1) ? $y[]="AS":null; // Administrator
      (($x >> 4 ) & 1) ? $y[]="MC":null; // Manage Channels
      (($x >> 5 ) & 1) ? $y[]="MS":null; // Manage Server
      (($x >> 6 ) & 1) ? $y[]="RM":null; // Add Reactions
      (($x >> 7 ) & 1) ? $y[]="VL":null; // View Audit Logs
      (($x >> 8 ) & 1) ? $y[]="PV":null; // Priority Speaker
      (($x >> 9 ) & 1) ? $y[]="VV":null; // Use Video (Stream)
      (($x >> 10) & 1) ? $y[]="VC":null; // View Channels
      (($x >> 11) & 1) ? $y[]="SM":null; // Send Messages
      (($x >> 12) & 1) ? $y[]="TM":null; // Send TTS Messages
      (($x >> 13) & 1) ? $y[]="MM":null; // Manage Messages
      (($x >> 14) & 1) ? $y[]="EM":null; // Embed Links
      (($x >> 15) & 1) ? $y[]="FM":null; // Attach Files
      (($x >> 16) & 1) ? $y[]="HM":null; // Read Message History
      (($x >> 17) & 1) ? $y[]="XM":null; // Mention Everyone
      (($x >> 18) & 1) ? $y[]="XE":null; // Use External Emojis
      (($x >> 19) & 1) ? $y[]="NS":null; // View Server Insights
      (($x >> 20) & 1) ? $y[]="CV":null; // Connect (Voice)
      (($x >> 21) & 1) ? $y[]="SV":null; // Speak (Audio)
      (($x >> 22) & 1) ? $y[]="MV":null; // Mute Members
      (($x >> 23) & 1) ? $y[]="DV":null; // Deafen Members
      (($x >> 24) & 1) ? $y[]="OV":null; // Move Members
      (($x >> 25) & 1) ? $y[]="AV":null; // Use Voice Activity
      (($x >> 26) & 1) ? $y[]="CN":null; // Change Nickname
      (($x >> 27) & 1) ? $y[]="MN":null; // Manage Nicknames
      (($x >> 28) & 1) ? $y[]="MR":null; // Manage Roles
      (($x >> 29) & 1) ? $y[]="MW":null; // Manage Webhooks
      (($x >> 30) & 1) ? $y[]="ME":null; // Manage Emojis & Stickers
      (($x >> 31) & 1) ? $y[]="CM":null; // Use Slash Commands
      (($x >> 32) & 1) ? $y[]="RV":null; // Request To Speak
      (($x >> 33) & 1) ? $y[]="ME":null; // Manage Events
      (($x >> 34) & 1) ? $y[]="MT":null; // Manage Threads
      (($x >> 35) & 1) ? $y[]="CT":null; // Create Public Threads
      (($x >> 36) & 1) ? $y[]="PT":null; // Create Private Threads
      (($x >> 37) & 1) ? $y[]="SE":null; // Use External Stickers
      (($x >> 38) & 1) ? $y[]="ST":null; // Send in Threads
      return $y;
    }
    function parseHeaders( $headers ) {
      $head = array();
      foreach( $headers as $k=>$v ) {
        $t = explode( ':', $v, 2 );
        if (isset($t[1])) {
          $head[ trim($t[0]) ] = trim( $t[1] );
        } else {
          $head[] = $v;
          if(preg_match("#HTTP/[0-9\.]+\s+([0-9]+)#",$v, $out)) {
            $head['reponse_code'] = intval($out[1]);
          }
        }
      }
      return $head;
    }

    $opts = array('http'=>array(
      'method' => "GET",
      'header' => "Authorization: Bearer {$_COOKIE["ACT"]}"
    ));
    $opts_token = array('http'=>array(
      'method' => "GET",
      'header' => "Authorization: Bot {$_ENV['TOKEN']}"
    ));
    $context = stream_context_create($opts);
    $context_token = stream_context_create($opts_token);
    $user = json_decode(file_get_contents("https://discord.com/api/v9/users/@me?{$_ENV['CLIENTSTR']}", false, $context), true);
    echo "<p>Logged in as: <span class='bold'>" . $user['username'] . "#" . $user['discriminator'] . "</span></p>";
    $member = @json_decode(file_get_contents("https://discord.com/api/v9/users/@me/guilds/{$_GET['id']}/member?{$_ENV['CLIENTSTR']}", false, $context), true);
    $headers = parseHeaders($http_response_header);
    if ($headers['x-ratelimit-remaining'] == 0) {
      echo "<p>The ID supplied might be wrong, or the server cannot process your request currently. Please try again after {$headers['x-ratelimit-reset-after']} seconds.</p>";
      exit();
    } else {
      echo "<p>Unfortunately, due to Discord's rate limits, you can only reload {$headers['x-ratelimit-remaining']} more time(s) within {$headers['x-ratelimit-reset-after']} seconds.</p>";
    }
    if ($member['nick']) {
      echo "<p>Nickname: {$member['nick']}</p>";
    } else {
      echo "<p>Nickname: {$user['username']} (Unchanged)</p>";
    }
    set_error_handler('errorHandler');
    try {
      $server = json_decode(file_get_contents("https://discord.com/api/v9/guilds/{$_GET['id']}?{$_ENV['CLIENTSTR']}", false, $context_token), true);
    } catch (Exception $e) {
      echo "<p>The bot is not in the server.</p>";
      exit();
    }
    echo "<h2>{$server['name']}</h2>";
    if ($server['icon'] != null) {
      echo "<img src='https://cdn.discordapp.com/icons/{$server['id']}/{$server['icon']}?size=1024'>";
    }
    echo "<h3>Roles</h3><p class='smaller'>Roles that you have are bolded. Automated roles (roles made by bots or connections) are italicized. Roles displayed separately are suffixed with $. Mentionable roles are suffixed with @.</p>";
    $server_roles = $server['roles'];
    $positions = array_column($server_roles, 'position');
    array_multisort($positions, SORT_DESC, $server_roles);
    foreach ($server_roles as $x) {
      $extra_bold = (in_array($x['id'], $member['roles'], true)?" class='bold'":"");
      $extra_i1 = ($x['managed']?"<i>":"");
      $extra_i2 = ($x['managed']?"</i>":"");
      $extra_ho = ($x['hoist']?"$":"");
      $extra_me = ($x['mentionable']?"@":"");
      if ($x['position'] == 0) {
        $everyone_id = $x['id'];
      }
      echo "<div class='colorbox_'><div class='colorbox' style='background-color: #" . str_pad(dechex($x['color']), 6, "0", STR_PAD_LEFT) . ";'></div><p{$extra_bold}>{$extra_i1}{$x['name']}{$extra_i2} {$extra_ho}{$extra_me}</p></div>";
    }

    echo "<h3>Channels</h3>";
    $channels = json_decode(file_get_contents("https://discord.com/api/v9/guilds/{$_GET['id']}/channels?{$_ENV['CLIENTSTR']}", false, $context_token), true);
    $lonely_ch = array_filter($channels, function($x) {return $x['parent_id'] == null and $x['type'] != 4;});
    $lonely_ch_ = array_column($lonely_ch, 'position');
    array_multisort($lonely_ch_, SORT_DESC, $lonely_ch);
    $categories = array_filter($channels, function($x) {return $x['type'] == 4;});
    $categories_ = array_column($categories, 'position');
    array_multisort($categories_, SORT_ASC, $categories);
    foreach ($lonely_ch as $x) {
      channel_echo($x);
    }
    foreach ($categories as $x) {
      echo "<p>{$x['name']}</p>";
      $ch_in = array_filter($channels, function($y) use($x) {return $y['parent_id'] == $x['id'];});
      $ch_in_ = array_column($ch_in, 'position');
      array_multisort($ch_in_, SORT_ASC, $ch_in);
      $ch_in_vc = array_filter($ch_in, function($y) {return $y['type'] == 2;});
      foreach ($ch_in_vc as $y) {
        array_push($ch_in, $y);
        array_splice($ch_in, array_search($y, $ch_in, true), 1);
      }
      $ch_in_sg = array_filter($ch_in, function($y) {return $y['type'] == 13;});
      foreach ($ch_in_sg as $y) {
        array_push($ch_in, $y);
        array_splice($ch_in, array_search($y, $ch_in, true), 1);
      }
      foreach ($ch_in as $y) {
        channel_echo($y);
      }
    }
    echo "<h3>Generic Server info</h3><p>This section is still being worked on. Please be patient!</p>";
  ?>
</body>

</html>