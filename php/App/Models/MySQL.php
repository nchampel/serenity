<?php

/**
 * Classe MySQL utilisant un design pattern Singleton
 * 
 */

namespace App\Models;

class MySQL
{
    private static $oPDO = null;

    // static private $oInstance = NULL;

    /**
     * Constructeur défini en privé pour le rendre inaccessible
     * Obligé de le passer en public pour pouvoir l'appeler de l'extérieur par l'héritage
     */
    public function __construct()
    {
        include('db.php');
        self::$oPDO = new \PDO($url, $userDB, $pass);
        self::$oPDO->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        self::$oPDO->query("SET NAMES 'utf8'");
    }
    /**
     * Methode magique de destruction de l'instance MySQL
     */
    public function __destruct()
    {
        self::$oPDO = null;
    }
    /**
     * Methode magique clone verrouillée via une exception
     */
    public function __clone()
    {
        throw new \Exception('Impossible de cloner une connexion SQL protégée par un singleton');
    }
    /**
     * Méthode magique pour rétablir toute connexion de base de données 
     * qui aurait été perdue durant la linéarisation
     */
    // public function __wakeUp()
    // {
    //     // Vérification de la connexion
    //     if (self::$oInstance instanceof self) {
    //         throw new MySQLException();
    //     }
    //     // Correction de la reference
    //     self::$oInstance = $this;
    // }

    /**
     * Méthode magique pour l'appel des fonctions de l'objet PDO quand 
     * elles ne sont pas définies dans la classe
     * 
     * @param type $method
     * @param type $params
     */
    // public function __call($method, $params)
    // {
    //     if (self::$oPDO == NULL) {
    //         self::__construct();
    //     }

    //     return call_user_func_array(array(self::$oPDO, $method), $params);
    // }

    /**
     * Fournit l'unique instance du Singleton
     *
     * @return    MySQL
     */
    public static function getInstance()
    {

        // Verification que l'instance n'a pas déja ete initialisée
        if (is_null(self::$oPDO)) {

            $oPDO = new MySQL();
        }
        // Retour de l'instance unique
        // echo ('instance');
        return self::$oPDO;
    }
}
