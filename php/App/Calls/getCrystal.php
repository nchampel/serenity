<?php

namespace App\Calls;

use App\Models\ResourcesModel;

include_once('../Models/ResourcesModel.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

// var_dump($_POST);

// $request = $_POST['energy'];
// $test = file_get_contents("http://");
// echo $test;
// $Data = json_decode($request->body(), true);
$planet = filter_var($_POST['planet'], FILTER_SANITIZE_STRING);
// $energy = filter_var($_POST['energy'], FILTER_SANITIZE_STRING);
try {
    $ResourceModel = new ResourcesModel();
    $fetchCrystal = $ResourceModel::fetchCrystalPlanet($planet);

    if ($fetchCrystal['status']) {
        $Response['status'] = 200;
        $Response['data'] = $fetchCrystal['data'];
        $Response['message'] = 'Cristal récupéré avec succès.';
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
