<?php

namespace App\Calls;

use App\Models\LevelsModel;

include_once('../Models/LevelsModel.php');

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
try {
    $LevelModel = new LevelsModel();
    // la fonction ajoute un niveau et met à jour le champ
    $updatedLevel = $LevelModel::updateLevelStarship($type);

    if ($updatedLevel['status']) {
        $Response['status'] = 200;
        $Response['data'] = $updatedLevel['data'];
        $Response['message'] = 'Niveau mis à jour avec succès.';
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
