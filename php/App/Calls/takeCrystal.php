<?php

namespace App\Calls;

use App\Models\EquipmentModel;
use App\Models\LevelsModel;
use App\Models\ResourcesModel;

include_once('../Models/ResourcesModel.php');
include_once('../Models/EquipmentModel.php');
include_once('../Models/LevelsModel.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

// var_dump($_POST);

// $request = $_POST['energy'];
// $test = file_get_contents("http://");
// echo $test;
// $Data = json_decode($request->body(), true);
$place = filter_var($_POST['place'], FILTER_SANITIZE_STRING);
// $energy = filter_var($_POST['energy'], FILTER_SANITIZE_STRING);
try {
    $isTransferExecuted = false;
    // on récupère le cristal de la planète
    $ResourceModel = new ResourcesModel();
    $fetchCrystalDB = $ResourceModel::fetchCrystalPlanet($place);
    $crystal = $fetchCrystalDB['data']['crystal'];
    // on récupère le cristal du vaisseau
    $fetchCrystalStarshipDB = $ResourceModel::fetchCrystalStarship();
    $crystalStarship = $fetchCrystalStarshipDB['data']['crystal'];
    $updatedCrystal = $crystal + $crystalStarship;
    // on récupère la limite de stockage de cristal du vaisseau
    $levelModel = new LevelsModel();
    $levelDB = $levelModel::fetchLevels();
    $level = $levelDB['data']['crystal_capacity_level'];
    $EquipmentModel = new EquipmentModel();
    $limitCrystalData = $EquipmentModel::fetchEquipment($level, 'crystal_capacity');
    $limit = $limitCrystalData['data']['quantity'];
    if ($updatedCrystal <= $limit) {
        // sauvegarder le cristal dans le vaisseau
        $updateStarship = $ResourceModel::updateCrystalStarship($updatedCrystal);
        // mettre le stock de cristal à zéro sur la planète
        $updatePlanet = $ResourceModel::updateCrystal(0, $place);
        $isTransferExecuted = true;
    }
    // print_r($updateStarship);
    // print_r($updatePlanet);
    // print_r($isTransferExecuted);
    // die();

    if (isset($updateStarship) && isset($updatePlanet) && $updateStarship['status'] && $updatePlanet['status'] && $place != 'terre' && $isTransferExecuted) {
        $Response['status'] = 200;
        $Response['data'] = $crystal;
        $Response['message'] = 'Cristal ajouté dans la soute avec succès.';
        echo (json_encode($Response));
        // $response->code(200)->json($Response);

        // return /*$Response*/;
    } else if ($place != 'terre' && !$isTransferExecuted) {
        $Response['status'] = 201;
        $Response['data'] = 'plein';
        $Response['message'] = 'Pas assez de place dans le vaisseau.';
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
