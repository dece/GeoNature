<?php

/**
 * BaseCorZpObs
 * 
 * This class has been auto-generated by the Doctrine ORM Framework
 * 
 * @property integer $indexzp
 * @property integer $codeobs
 * @property TRoles $TRoles
 * @property TZprospection $TZprospection
 * 
 * @method integer       getIndexzp()       Returns the current record's "indexzp" value
 * @method integer       getCodeobs()       Returns the current record's "codeobs" value
 * @method TRoles        getTRoles()        Returns the current record's "TRoles" value
 * @method TZprospection getTZprospection() Returns the current record's "TZprospection" value
 * @method CorZpObs      setIndexzp()       Sets the current record's "indexzp" value
 * @method CorZpObs      setCodeobs()       Sets the current record's "codeobs" value
 * @method CorZpObs      setTRoles()        Sets the current record's "TRoles" value
 * @method CorZpObs      setTZprospection() Sets the current record's "TZprospection" value
 * 
 * @package    geonature
 * @subpackage model
 * @author     Gil Deluermoz
 * @version    SVN: $Id: Builder.php 7490 2010-03-29 19:53:27Z jwage $
 */
abstract class BaseCorZpObs extends sfDoctrineRecord
{
    public function setTableDefinition()
    {
        $this->setTableName('florepatri.cor_zp_obs');
        $this->hasColumn('indexzp', 'integer', 8, array(
             'type' => 'integer',
             'primary' => true,
             'length' => 8,
             ));
        $this->hasColumn('codeobs', 'integer', 4, array(
             'type' => 'integer',
             'notnull' => true,
             'length' => 4,
             ));
    }

    public function setUp()
    {
        parent::setUp();
        $this->hasOne('TRoles', array(
             'local' => 'codeobs',
             'foreign' => 'id_role'));

        $this->hasOne('TZprospection', array(
             'local' => 'indexzp',
             'foreign' => 'indexzp'));
    }
}