<?php

namespace App\Controllers;

use FFI\Exception;
use App\Models\ResourcesModel;

class ResourcesController
{
    public function getEnergy($request, $response)
    {
        try {
            $ResourcesModel = new ResourcesModel();
            $energy = $ResourcesModel::fetchEnergy();
            if ($energy['status']) {
                $Response['status'] = 200;
                $Response['data'] = $energy['data'];
                $Response['message'] = 'Energie récupérée avec succès.';

                $response->code(200)->json($Response);
                return;
            }

            $Response['status'] = 400;
            $Response['data'] = [];
            $Response['message'] = 'Une erreur inattendue s\'est produite. Veuillez réessayer.';

            $response->code(400)->json($Response);
            return;
        } catch (Exception $e) {
            $Response['status'] = 500;
            $Response['message'] = $e->getMessage();
            $Response['data'] = [];

            $response->code(500)->json($Response);
            return;
        }
    }
    public function updateEnergy($request, $response)
    {
        $Data = json_decode($request->body(), true);
        $energy = filter_var($Data['energy'], FILTER_SANITIZE_STRING);
        try {
            $ResourceModel = new ResourcesModel();
            $updateEnergy = $ResourceModel::updateEnergy($energy);
            if ($updateEnergy['status']) {
                $Response['status'] = 200;
                $Response['data'] = [];
                $Response['message'] = 'Energie mise à jour avec succès.';

                $response->code(200)->json($Response);
                return;
            }

            $Response['status'] = 400;
            $Response['data'] = [];
            $Response['message'] = 'Une erreur inattendue s\'est produite. Veuillez réessayer.';

            $response->code(400)->json($Response);
            return;
        } catch (Exception $e) {
            $Response['status'] = 500;
            $Response['message'] = $e->getMessage();
            $Response['data'] = [];

            $response->code(500)->json($Response);
            return;
        }
    }
}
