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
                'data' => 'Yahoo !'
            ];
        } else {
            return [
                'status' => '201',
                'data' => 'Energie non mise à jour'
            ];
        }
    }

    public static function saveEnergyAfterTravel($travel)
    {
        $energyData = self::fetchEnergy();
        $energyTravelData = self::getEnergyTravel($travel);
        $energy = (int) $energyData['data']['energy'];
        $energyTravel = (int) $energyTravelData['data']['transport_energy'];
        if ($energy >= $energyTravel) {
            $updatedEnergy = $energy - $energyTravel;
            // var_dump($updatedEnergy);
            // die();
            $rqt = "UPDATE resources SET energy = :updatedEnergy WHERE player_id = 1";
            //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
            //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
            try {
                $statement = Parent::getInstance()->prepare($rqt);
                $statement->bindParam(':updatedEnergy', $updatedEnergy);
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
                    'data' => 'Energie de voyage utilisée'
                ];
            } else {
                return [
                    'status' => '201',
                    'data' => 'Energie de voyage non mise à jour'
                ];
            }
        }
    }

    public static function incrementEnergy()
    {
        $energyDB = self::fetchEnergy();
        $energy = $energyDB['data']['energy'];
        $levelModel = new LevelsModel();
        $levels = $levelModel::fetchLevelsStarship();
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

    public static function incrementCrystal($quantity, $limit, $planet, $galaxy)
    {
        $crystalDB = self::fetchCrystalPlanet($planet, $galaxy);
        $crystal = $crystalDB['data']['crystal'];
        // var_dump($crystal);
        // var_dump($quantity);
        // var_dump($limit);
        // var_dump($planet);
        // die();
        // $levelModel = new LevelsModel();
        // $levels = $levelModel::fetchLevelsStarship();
        // $levelEnergyRegeneration = $levels['data']['energy_regeneration_level'];
        // $levelEnergyCapacity = $levels['data']['energy_capacity_level'];
        // $EquipmentModel = new EquipmentModel();
        // $limitEnergyData = $EquipmentModel::fetchEquipment($levelEnergyCapacity, 'energy_capacity');
        // $limitEnergy = $limitEnergyData['data']['quantity'];
        // $regenerationEnergyData = $EquipmentModel::fetchEquipment($levelEnergyRegeneration, 'energy_regeneration');
        // $regenerationEnergy = $regenerationEnergyData['data']['quantity'];
        // var_dump($limitEnergy);
        // die();
        if ($crystal < $limit) {
            $updatedCrystal = (int) $crystal + (int) $quantity;
            if ($updatedCrystal > $limit) {
                $updatedCrystal = $limit;
            }
            // var_dump((int) $updatedEnergy);
            // die();
            return self::updateCrystalPlanet($updatedCrystal, $planet, $galaxy);
        } else {
            return [
                'status' => '201'
            ];
        }
    }

    public static function updateCrystalPlanet($crystal, $planet, $galaxy)
    {
        if ($galaxy !== "0") {
            $player = 0;
        } else {
            $player = 1;
        }
        // var_dump($crystal);
        // var_dump($galaxy);
        // var_dump($planet);
        // die();
        $rqt = "UPDATE crystal_planets_levels SET crystal = :crystal WHERE player_id = :player AND planet = :planet AND galaxy = :galaxy";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':crystal', $crystal);
            $statement->bindParam(':planet', $planet);
            $statement->bindParam(':galaxy', $galaxy);
            $statement->bindParam(':player', $player);
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
                'data' => 'Cristal mis à jour'
            ];
        } else {
            return [
                'status' => '201',
                'data' => 'Cristal non mis à jour'
            ];
        }
    }

    public static function updateCrystalStarship($crystal)
    {
        $rqt = "UPDATE resources SET crystal = :crystal WHERE player_id = 1";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':crystal', $crystal);
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
                'data' => 'Cristal mis à jour'
            ];
        } else {
            return [
                'status' => '201',
                'data' => 'Cristal non mis à jour'
            ];
        }
    }

    public static function getEnergyTravel($travel)
    {
        // var_dump($travel);
        // die();
        $rqt = "SELECT transport_energy FROM energy_travel_planets WHERE travel = :travel";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            $statement->bindParam(':travel', $travel);
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

    public static function fetchCrystalPlanet($planet, $galaxy = 0)
    {
        // var_dump($travel);
        // die();
        if ($galaxy == 0) {
            $player = 1;
        } else {
            $player = 0;
        }
        $rqt = "SELECT crystal, crystal_level, crystal_stockage_level, image FROM crystal_planets_levels WHERE planet = :planet AND galaxy =:galaxy AND player_id = :player";
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

    public static function fetchCrystalStarship()
    {
        // var_dump($travel);
        // die();
        $rqt = "SELECT crystal FROM resources WHERE player_id = 1";
        //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
        //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
        try {
            $statement = Parent::getInstance()->prepare($rqt);
            // $statement->bindParam(':planet', $planet);
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

    // public static function fetchGenerationCrystalPlanet($level)
    // {
    //     // var_dump($travel);
    //     // die();
    //     $rqt = "SELECT crystal_generation FROM crystal_informations WHERE level = :level";
    //     //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
    //     //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
    //     try {
    //         $statement = Parent::getInstance()->prepare($rqt);
    //         $statement->bindParam(':level', $level);
    //         //On l'execute
    //         $statement->execute();
    //         $result = $statement->fetch(\PDO::FETCH_ASSOC);
    //     } catch (\Exception $exception) {
    //         echo $exception->getMessage();
    //     }
    //     // var_dump($result);
    //     // die();
    //     return [
    //         'status' => '200',
    //         'data' => $result
    //     ];
    // }

    // public static function fetchStockageCrystalPlanet($level)
    // {
    //     // var_dump($travel);
    //     // die();
    //     $rqt = "SELECT crystal_stockage FROM crystal_informations WHERE level = :level";
    //     //$rqt = "insert into player (pseudo, town_food) values (:pseudo, '100')";
    //     //On prépare notre requête. ça nous renvoie un objet qui est notre requête préparée prête à être executée
    //     try {
    //         $statement = Parent::getInstance()->prepare($rqt);
    //         $statement->bindParam(':level', $level);
    //         //On l'execute
    //         $statement->execute();
    //         $result = $statement->fetch(\PDO::FETCH_ASSOC);
    //     } catch (\Exception $exception) {
    //         echo $exception->getMessage();
    //     }
    //     // var_dump($result);
    //     // die();
    //     return [
    //         'status' => '200',
    //         'data' => $result
    //     ];
    // }
}
