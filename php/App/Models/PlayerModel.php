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
        // var_dump($galaxy);
        // die();
        $result = false;
        $galaxyNumber = (int) $galaxy;
        $testEmptyGalaxy = null;
        if ($galaxy == "0" || !empty($galaxy)) {
            $testEmptyGalaxy = 'not null';
        }
        // var_dump($galaxy);
        // var_dump(!empty($galaxy));
        // die();
        $rqt = "UPDATE player set place = :place, galaxy = :galaxy WHERE id = 1";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':place', $place);

            $statement->bindParam(':galaxy', $galaxyNumber);

            if (!empty($testEmptyGalaxy)) {
                // print_r('test');
                // die();
                //On l'execute
                $result = $statement->execute();
            }
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }
        // var_dump($result);
        // die();
        if ($result) {
            return [
                'status' => '200',
                'data' => 'Emplacement sauvegardé'
            ];
        } else {
            return [
                'status' => '201',
                'data' => 'Emplacement non sauvegardé car galaxie non spécifiée'
            ];
        }
    }

    public static function updateDataEnemy($data, $type)
    {
        $rqt = "UPDATE player SET " . $type . " = :data WHERE id = 1";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':data', $data);

            //On l'execute
            $result = $statement->execute();
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }
        // var_dump($result);
        // die();
        if ($result) {
            return [
                'status' => '200',
                'data' => 'Donnée sauvegardée'
            ];
        } else {
            return [
                'status' => '201',
                'data' => 'Donnée non sauvegardée'
            ];
        }
    }

    public static function fetchEnemyInfos()
    {
        $rqt = "SELECT * FROM player WHERE id = 1";
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

    public static function setNotFight()
    {
        $rqt = "UPDATE player SET has_fight = 0 WHERE id = 1";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            // $statement->bindParam(':id', $id);
            //On l'execute
            $result = $statement->execute();
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }
        // var_dump($result);
        // die();
        if ($result) {
            return [
                'status' => '200',
                'data' => $result
            ];
        }
    }

    public static function setFight()
    {
        $rqt = "UPDATE player SET has_fight = 1 WHERE id = 1";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            // $statement->bindParam(':id', $id);
            //On l'execute
            $result = $statement->execute();
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }
        // var_dump($result);
        // die();
        if ($result) {
            return [
                'status' => '200',
                'data' => $result
            ];
        }
    }
}
