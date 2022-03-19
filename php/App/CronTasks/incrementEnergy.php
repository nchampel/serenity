<?php

namespace App\CronTasks;

use App\Models\ResourcesModel;

include_once('../Models/ResourcesModel.php');

header('Access-Control-Allow-Origin: *');

try {
    $ResourceModel = new ResourcesModel();
    $incrementEnergy = $ResourceModel::incrementEnergy();

    // var_dump($incrementEnergy['status']);
    // echo (' test');

    if ($incrementEnergy['status']) {
        $Response['status'] = 200;
        // $Response['data'] = $fetchEnergy['data'];
        $Response['message'] = 'Energie incrémentée avec succès.';
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
