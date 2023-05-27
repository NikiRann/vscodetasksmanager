<?php
class Db
{
    private $connection;

    public function __construct()
    {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "tasks";

        $this->connection = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password,
            [
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
    }

    public function getConnection()
    {
        return $this->connection;
    }
}

$db = new Db();
$connection = $db->getConnection();

// Извличане на всички команди от базата данни
$sql = "SELECT command FROM command_history";
$stmt = $connection->prepare($sql);
$stmt->execute();

// Вземане на всички команди като масив от асоциативни масиви
$commands = $stmt->fetchAll(PDO::FETCH_COLUMN);

// Връщане на командите във формат JSON
echo json_encode($commands);
?>