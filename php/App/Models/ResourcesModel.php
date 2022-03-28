<?php

namespace App\Models;

include_once('MySQL.php');
include_once('LevelsModel.php');
include_once('EquipmentModel.php');

class ResourcesModel extends MySQL
{
    public static function fetchEnergy()
    {
        $rqt = "SELECT energy FROM resources WHERE player_id = 1";
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
        $rqt = "UPDATE resources SET energy = :energy WHERE player_id = 1";
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
        $levelModel = new LevelsModel();
        $levels = $levelModel::fetchLevels();
        $levelEnergyRegeneration = $levels['data']['energy_regeneration_level'];
        $levelEnergyCapacity = $levels['data']['energy_capacity_level'];
        $EquipmentModel = new EquipmentModel();
        $limitEnergyData = $EquipmentModel::fetchEquipment($levelEnergyCapacity, 'energy_capacity');
        $limitEnergy = $limitEnergyData['data']['quantity'];
        $regenerationEnergyData = $EquipmentModel::fetchEquipment($levelEnergyRegeneration, 'energy_regeneration');
        $regenerationEnergy = $regenerationEnergyData['data']['quantity'];
        // var_dump($limitEnergy);
        // die();
        if ($energy < $limitEnergy) {
            $updatedEnergy = (int) $energy + (int) $regenerationEnergy;
            if ($updatedEnergy > $limitEnergy) {
                $updatedEnergy = $limitEnergy;
            }
            // var_dump((int) $updatedEnergy);
            // die();
            return self::updateEnergy($updatedEnergy);
        } else {
            return [
                'status' => '201'
            ];
        }
    }
}
