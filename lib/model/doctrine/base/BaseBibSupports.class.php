<?php

/**
 * BaseBibSupports
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property integer $id_support
 * @property string $nom_support
 * @property Doctrine_Collection $TStationsBryo
 * @property Doctrine_Collection $TStationsFs
 * 
 * @method integer             getIdSupport()     Returns the current record's "id_support" value
 * @method string              getNomSupport()    Returns the current record's "nom_support" value
 * @method Doctrine_Collection getTStationsBryo() Returns the current record's "TStationsBryo" collection
 * @method Doctrine_Collection getTStationsFs()   Returns the current record's "TStationsFs" collection
 * @method BibSupports         setIdSupport()     Sets the current record's "id_support" value
 * @method BibSupports         setNomSupport()    Sets the current record's "nom_support" value
 * @method BibSupports         setTStationsBryo() Sets the current record's "TStationsBryo" collection
 * @method BibSupports         setTStationsFs()   Sets the current record's "TStationsFs" collection
 * 
 * @package    geonature
 * @subpackage model
 * @author     Gil Deluermoz
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class BaseBibSupports extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('meta.bib_supports');
        $this->hasColumn('id_support', 'integer', 4, array(
             'type' => 'integer',
             'primary' => true,
             'length' => 4,
             ));
        $this->hasColumn('nom_support', 'string', 20, array(
             'type' => 'string',
             'length' => 20,
             ));
    }

    public function setUp()
    {
        parent::setUp();
        $this->hasMany('TStationsBryo', array(
             'local' => 'id_support',
             'foreign' => 'id_support'));

        $this->hasMany('TStationsFs', array(
             'local' => 'id_support',
             'foreign' => 'id_support'));
    }
}