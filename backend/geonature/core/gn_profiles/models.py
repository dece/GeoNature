from flask import current_app
from geoalchemy2 import Geometry

from utils_flask_sqla.serializers import serializable
from utils_flask_sqla_geo.serializers import geoserializable

from geonature.utils.env import DB

@serializable
class VmCorTaxonPhenology(DB.Model):
    __tablename__ = "vm_cor_taxon_phenology"
    __table_args__ = {"schema": "gn_profiles"}
    cd_ref = DB.Column(DB.Integer, primary_key=True)
    period = DB.Column(DB.Integer)
    id_nomenclature_life_stage = DB.Column(DB.Integer)
    id_altitude_range = DB.Column(DB.Integer)
    count_valid_data = DB.Column(DB.Integer)


@serializable
@geoserializable
class VmValidProfiles(DB.Model):
    __tablename__ = "vm_valid_profiles"
    __table_args__ = {"schema": "gn_profiles"}
    cd_ref = DB.Column(DB.Integer)
    valid_distribution = DB.Column(Geometry("GEOMETRY", current_app.config["LOCAL_SRID"]))
    altitude_min = DB.Column(DB.Integer)
    altitude_max = DB.Column(DB.Integer)
    first_valid_data = DB.Column(DB.DateTime)
    last_valid_data = DB.Column(DB.DateTime)
    count_valid_data = DB.Column(DB.Integer)