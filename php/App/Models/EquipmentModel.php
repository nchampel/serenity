<?php

namespace App\Models;

include_once('MySQL.php');

class EquipmentModel extends MySQL
{
    public static function fetchEquipment($level, $type)
    {
        $rqt = "SELECT quantity FROM equipment WHERE type = :type AND level = :level";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':type', $type);
            $statement->bindParam(':level', $level);
            //On l'execute
            $statement->execute();
            $result = $statement->fetch(\PDO::FETCH_ASSOC);
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }
        // var_dump($result);
        // die();
        return [
            'status' => '200',
            'data' => $result
        ];
    }
}
