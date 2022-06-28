<?php

namespace App\Calls;

use App\Models\PlanetsModel;
use App\Models\ResourcesModel;
use APP\Functions\Functions;
use App\Models\EquipmentModel;
use App\Models\PlayerModel;
use App\Models\LevelsModel;
use App\Models\FightModel;

include_once('../Models/LevelsModel.php');
include_once('../Models/EquipmentModel.php');
include_once('../Models/PlayerModel.php');
include_once('../Models/FightModel.php');
include_once('../Models/ResourcesModel.php');
include_once('../Models/PlanetsModel.php');
include_once('../Functions/Functions.php');

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");

// var_dump($_POST);

// $request = $_POST['type'];
// $test = file_get_contents("http://");
// echo $test;
// $Data = json_decode($request->body(), true);
// $energy = filter_var($Data['energy'], FILTER_SANITIZE_STRING);
// $type = filter_var($_POST['type'], FILTER_SANITIZE_STRING);
// $planet = filter_var($_POST['planet'], FILTER_SANITIZE_STRING);
try {

    // on récupère les infos de l'ennemi
    $function = new Functions();
    $getEnemyInfos = $function::getEnemyInfos();

    $quantityLifePointsEnemy = $getEnemyInfos['quantityLifePointsEnemy'];
    $quantityWeaponEnemy = $getEnemyInfos['quantityWeaponEnemy'];
    $quantityWeaponEnemyDB = $getEnemyInfos['quantityWeaponDB'];
    $quantityLifePointsEnemyDB = $getEnemyInfos['quantityLifePointsDB'];
    $crystal = $getEnemyInfos['crystal'];

    // on récupère les niveaux du vaisseau
    $LevelModel = new LevelsModel();
    $levelInfosDB = $LevelModel::fetchLevelsStarship();
    $levelWeapon = $levelInfosDB['data']['weapon_level'];
    $levelLifePoints = $levelInfosDB['data']['life_points_level'];

    $equipmentModel = new EquipmentModel();
    $quantityWeaponDB = $equipmentModel::fetchEquipment($levelWeapon, "weapon_power");
    $quantityWeapon = $quantityWeaponDB['data']['quantity'];
    $quantityLifePointsDB = $equipmentModel::fetchEquipment($levelLifePoints, "life_points");
    $quantityLifePoints = $quantityLifePointsDB['data']['quantity'];

    // combat entre les deux
    $rounds = [];
    $roundNb = 1;
    // on enlève les résultats du combat précédent
    $fightModel = new FightModel();
    $fightModel::eraseResults();
    while ($quantityLifePoints > 0 && $quantityLifePointsEnemy > 0) {
        $first = rand(0, 1);
        $aleaForMultiplierStarship = rand(1, 10);
        $aleaForMultiplierEnemy = rand(1, 10);
        switch ($aleaForMultiplierStarship) {
            case 1:
                $multiplierStarship = 0.5;
                break;
            case 2:
                $multiplierStarship = 0.8;
                break;
            case 3:
            case 4:
                $multiplierStarship = 0.9;
                break;
            case 5:
                $multiplierStarship = 1;
                break;
            case 6:
            case 7:
                $multiplierStarship = 1.1;
                break;
            case 8:
                $multiplierStarship = 1.2;
                break;
            case 9:
                $multiplierStarship = 1.3;
                break;
            case 10:
                $multiplierStarship = 1.5;
                break;
        }
        switch ($aleaForMultiplierEnemy) {
            case 1:
                $multiplierEnemy = 0.5;
                break;
            case 2:
                $multiplierEnemy = 0.8;
                break;
            case 3:
            case 4:
                $multiplierEnemy = 0.9;
                break;
            case 5:
                $multiplierEnemy = 1;
                break;
            case 6:
            case 7:
                $multiplierEnemy = 1.1;
                break;
            case 8:
                $multiplierEnemy = 1.2;
                break;
            case 9:
                $multiplierEnemy = 1.3;
                break;
            case 10:
                $multiplierEnemy = 1.5;
                break;
        }
        if ($first == 0) {
            if ($quantityLifePoints > 0) {
                $quantityLifePointsEnemy = $quantityLifePointsEnemy - $multiplierStarship * $quantityWeapon;
            }
            if ($quantityLifePointsEnemy > 0) {
                $quantityLifePoints = $quantityLifePoints - $multiplierEnemy * $quantityWeaponEnemy;
            }
        } else {
            if ($quantityLifePointsEnemy > 0) {
                $quantityLifePoints = $quantityLifePoints - $multiplierEnemy * $quantityWeaponEnemy;
            }
            if ($quantityLifePoints > 0) {
                $quantityLifePointsEnemy = $quantityLifePointsEnemy - $multiplierStarship * $quantityWeapon;
            }
        }
        if ($quantityLifePoints < 0) {
            $quantityLifePoints = 0;
        }
        if ($quantityLifePointsEnemy < 0) {
            $quantityLifePointsEnemy = 0;
        }

        $strengthStarship = (int) ($multiplierStarship * $quantityWeapon);
        $strengthEnemy = (int) ($multiplierEnemy * $quantityWeaponEnemy);

        $rounds[] = [
            'round' => $roundNb, 'life_points_starship' => (int) round($quantityLifePoints), 'life_points_enemy' => (int) round($quantityLifePointsEnemy),
            'strength_enemy' => $strengthEnemy, 'strength_starship' => $strengthStarship
        ];
        $fightModel::saveRound([
            'round' => $roundNb, 'life_points_starship' => (int) round($quantityLifePoints), 'life_points_enemy' => (int) round($quantityLifePointsEnemy),
            'strength_enemy' => $strengthEnemy, 'strength_starship' => $strengthStarship
        ]);
        $roundNb++;
    }
    if ($quantityLifePointsEnemy <= 0) {
        $winner = 'Player';
    } else {
        $winner = 'Enemy';
    }
    // on sauvegarde le gagnant
    $fightModel::saveWinner($winner);
    $resourcesModel = new ResourcesModel();
    // on ajoute le cristal récolté à la Terre
    if ($winner == 'Player') {

        $planetsModel = new PlanetsModel();
        $crystalEarthDB = $planetsModel::getEarthCrystal();
        $crystalEarth = $crystalEarthDB['data']['crystal'];
        $crystal = $crystal + $crystalEarth;
        $updateCrystal = $resourcesModel::updateCrystalPlanet($crystal, 'terre', "0");
    } else {
        // on retourne sur Terre(en JS) avec un nouveau vaisseau sans énergie et sans cristal
        $playerModel = new PlayerModel();
        $playerModel::savePosition('terre', "0");
        $resourcesModel::updateEnergy(0);
        $resourcesModel::updateCrystalStarship(0);
        $equipments = ['energy_regeneration_level', 'energy_capacity_level', 'crystal_capacity_level', 'weapon_level', 'life_points_level'];
        foreach ($equipments as $equipment) {
            $LevelModel::updateLevelStarshipDestroyed($equipment);
        }
    }


    if ($quantityWeaponEnemyDB['status'] && $quantityLifePointsEnemyDB['status']) {
        $Response['status'] = 200;
        $Response['data'] = ['data' => ['rounds' => $rounds, 'winner' => $winner, 'life_points_starship' => $quantityLifePoints, 'life_points_enemy' => $quantityLifePointsEnemy]];
        $Response['message'] = 'Infos du vaisseau récupérées avec succès.';
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
