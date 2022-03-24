<?php 
require("../add/word.php");
$pdo=PdoData::getPdo();
$word=new Word($pdo);
$word->project();
$list=$word->getWord();
?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文言集</title>
    <link rel="stylesheet" href="css/index.css" media="screen and (max-width:600px)">
    <link rel="stylesheet" href="css/edit.css" media="screen and (max-width:600px)">
    <link rel="stylesheet" href="css/start.css" media="screen and (max-width:600px)">
  </head>
  <body>
    <header>
      <button>start</button>
      <button>add</button>
      <button>edit</button>
    </header>
    <div id="start" style="display:none">
    </div>
    <div id="add" style="display:none">
      <form autocomplete="off">
        <p>question</p>
        <input type="text" maxlength="30">
        <p>answere</p>
        <textarea maxlength="500"></textarea>
        <input type="submit" value="">
      </form>
    </div>
    <div id="edit" style="display:none">
      <form id="serch">
        <input type="text">
      </form>
      <ul>
        <?php foreach($list as $li): ?>
          <li data-id="<?= $li["id"]; ?>">
            <span class="q"><?= $li["q"]; ?></span>
            <input type="checkbox">
            <span class="a"><?= $li["a"]; ?></span>
          </li>
        <?php endforeach; ?>
      </ul>
    </div>
    <script src="js/index.js"></script>
    <script src="js/edit.js"></script>
  </body>
</html>