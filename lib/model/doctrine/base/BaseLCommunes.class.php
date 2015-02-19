<?php

/**
 * BaseLCommunes
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property string $insee
 * @property integer $id_secteur
 * @property string $commune_maj
 * @property string $departement
 * @property string $commune_min
 * @property string $epci
 * @property string $coeur_aoa
 * @property integer $codenum
 * @property string $pays
 * @property boolean $saisie_fv
 * @property boolean $saisie_fp
 * @property boolean $pn
 * @property boolean $atlas
 * @property boolean $leader2
 * @property boolean $leaderplus
 * @property integer $id_secteur_fp
 * @property blob $the_geom
 * @property LSecteurs $LSecteurs
 * @property Doctrine_Collection $Syntheseff
 * @property Doctrine_Collection $TFichesCf
 * @property Doctrine_Collection $TFichesInv
 * @property Doctrine_Collection $TStationsBryo
 * @property Doctrine_Collection $TStationsFs
 * 
 * @method string              getInsee()         Returns the current record's "insee" value
 * @method integer             getIdSecteur()     Returns the current record's "id_secteur" value
 * @method string              getCommuneMaj()    Returns the current record's "commune_maj" value
 * @method string              getDepartement()   Returns the current record's "departement" value
 * @method string              getCommuneMin()    Returns the current record's "commune_min" value
 * @method string              getEpci()          Returns the current record's "epci" value
 * @method string              getCoeurAoa()      Returns the current record's "coeur_aoa" value
 * @method integer             getCodenum()       Returns the current record's "codenum" value
 * @method string              getPays()          Returns the current record's "pays" value
 * @method boolean             getSaisieFv()      Returns the current record's "saisie_fv" value
 * @method boolean             getSaisieFp()      Returns the current record's "saisie_fp" value
 * @method boolean             getPn()            Returns the current record's "pn" value
 * @method boolean             getAtlas()         Returns the current record's "atlas" value
 * @method boolean             getLeader2()       Returns the current record's "leader2" value
 * @method boolean             getLeaderplus()    Returns the current record's "leaderplus" value
 * @method integer             getIdSecteurFp()   Returns the current record's "id_secteur_fp" value
 * @method blob                getTheGeom()       Returns the current record's "the_geom" value
 * @method LSecteurs           getLSecteurs()     Returns the current record's "LSecteurs" value
 * @method Doctrine_Collection getSyntheseff()    Returns the current record's "Syntheseff" collection
 * @method Doctrine_Collection getTFichesCf()     Returns the current record's "TFichesCf" collection
 * @method Doctrine_Collection getTFichesInv()    Returns the current record's "TFichesInv" collection
 * @method Doctrine_Collection getTStationsBryo() Returns the current record's "TStationsBryo" collection
 * @method Doctrine_Collection getTStationsFs()   Returns the current record's "TStationsFs" collection
 * @method LCommunes           setInsee()         Sets the current record's "insee" value
 * @method LCommunes           setIdSecteur()     Sets the current record's "id_secteur" value
 * @method LCommunes           setCommuneMaj()    Sets the current record's "commune_maj" value
 * @method LCommunes           setDepartement()   Sets the current record's "departement" value
 * @method LCommunes           setCommuneMin()    Sets the current record's "commune_min" value
 * @method LCommunes           setEpci()          Sets the current record's "epci" value
 * @method LCommunes           setCoeurAoa()      Sets the current record's "coeur_aoa" value
 * @method LCommunes           setCodenum()       Sets the current record's "codenum" value
 * @method LCommunes           setPays()          Sets the current record's "pays" value
 * @method LCommunes           setSaisieFv()      Sets the current record's "saisie_fv" value
 * @method LCommunes           setSaisieFp()      Sets the current record's "saisie_fp" value
 * @method LCommunes           setPn()            Sets the current record's "pn" value
 * @method LCommunes           setAtlas()         Sets the current record's "atlas" value
 * @method LCommunes           setLeader2()       Sets the current record's "leader2" value
 * @method LCommunes           setLeaderplus()    Sets the current record's "leaderplus" value
 * @method LCommunes           setIdSecteurFp()   Sets the current record's "id_secteur_fp" value
 * @method LCommunes           setTheGeom()       Sets the current record's "the_geom" value
 * @method LCommunes           setLSecteurs()     Sets the current record's "LSecteurs" value
 * @method LCommunes           setSyntheseff()    Sets the current record's "Syntheseff" collection
 * @method LCommunes           setTFichesCf()     Sets the current record's "TFichesCf" collection
 * @method LCommunes           setTFichesInv()    Sets the current record's "TFichesInv" collection
 * @method LCommunes           setTStationsBryo() Sets the current record's "TStationsBryo" collection
 * @method LCommunes           setTStationsFs()   Sets the current record's "TStationsFs" collection
 * 
 * @package    geonature
 * @subpackage model
 * @author     Gil Deluermoz
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class BaseLCommunes extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('layers.l_communes');
        $this->hasColumn('insee', 'string', 5, array(
             'type' => 'string',
             'primary' => true,
             'length' => 5,
             ));
        $this->hasColumn('id_secteur', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('commune_maj', 'string', 40, array(
             'type' => 'string',
             'length' => 40,
             ));
        $this->hasColumn('departement', 'string', 2, array(
             'type' => 'string',
             'length' => 2,
             ));
        $this->hasColumn('commune_min', 'string', 40, array(
             'type' => 'string',
             'length' => 40,
             ));
        $this->hasColumn('epci', 'string', 40, array(
             'type' => 'string',
             'length' => 40,
             ));
        $this->hasColumn('coeur_aoa', 'string', 2, array(
             'type' => 'string',
             'length' => 2,
             ));
        $this->hasColumn('codenum', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('pays', 'string', 40, array(
             'type' => 'string',
             'length' => 40,
             ));
        $this->hasColumn('saisie_fv', 'boolean', 1, array(
             'type' => 'boolean',
             'length' => 1,
             ));
        $this->hasColumn('saisie_fp', 'boolean', 1, array(
             'type' => 'boolean',
             'length' => 1,
             ));
        $this->hasColumn('pn', 'boolean', 1, array(
             'type' => 'boolean',
             'length' => 1,
             ));
        $this->hasColumn('atlas', 'boolean', 1, array(
             'type' => 'boolean',
             'length' => 1,
             ));
        $this->hasColumn('leader2', 'boolean', 1, array(
             'type' => 'boolean',
             'length' => 1,
             ));
        $this->hasColumn('leaderplus', 'boolean', 1, array(
             'type' => 'boolean',
             'length' => 1,
             ));
        $this->hasColumn('id_secteur_fp', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('the_geom', 'blob', null, array(
             'type' => 'blob',
             'length' => '',
             ));
    }

    public function setUp()
    {
        parent::setUp();
        $this->hasOne('LSecteurs', array(
             'local' => 'id_secteur',
             'foreign' => 'id_secteur'));

        $this->hasMany('Syntheseff', array(
             'local' => 'insee',
             'foreign' => 'insee'));

        $this->hasMany('TFichesCf', array(
             'local' => 'insee',
             'foreign' => 'insee'));

        $this->hasMany('TFichesInv', array(
             'local' => 'insee',
             'foreign' => 'insee'));

        $this->hasMany('TStationsBryo', array(
             'local' => 'insee',
             'foreign' => 'insee'));

        $this->hasMany('TStationsFs', array(
             'local' => 'insee',
             'foreign' => 'insee'));
    }
}