-- Actions du trigger trg_refresh_taxons_forautocomplete
INSERT INTO gn_synthese.taxons_synthese_autocomplete
SELECT DISTINCT
  t.cd_nom,
  t.cd_ref,
  concat(t.lb_nom, ' = <i>', t.nom_valide, '</i>', ' - [', t.id_rang, ' - ', t.cd_nom , ']') AS search_name,
  t.nom_valide,
  t.lb_nom,
  t.regne,
  t.group2_inpn
FROM gn_synthese.synthese s 
JOIN taxonomie.taxref t ON t.cd_nom = s.cd_nom;

INSERT INTO gn_synthese.taxons_synthese_autocomplete
SELECT DISTINCT
  t.cd_nom,
  t.cd_ref,
  concat(t.nom_vern, ' =  <i> ', t.nom_valide, '</i>', ' - [', t.id_rang, ' - ', t.cd_nom , ']' ) AS search_name,
  t.nom_valide,
  t.lb_nom,
  t.regne,
  t.group2_inpn
FROM gn_synthese.synthese s
JOIN taxonomie.taxref t ON t.cd_nom = s.cd_nom AND t.cd_nom = t.cd_ref
WHERE t.nom_vern IS NOT NULL;


--tri_meta_dates_change_synthese
-- On garde les dates existantes dans les schémas importés
-- Mais on update les enregistrements où date_insert et date_update serait restée vides
UPDATE gn_synthese.synthese SET meta_create_date = NOW() WHERE meta_create_date IS NULL;
UPDATE gn_synthese.synthese SET meta_update_date = NOW() WHERE meta_update_date IS NULL;


--trg_maj_synthese_observers_txt
WITH formated_observers AS (
SELECT s.id_synthese, array_to_string(array_agg(r.nom_role || ' ' || r.prenom_role), ', ') as obs
FROM gn_synthese.synthese s
JOIN gn_synthese.cor_observer_synthese cor ON s.id_synthese = cor.id_synthese
JOIN utilisateurs.t_roles r on r.id_role = cor.id_role
GROUP BY s.id_synthese
)
 UPDATE gn_synthese.synthese SET observers = f.obs
 FROM formated_observers f 
 JOIN gn_synthese.synthese s ON f.id_synthese = s.id_synthese
 WHERE f.id_synthese = s.id_synthese


-- Actions du trigger tri_insert_cor_area_synthese
-- On recalcule l'intersection entre les données de la synthèse et les géométries de ref_geo.l_areas
INSERT INTO gn_synthese.cor_area_synthese 
SELECT
  s.id_synthese,
  a.id_area,
  s.cd_nom
FROM ref_geo.l_areas a
JOIN gn_synthese.synthese s ON St_Intersects(s.the_geom_local, a.geom);

--Action du trigger tri_maj_cor_area_taxon
--On vide la table cor_area_taxon
TRUNCATE TABLE gn_synthese.cor_area_taxon;
--On recalcul tout son contenu avec ce qu'il y a dans la synthèse et dans cor_area synthese
INSERT INTO gn_synthese.cor_area_taxon (id_area, cd_nom, last_date, color, nb_obs)
SELECT id_area, s.cd_nom,  max(s.date_min) AS last_date, gn_synthese.color_taxon(s.cd_nom, max(s.date_min)) AS color, count(s.id_synthese) AS nb_obs
FROM gn_synthese.cor_area_synthese cor
JOIN gn_synthese.synthese s ON s.id_synthese = cor.id_synthese
GROUP BY id_area, s.cd_nom;


-- On réactive les triggers du schéma synthese après avoir joué (ci-dessus) leurs actions
ALTER TABLE gn_synthese.cor_area_synthese ENABLE TRIGGER tri_maj_cor_area_taxon;
ALTER TABLE gn_synthese.cor_observer_synthese ENABLE TRIGGER trg_maj_synthese_observers_txt;
ALTER TABLE gn_synthese.synthese ENABLE TRIGGER tri_meta_dates_change_synthese;
ALTER TABLE gn_synthese.synthese ENABLE TRIGGER tri_insert_cor_area_synthese;
ALTER TABLE gn_synthese.synthese ENABLE TRIGGER trg_refresh_taxons_forautocomplete;
