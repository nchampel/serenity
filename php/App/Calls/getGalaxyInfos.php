<?php

namespace App\Calls;

use App\Models\GalaxyModel;

include_once('../Models/GalaxyModel.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

$galaxy = filter_var($_POST['galaxy'], FILTER_SANITIZE_STRING);

try {
    $galaxyModel = new GalaxyModel();
    $fetchName = $galaxyModel::getGalaxyInfos($galaxy);

    if ($fetchName['status']) {
        $Response['status'] = 200;
        $Response['data'] = $fetchName['data'];
        $Response['message'] = 'Nom de la galaxie récupéré avec succès.';
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
