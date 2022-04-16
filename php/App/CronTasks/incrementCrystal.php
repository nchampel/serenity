<?php

namespace App\CronTasks;

use App\Models\LevelsModel;
use App\Models\PlanetsModel;
use App\Models\ResourcesModel;

include_once('../Models/LevelsModel.php');
include_once('../Models/ResourcesModel.php');
include_once('../Models/PlanetsModel.php');

header('Access-Control-Allow-Origin: *');

$planets = ['mars', 'jupiter', 'saturne', 'uranus', 'neptune'];

foreach ($planets as $planet) {
    try {
        $LevelsModel = new LevelsModel();
        $infos = $LevelsModel::fetchCrystalLevels($planet, "0");
        $level = $infos['data']['crystal_level'];
        $levelStockage = $infos['data']['crystal_stockage_level'];
        // var_dump($levelStockage);
        // die();

        $ResourceModel = new ResourcesModel();
        // $stockageDB = $ResourceModel::fetchStockageCrystalPlanet($levelStockage);
        // $stockage = $stockageDB['data']['crystal_stockage'];
        // $quantityDB = $ResourceModel::fetchGenerationCrystalPlanet($level);
        // $quantity = $quantityDB['data']['crystal_generation'];
        $PlanetsModel = new PlanetsModel();
        $stockageDB = $PlanetsModel::fetchInfos($levelStockage, 'crystal_stockage');
        $stockage = $stockageDB['data']['quantity'];
        $quantityDB = $PlanetsModel::fetchInfos($level, 'crystal_generation');
        $quantity = $quantityDB['data']['quantity'];
        $incrementCrystal = $ResourceModel::incrementCrystal($quantity, $stockage, $planet, "0");
        // var_dump($incrementCrystal);
        // die();
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

// incrémentation des autres planètes des galaxies

$galaxies = ["1"];
foreach ($galaxies as $galaxy) {
    for ($planet = 1; $planet <= 500; $planet++) {
        try {
            $LevelsModel = new LevelsModel();
            $infos = $LevelsModel::fetchCrystalLevels($planet, $galaxy);
            $level = $infos['data']['crystal_level'];
            $levelStockage = $infos['data']['crystal_stockage_level'];
            // var_dump($levelStockage);
            // die();

            $ResourceModel = new ResourcesModel();
            // $stockageDB = $ResourceModel::fetchStockageCrystalPlanet($levelStockage);
            // $stockage = $stockageDB['data']['crystal_stockage'];
            // $quantityDB = $ResourceModel::fetchGenerationCrystalPlanet($level);
            // $quantity = $quantityDB['data']['crystal_generation'];
            $PlanetsModel = new PlanetsModel();
            $stockageDB = $PlanetsModel::fetchInfos($levelStockage, 'crystal_stockage');
            $stockage = $stockageDB['data']['quantity'];
            $quantityDB = $PlanetsModel::fetchInfos($level, 'crystal_generation');
            $quantity = $quantityDB['data']['quantity'];
            $incrementCrystal = $ResourceModel::incrementCrystal($quantity, $stockage, $planet, $galaxy);
            // var_dump($incrementCrystal);
            // die();
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
}
