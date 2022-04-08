<?php

namespace App\Calls;

use App\Models\LevelsModel;
use App\Models\PlanetsModel;

include_once('../Models/LevelsModel.php');
include_once('../Models/PlanetsModel.php');

// include_once('../Models/EquipmentModel.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

// var_dump($_POST);

// $request = $_POST['level'];
// $request = $_POST['type'];
// $test = file_get_contents("http://");
// echo $test;
// $Data = json_decode($request->body(), true);
// $energy = filter_var($Data['energy'], FILTER_SANITIZE_STRING);
$planet = filter_var($_POST['planet'], FILTER_SANITIZE_STRING);
$type = filter_var($_POST['type'], FILTER_SANITIZE_STRING);
try {
    switch ($type) {

        case 'crystal_generation':
            $planetType = 'crystal_level';
            break;
        case 'crystal_stockage':
            $planetType = 'crystal_stockage_level';
            break;
    }
    $levelsModel = new LevelsModel();
    $fetchLevels = $levelsModel::fetchLevelsPlanet($planet);
    $level = $fetchLevels['data'][$planetType];
    $PlanetModel = new PlanetsModel();
    $infos = $PlanetModel::fetchInfos($level + 1, $type);
    // var_dump($infos);
    // die();

    if ($infos['status']) {
        $Response['status'] = 200;
        $Response['data'] = $infos['data'];
        $Response['message'] = 'Infos du niveau suivant récupérées avec succès.';
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
