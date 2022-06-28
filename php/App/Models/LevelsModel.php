<?php

namespace App\Models;

include_once('MySQL.php');

class LevelsModel extends MySQL
{
    public static function fetchLevelsStarship()
    {
        $rqt = "SELECT energy_regeneration_level, energy_capacity_level, crystal_capacity_level, weapon_level, life_points_level FROM equipment_levels WHERE player_id = 1";
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

    public static function fetchLevelsPlanet($planet, $galaxy)
    {
        $rqt = "SELECT crystal_level, crystal_stockage_level FROM crystal_planets_levels WHERE player_id = :player AND planet = :planet";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            if ($galaxy !== "0") {
                $player = 0;
            } else {
                $player = 1;
            }
            // echo $player;
            // die();
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':planet', $planet);

            $statement->bindParam(':player', $player);
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

    public static function updateLevelStarship($type)
    {
        $levels = self::fetchLevelsStarship();

        $levelType = $levels['data'][$type];
        // print_r($levelType);
        // die();
        $levelType++;
        $rqt = "UPDATE equipment_levels SET " . $type . " = :type WHERE player_id = 1";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':type', $levelType);
            //On l'execute
            $result = $statement->execute();
            // $result = $statement->fetch(\PDO::FETCH_ASSOC);
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }
        // var_dump($result);
        // die();
        if ($result) {
            return [
                'status' => '200',
                'data' => 'Niveau augmenté'
            ];
        } else {
            return [
                'status' => '201',
                'data' => 'Niveau non augmenté'
            ];
        }
    }

    public static function updateLevelStarshipDestroyed($type)
    {

        $rqt = "UPDATE equipment_levels SET " . $type . " = 1 WHERE player_id = 1";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            //On l'execute
            $result = $statement->execute();
            // $result = $statement->fetch(\PDO::FETCH_ASSOC);
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }
        // var_dump($result);
        // die();
        if ($result) {
            return [
                'status' => '200',
                'data' => 'Niveau augmenté'
            ];
        } else {
            return [
                'status' => '201',
                'data' => 'Niveau non augmenté'
            ];
        }
    }

    public static function updateLevelPlanet($type, $planet)
    {
        $levels = self::fetchLevelsPlanet($planet, "0");

        $levelType = $levels['data'][$type];
        // var_dump($levels);
        // die();
        // die();
        $levelType++;
        $rqt = "UPDATE crystal_planets_levels SET " . $type . " = :type WHERE player_id = 1 AND planet = :planet AND galaxy = 0";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':type', $levelType);
            $statement->bindParam(':planet', $planet);
            //On l'execute
            $result = $statement->execute();
            // $result = $statement->fetch(\PDO::FETCH_ASSOC);
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }
        // var_dump($result);
        // die();
        if ($result) {
            return [
                'status' => '200',
                'data' => 'Niveau augmenté'
            ];
        } else {
            return [
                'status' => '201',
                'data' => 'Niveau non augmenté'
            ];
        }
    }

    public static function fetchCrystalLevels($planet, $galaxy)
    {
        // print_r($levelType);
        // die();
        if ($galaxy !== "0") {
            $player = 0;
        } else {
            $player = 1;
        }
        $rqt = "SELECT crystal_level, crystal_stockage_level FROM crystal_planets_levels WHERE player_id = :player AND planet = :planet AND galaxy = :galaxy";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':planet', $planet);
            $statement->bindParam(':galaxy', $galaxy);
            $statement->bindParam(':player', $player);
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
