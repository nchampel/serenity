<?php

namespace App\Calls;

use App\Models\LevelsModel;
use App\Models\PlanetsModel;
use App\Models\ResourcesModel;
use App\Models\EquipmentModel;
use App\Models\PlayerModel;

include_once('../Models/LevelsModel.php');
include_once('../Models/EquipmentModel.php');
include_once('../Models/PlayerModel.php');
// include_once('../Models/ResourcesModel.php');
// include_once('../Models/PlanetsModel.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

// var_dump($_POST);

// $request = $_POST['type'];
// $test = file_get_contents("http://");
// echo $test;
// $Data = json_decode($request->body(), true);
// $energy = filter_var($Data['energy'], FILTER_SANITIZE_STRING);
// $type = filter_var($_POST['type'], FILTER_SANITIZE_STRING);
// $planet = filter_var($_POST['planet'], FILTER_SANITIZE_STRING);
try {

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

    if ($quantityWeaponDB['status'] && $quantityLifePointsDB['status']) {
        $Response['status'] = 200;
        $Response['data'] = ['data' => ['life_points' => $quantityLifePointsEnemy, 'power' => $quantityWeaponEnemy]];
        $Response['message'] = 'Infos du vaisseau récupérées avec succès.';
        echo (json_encode($Response));
        // $response->code(200)->json($Response);

        // return    /*$Response*/;

    } else {
        $Response['status'] = 400;
        $Response['data'] = [];
        $Response['message'] = 'Une erreur inattendue s\'est produite. Veuillez réessayer.';

        // $response->code(400)->json($Response);
        echo (json_encode($Response));
        // return;
    }
} catch (\Exception $e) {
    $Response['status'] = 500;
    $Response['message'] = $e->getMessage();
    $Response['data'] = [];

    // $response->code(500)->json($Response);
    echo (json_encode($Response));
    // return;
}
