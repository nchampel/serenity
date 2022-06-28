<?php

namespace App\Functions;

use App\Models\EquipmentModel;
use App\Models\PlayerModel;
use App\Models\LevelsModel;

include_once('../Models/LevelsModel.php');
include_once('../Models/EquipmentModel.php');
include_once('../Models/PlayerModel.php');

// include_once('MySQL.php');

class Functions
{
    public static function getEnemyInfos()
    {
        // on récupère les niveaux du vaisseau
        $LevelModel = new LevelsModel();
        $levelInfosDB = $LevelModel::fetchLevelsStarship();
        $levelWeapon = $levelInfosDB['data']['weapon_level'];
        $levelLifePoints = $levelInfosDB['data']['life_points_level'];

        $equipmentModel = new EquipmentModel();
        $quantityWeaponDB = $equipmentModel::fetchEquipment($levelWeapon, "weapon_power");
        $quantityWeapon = $quantityWeaponDB['data']['quantity'];
        $quantityLifePointsDB = $equipmentModel::fetchEquipment($levelLifePoints, "life_points");
        $quantityLifePoints = $quantityLifePointsDB['data']['quantity'];

        // on récupère les niveaux PNJ (NPC)

        $playerModel = new PlayerModel();
        $dataEnemy = $playerModel::fetchEnemyInfos();

        $aleaWeapon = $dataEnemy['data']['weapon_level_NPC'];
        $aleaLifePoints = $dataEnemy['data']['life_points_level_NPC'];
        $crystal = $dataEnemy['data']['crystal_NPC'];

        switch ($aleaWeapon) {
            case 0:
                $quantityWeaponEnemy = 0.9 * $quantityWeapon;
                break;
            case 1:
            case 2:
                $quantityWeaponEnemy = $quantityWeapon;
                break;
            case 3:
                $quantityWeaponEnemy = 1.1 * $quantityWeapon;
                break;
        }
        switch ($aleaLifePoints) {
            case 0:
                $quantityLifePointsEnemy = 0.9 * $quantityLifePoints;
                break;
            case 1:
            case 2:
                $quantityLifePointsEnemy = $quantityLifePoints;
                break;
            case 3:
                $quantityLifePointsEnemy = 1.1 * $quantityLifePoints;
                break;
        }
        return [
            'quantityWeaponEnemy' => $quantityWeaponEnemy, 'quantityLifePointsEnemy' => $quantityLifePointsEnemy, 'quantityWeaponDB' => $quantityWeaponDB,
            'quantityLifePointsDB' => $quantityLifePointsDB, 'crystal' => $crystal
        ];
    }
}
