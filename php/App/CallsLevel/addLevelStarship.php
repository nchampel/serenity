<?php

namespace App\Calls;

use App\Models\EquipmentModel;
use App\Models\LevelsModel;
use App\Models\ResourcesModel;

include_once('../Models/LevelsModel.php');
include_once('../Models/ResourcesModel.php');

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
$place = filter_var($_POST['place'], FILTER_SANITIZE_STRING);
try {
    $isEnoughCrystal = false;
    if ($place == 'terre') {
        switch ($type) {
            case 'energy_regeneration_level':
                $equipmentType = 'energy_regeneration';
                break;
            case 'energy_capacity_level':
                $equipmentType = 'energy_capacity';
                break;
            case 'weapon_level':
                $equipmentType = 'weapon_power';
                break;
        }
        // on récupère le cristal sur Terre
        $ResourceModel = new ResourcesModel();
        $crystalOnPlanetDB = $ResourceModel::fetchCrystalPlanet($place);
        $crystalOnPlanet = $crystalOnPlanetDB['data']['crystal'];
        // on récupère le cristal nécessaire
        $LevelModel = new LevelsModel();
        $levelCrystalDB = $LevelModel::fetchLevelsStarship();
        // print_r($levelCrystalDB);
        // die();
        $levelCrystal = $levelCrystalDB['data'][$type];
        $equipmentModel = new EquipmentModel();
        $crystalNeededDB = $equipmentModel::fetchEquipment($levelCrystal, $equipmentType);
        $crystalNeeded = $crystalNeededDB['data']['crystal'];
        if ($crystalOnPlanet >= $crystalNeeded) {
            // la fonction ajoute un niveau et met à jour le champ
            $updatedLevel = $LevelModel::updateLevelStarship($type);
            // on met à jour le cristal sur Terre
            $crystal = $crystalOnPlanet - $crystalNeeded;
            $data = $ResourceModel::updateCrystalPlanet($crystal, $place, "0");
            // print_r($data);
            // die();
            $isEnoughCrystal = true;
        }
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
        $Response['message'] = 'Pas assez de cristal sur Terre pour améliorer le vaisseau.';
        echo (json_encode($Response));
        // $response->code(200)->json($Response);

        // return    /*$Response*/;
    } else if ($place != 'terre') {
        $Response['status'] = 202;
        $Response['data'] = 'Pas sur Terre';
        $Response['message'] = 'Il faut être sur Terre pour pouvoir améliorer le vaisseau.';
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
