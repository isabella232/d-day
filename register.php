<?php
$back = 'http://nextgis.ru/d-day';
if( !isset($_REQUEST['name']) || strlen(trim($_REQUEST['name'])) == 0 || !isset($_REQUEST['org']) || strlen(trim($_REQUEST['org'])) == 0 || !isset($_REQUEST['email']) || strlen(trim($_REQUEST['email'])) == 0) {
    header("Location: $back");
    exit();
}
if( $f = @fopen('d-day.txt', 'a') ) {
    fwrite($f, trim($_REQUEST['name']).";".trim($_REQUEST['org']).";".trim($_REQUEST['email'])."\n");
    fclose($f);
}
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="7; url=<?=$back ?>" />
<title>Регистрация на NextGIS Demo Day 2015</title>
<link rel="stylesheet" href="style.css">
</head>
<body style="margin-top: 200px;">
<h1>Спасибо за регистрацию!</h1>
<p>Вы записали: </p>
<ul>
<li>Имя: «<?=htmlspecialchars($_REQUEST['name']) ?>»</li>
<li>Адрес: «<?=htmlspecialchars($_REQUEST['email']) ?>»</li>
<li>Организация: «<?=htmlspecialchars($_REQUEST['org']) ?>»</li>
</ul>
Если хотите записать ещё кого-то, просто отправьте форму ещё раз. Сейчас вернём вас к <a href="<?=$back ?>">странице регистрации</a>.</p>
</body>
</html>
