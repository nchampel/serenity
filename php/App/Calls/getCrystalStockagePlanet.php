<?php

namespace App\Calls;

use App\Models\PlanetsModel;
use App\Models\ResourcesModel;

include_once('../Models/ResourcesModel.php');
include_once('../Models/PlanetsModel.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

// var_dump($_POST);

// $request = $_POST['energy'];
// $test = file_get_contents("http://");
// echo $test;
// $Data = json_decode($request->body(), true);
$planet = filter_var($_POST['planet'], FILTER_SANITIZE_STRING);
$galaxy = filter_var($_POST['galaxy'], FILTER_SANITIZE_STRING);
try {
    $ResourceModel = new ResourcesModel();
    $fetchStockage = $ResourceModel::fetchCrystalPlanet($planet, $galaxy);
    $level = $fetchStockage['data']['crystal_stockage_level'];
    $PlanetModel = new PlanetsModel();
    $stockage = $PlanetModel::fetchInfos($level, 'crystal_stockage');
    // $stockage = $stockageDB['data']['quantity'];

    if ($stockage['status']) {
        $Response['status'] = 200;
        $Response['data'] = $stockage['data'];
        $Response['message'] = 'Stockage du cristal récupéré avec succès.';
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
