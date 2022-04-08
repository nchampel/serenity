<?php

namespace App\Calls;

use App\Models\LevelsModel;
use App\Models\PlanetsModel;
use App\Models\ResourcesModel;

include_once('../Models/LevelsModel.php');
include_once('../Models/ResourcesModel.php');
include_once('../Models/PlanetsModel.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

// var_dump($_POST);

// $request = $_POST['type'];
// $test = file_get_contents("http://");
// echo $test;
// $Data = json_decode($request->body(), true);
// $energy = filter_var($Data['energy'], FILTER_SANITIZE_STRING);
$type = filter_var($_POST['type'], FILTER_SANITIZE_STRING);
$planet = filter_var($_POST['planet'], FILTER_SANITIZE_STRING);
try {
    $isEnoughCrystal = false;
    switch ($type) {
        case 'crystal_level':
            $planetType = 'crystal_generation';
            break;
        case 'crystal_stockage_level':
            $planetType = 'crystal_stockage';
            break;
    }
    // on récupère le crystal sur la planète
    $ResourceModel = new ResourcesModel();
    $planetCrystalDB = $ResourceModel::fetchCrystalPlanet($planet);
    $planetCrystal = $planetCrystalDB['data']['crystal'];
    // on détermine le cristal nécessaire pour le niveau suivant
    $LevelModel = new LevelsModel();
    $levelCrystalDB = $LevelModel::fetchLevelsPlanet($planet);
    $levelCrystal = $levelCrystalDB['data'][$type];
    $planetModel = new PlanetsModel();
    $crystalNeededDB = $planetModel::fetchInfos($levelCrystal, $planetType);
    $crystalNeeded = $crystalNeededDB['data']['crystal'];
    if ($planetCrystal >= $crystalNeeded) {
        // la fonction ajoute un niveau et met à jour le champ
        $updatedLevel = $LevelModel::updateLevelPlanet($type, $planet);
        // on met à jour le cristal sur la planète
        $crystal = $planetCrystal - $crystalNeeded;
        $data = $ResourceModel::updateCrystalPlanet($crystal, $planet);
        // print_r($data);
        // die();
        $isEnoughCrystal = true;
    }


    if (isset($updatedLevel) && $updatedLevel['status'] && $isEnoughCrystal) {
        $Response['status'] = 200;
        $Response['data'] = $updatedLevel['data'];
        $Response['message'] = 'Niveau mis à jour avec succès.';
        echo (json_encode($Response));
        // $response->code(200)->json($Response);

        // return    /*$Response*/;
    } else if (!$isEnoughCrystal) {
        $Response['status'] = 201;
        $Response['data'] = 'Pas assez de cristal';
        $Response['message'] = 'Pas assez de cristal sur la planète pour augmenter le niveau.';
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
