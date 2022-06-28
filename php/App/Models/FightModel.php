<?php

namespace App\Models;

include_once('MySQL.php');

class FightModel extends MySQL
{
    public static function eraseResults()
    {
        $rqt = "TRUNCATE TABLE fight";
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

    public static function saveRound($round)
    {
        $rqt = "INSERT INTO fight (player_id, round, life_points_starship, life_points_enemy, strength_starship, strength_enemy)
VALUES (1, :round, :life_points_starship, :life_points_enemy, :strength_starship, :strength_enemy)";


        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':round', $round['round']);
            $statement->bindParam(':life_points_starship', $round['life_points_starship']);
            $statement->bindParam(':life_points_enemy', $round['life_points_enemy']);
            $statement->bindParam(':strength_starship', $round['strength_starship']);
            $statement->bindParam(':strength_enemy', $round['strength_enemy']);
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

    public static function saveWinner($winner)
    {
        // on récupère l'id du dernier tour
        $rqt = "SELECT MAX(id) as id FROM fight";
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            // $statement->bindParam(':id', $id);
            //On l'execute
            $statement->execute();
            $result = $statement->fetch(\PDO::FETCH_ASSOC);
        } catch (\Exception $exception) {
            echo $exception->getMessage();
        }

        $rqt = "UPDATE fight SET winner = :winner WHERE id = :id";


        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':winner', $winner);
            $statement->bindParam(':id', $result['id']);
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

    public static function getResults()
    {
        // on récupère l'id du dernier tour
        $rqt = "SELECT * FROM fight";
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            // $statement->bindParam(':id', $id);
            //On l'execute
            $statement->execute();
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
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
