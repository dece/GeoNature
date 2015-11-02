<?php

/**
 * BaseTStationsFs
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property integer $id_station
 * @property string $id_exposition
 * @property string $id_sophie
 * @property integer $id_programme_fs
 * @property integer $id_protocole
 * @property integer $id_lot
 * @property integer $id_organisme
 * @property integer $id_support
 * @property integer $id_homogene
 * @property integer $id_surface
 * @property date $dateobs
 * @property string $info_acces
 * @property string $complet_partiel
 * @property integer $meso_longitudinal
 * @property integer $meso_lateral
 * @property decimal $canopee
 * @property integer $ligneux_hauts
 * @property integer $ligneux_bas
 * @property integer $ligneux_tbas
 * @property integer $herbaces
 * @property integer $mousses
 * @property integer $litiere
 * @property integer $altitude_saisie
 * @property integer $altitude_sig
 * @property integer $altitude_retenue
 * @property string $remarques
 * @property decimal $pdop
 * @property blob $the_geom_2154
 * @property blob $the_geom_3857
 * @property integer $srid_dessin
 * @property boolean $supprime
 * @property timestamp $date_insert
 * @property timestamp $date_update
 * @property string $insee
 * @property boolean $validation
 * @property BibExpositions $BibExpositions
 * @property BibHomogenes $BibHomogenes
 * @property BibProgrammesFs $BibProgrammesFs
 * @property BibSupports $BibSupports
 * @property BibOrganismes $BibOrganismes
 * @property BibLots $BibLots
 * @property TProtocoles $TProtocoles
 * @property BibSurfaces $BibSurfaces
 * @property CorFsTaxon $CorFsTaxon
 * @property LCommunes $LCommunes
 * @property Doctrine_Collection $CorFsDelphine
 * @property Doctrine_Collection $CorFsMicrorelief
 * @property Doctrine_Collection $CorFsObservateur
 * 
 * @method integer             getIdStation()         Returns the current record's "id_station" value
 * @method string              getIdExposition()      Returns the current record's "id_exposition" value
 * @method string              getIdSophie()          Returns the current record's "id_sophie" value
 * @method integer             getIdProgrammeFs()     Returns the current record's "id_programme_fs" value
 * @method integer             getIdProtocole()       Returns the current record's "id_protocole" value
 * @method integer             getIdLot()             Returns the current record's "id_lot" value
 * @method integer             getIdOrganisme()       Returns the current record's "id_organisme" value
 * @method integer             getIdSupport()         Returns the current record's "id_support" value
 * @method integer             getIdHomogene()        Returns the current record's "id_homogene" value
 * @method integer             getIdSurface()         Returns the current record's "id_surface" value
 * @method date                getDateobs()           Returns the current record's "dateobs" value
 * @method string              getInfoAcces()         Returns the current record's "info_acces" value
 * @method string              getCompletPartiel()    Returns the current record's "complet_partiel" value
 * @method integer             getMesoLongitudinal()  Returns the current record's "meso_longitudinal" value
 * @method integer             getMesoLateral()       Returns the current record's "meso_lateral" value
 * @method decimal             getCanopee()           Returns the current record's "canopee" value
 * @method integer             getLigneuxHauts()      Returns the current record's "ligneux_hauts" value
 * @method integer             getLigneuxBas()        Returns the current record's "ligneux_bas" value
 * @method integer             getLigneuxTbas()       Returns the current record's "ligneux_tbas" value
 * @method integer             getHerbaces()          Returns the current record's "herbaces" value
 * @method integer             getMousses()           Returns the current record's "mousses" value
 * @method integer             getLitiere()           Returns the current record's "litiere" value
 * @method integer             getAltitudeSaisie()    Returns the current record's "altitude_saisie" value
 * @method integer             getAltitudeSig()       Returns the current record's "altitude_sig" value
 * @method integer             getAltitudeRetenue()   Returns the current record's "altitude_retenue" value
 * @method string              getRemarques()         Returns the current record's "remarques" value
 * @method decimal             getPdop()              Returns the current record's "pdop" value
 * @method blob                getTheGeom2154()       Returns the current record's "the_geom_2154" value
 * @method blob                getTheGeom3857()       Returns the current record's "the_geom_3857" value
 * @method integer             getSridDessin()        Returns the current record's "srid_dessin" value
 * @method boolean             getSupprime()          Returns the current record's "supprime" value
 * @method timestamp           getDateInsert()        Returns the current record's "date_insert" value
 * @method timestamp           getDateUpdate()        Returns the current record's "date_update" value
 * @method string              getInsee()             Returns the current record's "insee" value
 * @method boolean             getValidation()        Returns the current record's "validation" value
 * @method BibExpositions      getBibExpositions()    Returns the current record's "BibExpositions" value
 * @method BibHomogenes        getBibHomogenes()      Returns the current record's "BibHomogenes" value
 * @method BibProgrammesFs     getBibProgrammesFs()   Returns the current record's "BibProgrammesFs" value
 * @method BibSupports         getBibSupports()       Returns the current record's "BibSupports" value
 * @method BibOrganismes       getBibOrganismes()     Returns the current record's "BibOrganismes" value
 * @method BibLots             getBibLots()           Returns the current record's "BibLots" value
 * @method TProtocoles         getTProtocoles()       Returns the current record's "TProtocoles" value
 * @method BibSurfaces         getBibSurfaces()       Returns the current record's "BibSurfaces" value
 * @method CorFsTaxon          getCorFsTaxon()        Returns the current record's "CorFsTaxon" value
 * @method LCommunes           getLCommunes()         Returns the current record's "LCommunes" value
 * @method Doctrine_Collection getCorFsDelphine()     Returns the current record's "CorFsDelphine" collection
 * @method Doctrine_Collection getCorFsMicrorelief()  Returns the current record's "CorFsMicrorelief" collection
 * @method Doctrine_Collection getCorFsObservateur()  Returns the current record's "CorFsObservateur" collection
 * @method TStationsFs         setIdStation()         Sets the current record's "id_station" value
 * @method TStationsFs         setIdExposition()      Sets the current record's "id_exposition" value
 * @method TStationsFs         setIdSophie()          Sets the current record's "id_sophie" value
 * @method TStationsFs         setIdProgrammeFs()     Sets the current record's "id_programme_fs" value
 * @method TStationsFs         setIdProtocole()       Sets the current record's "id_protocole" value
 * @method TStationsFs         setIdLot()             Sets the current record's "id_lot" value
 * @method TStationsFs         setIdOrganisme()       Sets the current record's "id_organisme" value
 * @method TStationsFs         setIdSupport()         Sets the current record's "id_support" value
 * @method TStationsFs         setIdHomogene()        Sets the current record's "id_homogene" value
 * @method TStationsFs         setIdSurface()         Sets the current record's "id_surface" value
 * @method TStationsFs         setDateobs()           Sets the current record's "dateobs" value
 * @method TStationsFs         setInfoAcces()         Sets the current record's "info_acces" value
 * @method TStationsFs         setCompletPartiel()    Sets the current record's "complet_partiel" value
 * @method TStationsFs         setMesoLongitudinal()  Sets the current record's "meso_longitudinal" value
 * @method TStationsFs         setMesoLateral()       Sets the current record's "meso_lateral" value
 * @method TStationsFs         setCanopee()           Sets the current record's "canopee" value
 * @method TStationsFs         setLigneuxHauts()      Sets the current record's "ligneux_hauts" value
 * @method TStationsFs         setLigneuxBas()        Sets the current record's "ligneux_bas" value
 * @method TStationsFs         setLigneuxTbas()       Sets the current record's "ligneux_tbas" value
 * @method TStationsFs         setHerbaces()          Sets the current record's "herbaces" value
 * @method TStationsFs         setMousses()           Sets the current record's "mousses" value
 * @method TStationsFs         setLitiere()           Sets the current record's "litiere" value
 * @method TStationsFs         setAltitudeSaisie()    Sets the current record's "altitude_saisie" value
 * @method TStationsFs         setAltitudeSig()       Sets the current record's "altitude_sig" value
 * @method TStationsFs         setAltitudeRetenue()   Sets the current record's "altitude_retenue" value
 * @method TStationsFs         setRemarques()         Sets the current record's "remarques" value
 * @method TStationsFs         setPdop()              Sets the current record's "pdop" value
 * @method TStationsFs         setTheGeom2154()       Sets the current record's "the_geom_2154" value
 * @method TStationsFs         setTheGeom3857()       Sets the current record's "the_geom_3857" value
 * @method TStationsFs         setSridDessin()        Sets the current record's "srid_dessin" value
 * @method TStationsFs         setSupprime()          Sets the current record's "supprime" value
 * @method TStationsFs         setDateInsert()        Sets the current record's "date_insert" value
 * @method TStationsFs         setDateUpdate()        Sets the current record's "date_update" value
 * @method TStationsFs         setInsee()             Sets the current record's "insee" value
 * @method TStationsFs         setValidation()        Sets the current record's "validation" value
 * @method TStationsFs         setBibExpositions()    Sets the current record's "BibExpositions" value
 * @method TStationsFs         setBibHomogenes()      Sets the current record's "BibHomogenes" value
 * @method TStationsFs         setBibProgrammesFs()   Sets the current record's "BibProgrammesFs" value
 * @method TStationsFs         setBibSupports()       Sets the current record's "BibSupports" value
 * @method TStationsFs         setBibOrganismes()     Sets the current record's "BibOrganismes" value
 * @method TStationsFs         setBibLots()           Sets the current record's "BibLots" value
 * @method TStationsFs         setTProtocoles()       Sets the current record's "TProtocoles" value
 * @method TStationsFs         setBibSurfaces()       Sets the current record's "BibSurfaces" value
 * @method TStationsFs         setCorFsTaxon()        Sets the current record's "CorFsTaxon" value
 * @method TStationsFs         setLCommunes()         Sets the current record's "LCommunes" value
 * @method TStationsFs         setCorFsDelphine()     Sets the current record's "CorFsDelphine" collection
 * @method TStationsFs         setCorFsMicrorelief()  Sets the current record's "CorFsMicrorelief" collection
 * @method TStationsFs         setCorFsObservateur()  Sets the current record's "CorFsObservateur" collection
 * 
 * @package    geonature
 * @subpackage model
 * @author     Gil Deluermoz
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class BaseTStationsFs extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('florestation.t_stations_fs');
        $this->hasColumn('id_station', 'integer', 8, array(
             'type' => 'integer',
             'primary' => true,
             'length' => 8,
             ));
        $this->hasColumn('id_exposition', 'string', 2, array(
             'type' => 'string',
             'fixed' => 1,
             'length' => 2,
             ));
        $this->hasColumn('id_sophie', 'string', 5, array(
             'type' => 'string',
             'fixed' => 1,
             'length' => 5,
             ));
        $this->hasColumn('id_programme_fs', 'integer', 4, array(
             'type' => 'integer',
             'fixed' => 1,
             'length' => 4,
             ));
        $this->hasColumn('id_protocole', 'integer', 4, array(
             'type' => 'integer',
             'fixed' => 1,
             'length' => 4,
             ));
        $this->hasColumn('id_lot', 'integer', 4, array(
             'type' => 'integer',
             'fixed' => 1,
             'length' => 4,
             ));
        $this->hasColumn('id_organisme', 'integer', 4, array(
             'type' => 'integer',
             'fixed' => 1,
             'length' => 4,
             ));
        $this->hasColumn('id_support', 'integer', 4, array(
             'type' => 'integer',
             'fixed' => 1,
             'length' => 4,
             ));
        $this->hasColumn('id_homogene', 'integer', 4, array(
             'type' => 'integer',
             'fixed' => 1,
             'length' => 4,
             ));
        $this->hasColumn('id_surface', 'integer', 4, array(
             'type' => 'integer',
             'fixed' => 1,
             'length' => 4,
             ));
        $this->hasColumn('dateobs', 'date', 25, array(
             'type' => 'date',
             'notnull' => true,
             'length' => 25,
             ));
        $this->hasColumn('info_acces', 'string', 255, array(
             'type' => 'string',
             'length' => 255,
             ));
        $this->hasColumn('complet_partiel', 'string', 1, array(
             'type' => 'string',
             'length' => 1,
             ));
        $this->hasColumn('meso_longitudinal', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('meso_lateral', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('canopee', 'decimal', 10, array(
             'type' => 'decimal',
             'length' => 10,
             'scale' => '2',
             ));
        $this->hasColumn('ligneux_hauts', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('ligneux_bas', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('ligneux_tbas', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('herbaces', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('mousses', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('litiere', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('altitude_saisie', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('altitude_sig', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('altitude_retenue', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('remarques', 'string', null, array(
             'type' => 'string',
             'length' => '',
             ));
        $this->hasColumn('pdop', 'decimal', 10, array(
             'type' => 'decimal',
             'length' => 10,
             'scale' => '2',
             ));
        $this->hasColumn('the_geom_2154', 'blob', null, array(
             'type' => 'blob',
             'length' => '',
             ));
        $this->hasColumn('the_geom_3857', 'blob', null, array(
             'type' => 'blob',
             'length' => '',
             ));
        $this->hasColumn('srid_dessin', 'integer', 4, array(
             'type' => 'integer',
             'length' => 4,
             ));
        $this->hasColumn('supprime', 'boolean', 1, array(
             'type' => 'boolean',
             'length' => 1,
             ));
        $this->hasColumn('date_insert', 'timestamp', 25, array(
             'type' => 'timestamp',
             'length' => 25,
             ));
        $this->hasColumn('date_update', 'timestamp', 25, array(
             'type' => 'timestamp',
             'length' => 25,
             ));
        $this->hasColumn('insee', 'string', 5, array(
             'type' => 'string',
             'length' => 5,
             ));
        $this->hasColumn('validation', 'boolean', 1, array(
             'type' => 'boolean',
             'length' => 1,
             ));
    }

    public function setUp()
    {
        parent::setUp();
        $this->hasOne('BibExpositions', array(
             'local' => 'id_exposition',
             'foreign' => 'id_exposition'));

        $this->hasOne('BibHomogenes', array(
             'local' => 'id_homogene',
             'foreign' => 'id_homogene'));

        $this->hasOne('BibProgrammesFs', array(
             'local' => 'id_programme_fs',
             'foreign' => 'id_programme_fs'));

        $this->hasOne('BibSupports', array(
             'local' => 'id_support',
             'foreign' => 'id_support'));

        $this->hasOne('BibOrganismes', array(
             'local' => 'id_organisme',
             'foreign' => 'id_organisme'));

        $this->hasOne('BibLots', array(
             'local' => 'id_lot',
             'foreign' => 'id_lot'));

        $this->hasOne('TProtocoles', array(
             'local' => 'id_protocole',
             'foreign' => 'id_protocole'));

        $this->hasOne('BibSurfaces', array(
             'local' => 'id_surface',
             'foreign' => 'id_surface'));

        $this->hasOne('CorFsTaxon', array(
             'local' => 'id_station',
             'foreign' => 'id_station'));

        $this->hasOne('LCommunes', array(
             'local' => 'insee',
             'foreign' => 'insee'));

        $this->hasMany('CorFsDelphine', array(
             'local' => 'id_station',
             'foreign' => 'id_station'));

        $this->hasMany('CorFsMicrorelief', array(
             'local' => 'id_station',
             'foreign' => 'id_station'));

        $this->hasMany('CorFsObservateur', array(
             'local' => 'id_station',
             'foreign' => 'id_station'));
    }
}