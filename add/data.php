<?php 

define("db","mysql:dbname=dictionary;host=localhost");
define("user","root");
define("pw","");
/*
define("db","mysql:dbname=makun6250_quiz;host=mysql1.php.xdomain.ne.jp;");
define("user","makun6250_php");
define("pw","taka6250");
*/
class h
{
  public static function s($text){
    return htmlspecialchars($text,ENT_QUOTES,"UTF-8");
  }
}
class PdoData
{
  public static function getPdo(){
    return new PDO(db,user,pw);
  }
}
?>