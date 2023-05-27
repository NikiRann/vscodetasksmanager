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

// Получаване на командата от POST заявката
if ($_POST) {
    $command = $_POST['command'];
}else{
    $command='error';
}

// Вмъкнете командата в базата данни
$sql = "INSERT INTO command_history (command) VALUES (:command)";
$stmt = $connection->prepare($sql);
$stmt->bindParam(':command', $command);
$stmt->execute();

// Изпълнение на командата и получаване на резултата
$output = shell_exec($command);

// Извеждане на резултата
echo $output;
?>