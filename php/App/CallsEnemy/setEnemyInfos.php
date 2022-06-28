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

    $aleaWeapon = rand(0, 3);
    $aleaLifePoints = rand(0, 3);
    $aleaCrystal = rand(1, 100);

    if ($aleaCrystal == 1) {
        $crystal = 10000;
    } else if ($aleaCrystal > 1 && $aleaCrystal <= 25) {
        $crystal = 25000;
    } else if ($aleaCrystal > 25 && $aleaCrystal <= 50) {
        $crystal = 50000;
    } else if ($aleaCrystal > 50 && $aleaCrystal <= 75) {
        $crystal = 75000;
    } else if ($aleaCrystal > 75 && $aleaCrystal <= 99) {
        $crystal = 100000;
    } else if ($aleaCrystal == 100) {
        $crystal = 1000000;
    }

    $playerModel = new PlayerModel();
    $updateWeapon = $playerModel::updateDataEnemy($aleaWeapon, "weapon_level_NPC");
    $updateLifePoints = $playerModel::updateDataEnemy($aleaLifePoints, "life_points_level_NPC");
    $updateCrystal = $playerModel::updateDataEnemy($crystal, "crystal_NPC");

    if ($updateWeapon['status'] && $updateLifePoints['status'] && $updateCrystal['status']) {
        $Response['status'] = 200;
        $Response['data'] = ['data' => ['life_points_level' => $aleaLifePoints, 'power_level' => $aleaWeapon]];
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
