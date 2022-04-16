<?php

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
        include('../../inc/db.php');
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

$images = ['planet1.jpg', 'planet2.jpg', 'planet3.webp', 'planet4.jpg', 'planet5.jpg', 'planet6.jpg'];

for ($i = 1; $i <= 500; $i++) {
    $chanceHasHeadquarter = rand(1, 10);
    $randomImage = rand(0, 5);
    $planet = [
        'player_id' => 0,
        'planet_id' => 'g1p' . $i,
        'galaxy' => 1,
        'planet' => $i,
        'image' => $images[$randomImage],
        'crystal_level' => rand(0, 3),
        'crystal_stockage_level' => rand(1, 3),
        'has_headquarter' => $chanceHasHeadquarter == 1 ? 1 : 0,
        'has_enemy' => $chanceHasHeadquarter == 1 ? 1 : 0
    ];
    // $planets[] = $planet;
    $rqt = "INSERT INTO crystal_planets_levels (player_id, planet_id, galaxy, planet, image, crystal_level, crystal_stockage_level, has_headquarter, has_enemy)
VALUES (:player_id, :planet_id, :galaxy, :planet, :image, :crystal_level, :crystal_stockage_level, :has_headquarter, :has_enemy)";

    $MySQL = new MySQL();

    $statement = $MySQL::getInstance()->prepare($rqt);
    $statement->bindParam(':player_id', $planet['player_id']);
    $statement->bindParam(':planet_id', $planet['planet_id']);
    $statement->bindParam(':image', $planet['image']);
    $statement->bindParam(':galaxy', $planet['galaxy']);
    $statement->bindParam(':planet', $planet['planet']);
    $statement->bindParam(':crystal_level', $planet['crystal_level']);
    $statement->bindParam(':crystal_stockage_level', $planet['crystal_stockage_level']);
    $statement->bindParam(':has_headquarter', $planet['has_headquarter']);
    $statement->bindParam(':has_enemy', $planet['has_enemy']);
    $statement->execute();
}


// echo '<pre>';
// var_dump($planets);
// echo '</pre>';
