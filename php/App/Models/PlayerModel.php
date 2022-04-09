<?php

namespace App\Models;

include_once('MySQL.php');

class PlayerModel extends MySQL
{
    public static function fetchPlace()
    {
        $rqt = "SELECT place, galaxy FROM player WHERE id = 1";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            // $statement->bindParam(':id', $id);
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

    public static function savePosition($place, $galaxy)
    {
        // var_dump(empty($galaxy));
        // die();
        $rqt = "UPDATE player set place = :place, galaxy = :galaxy WHERE id = 1";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':place', $place);

            $statement->bindParam(':galaxy', $galaxy);

            if (!empty($galaxy)) {
                //On l'execute
                $statement->execute();
            }
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }
        // var_dump($result);
        // die();
        return [
            'status' => '200',
            'data' => 'Emplacement sauvegardé'
        ];
    }
}
