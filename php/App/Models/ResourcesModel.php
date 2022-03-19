<?php

namespace App\Models;

include_once('MySQL.php');

class ResourcesModel extends MySQL
{
    public static function fetchEnergy()
    {
        $rqt = "SELECT energy FROM resources";
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
    public static function updateEnergy($energy)
    {
        $rqt = "UPDATE resources SET energy = :energy ";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':energy', $energy);
            //On l'execute
            $statement->execute();
            // $result = $statement->fetch(\PDO::FETCH_ASSOC);
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }
        // var_dump($result);
        // die();
        return [
            'status' => '200',
            'data' => 'Yahoo !'
        ];
    }

    public static function incrementEnergy()
    {
        $energyDB = self::fetchEnergy();
        $energy = $energyDB['data']['energy'];
        $updatedEnergy = (int) $energy + 100;
        // var_dump((int) $updatedEnergy);
        // die();
        return self::updateEnergy($updatedEnergy);
    }
}
