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
            if ($galaxy !== 0) {
                $player = 0;
            } else {
                $player = 1;
            }
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
            $statement->execute();
            // $result = $statement->fetch(\PDO::FETCH_ASSOC);
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }
        // var_dump($result);
        // die();
        return [
            'status' => '200',
            'data' => 'Niveau augmenté'
        ];
    }

    public static function updateLevelPlanet($type, $planet)
    {
        $levels = self::fetchLevelsPlanet($planet);

        $levelType = $levels['data'][$type];
        // print_r($levelType);
        // die();
        $levelType++;
        $rqt = "UPDATE crystal_planets_levels SET " . $type . " = :type WHERE player_id = 1 AND planet = :planet";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':type', $levelType);
            $statement->bindParam(':planet', $planet);
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
            'data' => 'Niveau augmenté'
        ];
    }

    public static function fetchCrystalLevels($planet)
    {
        // print_r($levelType);
        // die();
        $rqt = "SELECT crystal_level, crystal_stockage_level FROM crystal_planets_levels WHERE player_id = 1 AND planet = :planet";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':planet', $planet);
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
