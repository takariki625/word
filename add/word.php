<?php 
require("data.php");
class Word
{
  private $pdo;
  function __construct($pdo){
    $this->pdo=$pdo;
  }
  public function project(){
    if($_SERVER["REQUEST_METHOD"] === "POST"){
      $action=filter_input(INPUT_GET,"action");
      switch($action){
        case "add":
          $this->add();
          break;
        case "update":
          $this->update();
          break;
        case "del":
          $this->del();
          break;
        case "serch":
          $list=$this->serch();
          echo json_encode($list);
          break;
        case "contents":
          $list=$this->contents();
          echo json_encode($list);
          break;
      }
      exit;
    }
  }
  public function contents(){
    $text=filter_input(INPUT_POST,"text");
    if($text === "all"){
      $stmt=$this->pdo->query("SELECT * FROM word ORDER BY RAND() LIMIT 30");
      return $stmt->fetchAll();
    }
    $stmt=$this->pdo->prepare("SELECT * FROM word  WHERE q LIKE :text ORDER BY RAND()");
    $stmt->bindValue("text","%$text%",\PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetchAll();
  }

  public function serch(){
    $text=filter_input(INPUT_POST,"text");
    $stmt=$this->pdo->prepare("SELECT id FROM word WHERE q like :text");
    $stmt->bindValue("text","%$text%",\PDO::PARAM_STR);
    $stmt->execute();
    return $stmt->fetchAll();
  }

  public function del(){
    $id=filter_input(INPUT_POST,"id");
    $stmt=$this->pdo->query("DELETE FROM word WHERE id=$id");
  }

  public function update(){
    $id=filter_input(INPUT_POST,"id");
    $q=filter_input(INPUT_POST,"q");
    $a=filter_input(INPUT_POST,"a");
    $stmt=$this->pdo->prepare("UPDATE word SET q=:q , a=:a WHERE id=:id");
    $stmt->bindValue("id",$id,\PDO::PARAM_INT);
    $stmt->bindValue("q",$q,\PDO::PARAM_STR);
    $stmt->bindValue("a",$a,\PDO::PARAM_STR);
    $stmt->execute();
  }

  public function add(){
    try{
      $q=filter_input(INPUT_POST,"q");
      $a=filter_input(INPUT_POST,"a");
      $stmt=$this->pdo->prepare("INSERT INTO word(q,a) VALUES(:q,:a)");
      $stmt->bindValue("q",$q,\PDO::PARAM_STR);
      $stmt->bindValue("a",$a,\PDO::PARAM_STR);
      $stmt->execute();
    }catch(PDOException $e){
      echo "例外:",$e->getMessage();
    }
  }
  public function getWord(){
    $stmt=$this->pdo->query("SELECT * FROM word");
    $i=0;
    $list=$stmt->fetchAll();
    $newList=[];
    foreach($list as $li){
      $newList[$i]=array(
        "id"=>h::s($li["id"]),
        "q"=>h::s($li["q"]),
        "a"=>h::s($li["a"])
      );
      $i++;
    }
    return $newList;
  }
}
?>