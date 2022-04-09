<?php

namespace App\Models;

include_once('MySQL.php');

class GalaxyModel extends MySQL
{
    public static function getGalaxyName($galaxy)
    {
        $rqt = "SELECT name FROM galaxies WHERE galaxy_number = :galaxy";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':galaxy', $galaxy);
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
