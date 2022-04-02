<?php

namespace App\CronTasks;

use App\Models\LevelsModel;
use App\Models\ResourcesModel;

include_once('../Models/LevelsModel.php');
include_once('../Models/ResourcesModel.php');

header('Access-Control-Allow-Origin: *');

$planets = ['mars', 'jupiter', 'saturne', 'uranus', 'neptune'];

foreach ($planets as $planet) {
    try {
        $LevelsModel = new LevelsModel();
        $infos = $LevelsModel::fetchCrystalLevels($planet);
        $level = $infos['data']['crystal_level'];
        $levelStockage = $infos['data']['crystal_stockage_level'];

        $ResourceModel = new ResourcesModel();
        $stockageDB = $ResourceModel::fetchStockageCrystalPlanet($levelStockage);
        $stockage = $stockageDB['data']['crystal_stockage'];
        $quantityDB = $ResourceModel::fetchGenerationCrystalPlanet($level);
        $quantity = $quantityDB['data']['crystal_generation'];
        $incrementCrystal = $ResourceModel::incrementCrystal($quantity, $stockage, $planet);

        // var_dump($incrementCrystal['status']);
        // echo (' test');

        if ($incrementCrystal['status']) {
            $Response['status'] = 200;
            // $Response['data'] = $fetchEnergy['data'];
            $Response['message'] = 'Cristal incrémenté avec succès.';
            echo (json_encode($Response));
            // $response->code(200)->json($Response);

            // return /*$Response*/;
        } else if ($incrementCrystal['status'] == 201) {
            $Response['status'] = 200;
            $Response['message'] = 'Stock de cristal au maximum';

            // $response->code(400)->json($Response);
            echo (json_encode($Response));
            // return;
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
}
