from flask import Blueprint, request, make_response, url_for, redirect, current_app, jsonify
import requests
import datetime
import xmltodict
from xml.etree import ElementTree as ET

from ...utils.utilssqlalchemy import json_resp

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

### Module d'identificiation provisoire pour test du CAS INPN ###

routes = Blueprint('test_auth', __name__)


@routes.route('/login_cas', methods=['GET'])
def loginCas():
    configCas = current_app.config['CAS']
    params = request.args
    if 'ticket' in params:
        base_url = current_app.config['URL_API']+"/test_auth/login_cas"
        urlValidate = "%s?ticket=%s&service=%s"%(configCas['URL_VALIDATION'], params['ticket'], base_url)
        r = requests.get(urlValidate)
        user = None
        if r.status_code == 200:
            xmlDict = xmltodict.parse(r.content)
            resp = xmlDict['cas:serviceResponse']
            if 'cas:authenticationSuccess' in resp:
                user = resp['cas:authenticationSuccess']['cas:user']
        if user:
            WSUserUrl = "%s/%s/?verify=false"%(configCas['USER_WS']['URL'], user)
            r  = requests.get(WSUserUrl, auth=(configCas['USER_WS']['ID'], configCas['USER_WS']['PASSWORD']))
            if r.status_code == 200:
                infoUser = r.json()
                organismId = infoUser['codeOrganisme']
                organismName = infoUser['libelleLongOrganisme']
                userName = infoUser['login']
                userId = infoUser['id']
                # met les droit d'admin pour la démo, a changer
                rights = {'14' : {'C': 3, 'R': 3, 'U': 3, 'V': 3, 'E': 3, 'D': 3 } }
                currentUser = {
                    'userName': userName,
                    'userId': userId,
                    'organismName': organismName,
                    'organismId': organismId if organismId != None else 0,
                    'rights': rights
                }
                response = make_response(redirect(current_app.config['URL_APPLICATION']))
                cookieExp = datetime.datetime.utcnow()
                cookieExp += datetime.timedelta(seconds=current_app.config['COOKIE_EXPIRATION'])
                response.set_cookie('token',
                                    'test12345',
                                    expires=cookieExp)
                response.set_cookie('currentUser',
                                     str(currentUser),
                                     expires=cookieExp)
                ## push user organism
                ## if id_organism = None => set 99 = 'Autres'
                data = {
                    'id_organism':organismId if organismId != None else 99,
                    'nom_organisme': organismName
                }
                requests.post(current_app.config['URL_API']+'/users/organism', data=jsonify(data))
                # push role
                data = {
                    'id_role':userId,
                    'nom_role': infoUser['nom'],
                    'prenom_role': infoUser['prenom']
                }
                requests.post(current_app.config['URL_API']+'/users/role', data=jsonify(data))
            return response
        else:
            # redirect to inpn            
            return "echec de l'authentification"

def insertOrMergeUser(data):
    requests.post(current_app.config['URL_API']+'/users/role', jsonify(data))