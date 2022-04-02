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
// $place = filter_var($_POST['place'], FILTER_SANITIZE_STRING);
// $energy = filter_var($_POST['energy'], FILTER_SANITIZE_STRING);
try {
    // on récupère le cristal du vaisseau
    $ResourceModel = new ResourcesModel();
    $fetchCrystalStarshipDB = $ResourceModel::fetchCrystalStarship();
    $crystalStarship = $fetchCrystalStarshipDB['data']['crystal'];
    // on récupère le cristal de la Terre
    $ResourceModel = new ResourcesModel();
    $fetchCrystalDB = $ResourceModel::fetchCrystalPlanet('terre');
    $crystal = $fetchCrystalDB['data']['crystal'];
    $updatedCrystal = $crystal + $crystalStarship;
    // mettre le stock de cristal du vaisseau à 0
    $updateStarship = $ResourceModel::updateCrystalStarship(0);
    // sauvegarder le stock de cristal sur Terre
    $updatePlanet = $ResourceModel::updateCrystal($updatedCrystal, 'terre');

    // print_r($updateStarship);
    // print_r($updatePlanet);
    // print_r($isTransferExecuted);
    // die();

    if ($updateStarship['status'] && $updatePlanet['status']) {
        $Response['status'] = 200;
        $Response['data'] = $crystalStarship;
        $Response['message'] = 'Cristal transféré sur Terre avec succès.';
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
