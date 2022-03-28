<?php

namespace App\Calls;

use App\Models\PlayerModel;

include_once('../Models/PlayerModel.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

// $test = file_get_contents("http://");
// echo $test;
// $Data = json_decode($request->body(), true);
$place = filter_var($_POST['place'], FILTER_SANITIZE_STRING);
// print_r($place);
// die();
try {
    $PlayerModel = new PlayerModel();
    $savePlace = $PlayerModel::savePlace($place);

    if ($savePlace['status']) {
        $Response['status'] = 200;
        $Response['data'] = $savePlace['data'];
        $Response['message'] = 'Emplacement sauvegardé avec succès.';
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