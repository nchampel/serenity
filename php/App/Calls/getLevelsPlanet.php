<?php

namespace App\Calls;

use App\Models\LevelsModel;
use App\Models\ResourcesModel;

include_once('../Models/LevelsModel.php');
include_once('../Models/ResourcesModel.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

$planet = filter_var($_POST['planet'], FILTER_SANITIZE_STRING);

try {
    $levelsModel = new LevelsModel();
    $fetchLevels = $levelsModel::fetchLevelsPlanet($planet);


    if ($fetchLevels['status']) {
        $Response['status'] = 200;
        $Response['data'] = $fetchLevels['data'];
        $Response['message'] = 'Niveaux récupérés avec succès.';
        echo (json_encode($Response));
        // $response->code(200)->json($Response);

        // return /*$Response*/;
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
