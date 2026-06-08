# API detaillee par espace, rubrique et sous-rubrique

Base URL :

```txt
http://localhost:8000/api/v1
```

Ce fichier complete `API_ENDPOINTS.md`. Il liste toute la navigation du projet : espace principal, rubrique, sous-rubrique, endpoint backend et structure JSON attendue.

## Format standard

### Liste

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 0
  }
}
```

### Page/espace

```json
{
  "id": "km",
  "title": "Knowledge Management",
  "description": "Espace documentaire et collaboratif",
  "widgets": [],
  "sections": []
}
```

### Document

```json
{
  "id": "doc-1",
  "title": "Charte de gouvernance",
  "space": "km",
  "rubrique": "referentiels",
  "sousRubrique": "politiques",
  "type": "pdf",
  "fileName": "charte_gouvernance.pdf",
  "status": "Publie",
  "version": "1.0",
  "updatedAt": "2026-06-08T10:00:00Z",
  "downloadUrl": "/api/v1/documents/doc-1/download"
}
```

### Carte de contenu

```json
{
  "id": "item-1",
  "title": "Titre",
  "description": "Description courte",
  "category": "Categorie",
  "status": "Actif",
  "date": "2026-06-08",
  "icon": "file-text",
  "color": "blue",
  "targetType": "document",
  "targetId": "doc-1"
}
```

## 1. Accueil

### GET `/dashboard`

Response :

```json
{
  "heroSlides": [
    {
      "id": "slide-1",
      "title": "Digital Workplace CMR",
      "subtitle": "Actualites, services et collaboration interne",
      "image": "images/intranet/slider1.png",
      "linkType": "view",
      "linkTarget": "actualites"
    }
  ],
  "flashInfos": [
    {
      "id": "cmr-actu-contrat",
      "category": "CMR Actualites",
      "text": "Signature du nouveau contrat programme Etat-CMR pour la periode 2026-2028.",
      "publishedAt": "2026-04-22T09:00:00Z"
    }
  ],
  "widgets": {
    "km": [],
    "agenda": [],
    "notifications": [],
    "mood": {
      "alreadyVoted": false,
      "stats": []
    }
  }
}
```

## 2. Mes Applications

### GET `/applications`

Response :

```json
{
  "data": [
    {
      "id": "app-rh",
      "title": "Portail RH",
      "description": "Conges, attestations et demandes RH",
      "category": "RH",
      "url": "https://rh.cmr.ma",
      "icon": "users",
      "isFavorite": true,
      "requiresSso": true
    }
  ]
}
```

### PATCH `/applications/{id}/favorite`

Request :

```json
{
  "isFavorite": true
}
```

## 3. RH & Mobilite

### Rubriques RH

| Rubrique | Sous-rubrique | Endpoint |
| --- | --- | --- |
| Ma Carriere | carriere | `GET /hr/career` |
| Formation | formation | `GET /hr/trainings` |
| Documents RH | documents | `GET /documents?space=rh&sousRubrique=documents` |
| Postes Vacants | offres | `GET /hr/job-offers` |
| Espace Managers | managers | `GET /hr/manager-space` |
| Enquetes RH | enquetes | `GET /surveys?space=rh` |
| Mes Applis | applis | `GET /applications?space=rh` |
| Forums & Groupes | forums | `GET /collaboration/forums?space=rh` |
| Vie Sociale | viesociale | `GET /social-life/events` |
| Activites | activites | `GET /hr/activities` |

### GET `/hr/career`

Response :

```json
{
  "employeeId": "c2",
  "position": "Responsable Developpement RH",
  "direction": "Direction RH",
  "careerPath": [
    {
      "title": "Responsable Developpement RH",
      "from": "2024-01-01",
      "to": null,
      "status": "Actuel"
    }
  ],
  "documents": []
}
```

### GET `/hr/trainings`

Response :

```json
{
  "data": [
    {
      "id": "tr-1",
      "title": "Management Agile",
      "category": "Management",
      "format": "E-learning",
      "duration": "2h",
      "status": "Disponible",
      "registrationStatus": "open"
    }
  ]
}
```

### GET `/hr/job-offers`

Response :

```json
{
  "data": [
    {
      "id": "bi",
      "titre": "Chef de Projet BI (H/F)",
      "direction": "Direction des Systemes d'Information",
      "lieu": "Casablanca",
      "niveau": "Cadre",
      "date": "2026-05-15",
      "mission": "Piloter les projets BI.",
      "profil": ["Bac+5", "5 ans d'experience"]
    }
  ]
}
```

### POST `/hr/job-offers/{id}/applications`

Request :

```json
{
  "fullName": "Nadia Benali",
  "email": "nadia.benali@cmr.ma",
  "phone": "+212 6 00 00 00 00",
  "motivation": "Je souhaite postuler.",
  "cvDocumentId": "doc-cv-1"
}
```

## 4. CMR Academy

### GET `/academy/catalog`

Response :

```json
{
  "data": [
    {
      "id": "course-1",
      "title": "Actuariat retraite",
      "domain": "Metier",
      "format": "Presentiel",
      "duration": "2 jours",
      "level": "Intermediaire",
      "status": "Ouvert"
    }
  ]
}
```

### POST `/academy/courses/{id}/registrations`

Request :

```json
{
  "userId": "u1"
}
```

## 5. Vie Sociale

### GET `/social-life/events`

Response :

```json
{
  "data": [
    {
      "id": "soc-1",
      "title": "Journee Portes Ouvertes CMR",
      "type": "Evenement",
      "startAt": "2026-05-05T09:00:00Z",
      "endAt": "2026-05-05T17:00:00Z",
      "location": "Siege CMR",
      "description": "Decouvrez les projets en cours.",
      "canRegister": true
    }
  ]
}
```

### GET `/social-life/gallery`

Response :

```json
{
  "data": [
    {
      "id": "photo-1",
      "title": "Signature du contrat programme",
      "image": "images/intranet/news_contract.jpg",
      "alt": "Signature du contrat programme"
    }
  ]
}
```

## 6. Communication interne

### GET `/internal-communication`

Response :

```json
{
  "news": [],
  "flashInfos": [],
  "agenda": [],
  "filters": {
    "categories": ["Gouvernance", "Digital", "RH", "Social"],
    "metiers": ["direction", "rh", "digital", "audit", "social"]
  }
}
```

### GET `/internal-communication/news`

Query :

```txt
?category=Digital&metier=digital&search=data
```

Response :

```json
{
  "data": [
    {
      "id": 8,
      "title": "Feuille de route digitale 2026",
      "category": "Digital",
      "author": "Direction Digitale",
      "date": "2026-04-01",
      "excerpt": "La Direction Digitale presente la feuille de route.",
      "image": "images/intranet/slider1.png"
    }
  ]
}
```

## 7. Knowledge Management

### Rubriques KM

| Rubrique | Endpoint |
| --- | --- |
| Referentiels metiers | `GET /km/referentiels` |
| Glossaire | `GET /km/glossary` |
| REX | `GET /km/rex` |
| E-learning | `GET /km/elearning` |
| Communautes | `GET /km/communities` |
| AMOA / Changement | `GET /km/change-management` |
| Docs formalises | `GET /documents?space=km&sousRubrique=docs` |
| Contributions | `GET /km/contributions` |
| Categorisation | `GET /km/catalog` |
| Livrables projets | `GET /documents?space=km&sousRubrique=livrables` |
| Modeles / formulaires | `GET /documents?space=km&sousRubrique=modeles` |
| Articles / bilans | `GET /km/publications` |
| GED | `GET /documents?space=km&sousRubrique=ged` |
| GLPI | `GET /km/glpi-tickets` |
| Supports pedagogiques | `GET /km/supports` |

### GET `/km/referentiels`

Response :

```json
{
  "data": [
    {
      "id": "km-ref-1",
      "title": "Referentiel metier retraite",
      "domain": "Retraite",
      "owner": "Direction Metier",
      "documentsCount": 4,
      "updatedAt": "2026-06-08T10:00:00Z"
    }
  ]
}
```

### GET `/km/glossary`

Response :

```json
{
  "data": [
    {
      "id": "term-1",
      "term": "Pension",
      "definition": "Prestation versee au beneficiaire.",
      "domain": "Retraite"
    }
  ]
}
```

### POST `/km/contributions`

Request :

```json
{
  "title": "Nouvelle contribution",
  "type": "REX",
  "description": "Retour d'experience sur un projet.",
  "documentIds": ["doc-1"]
}
```

## 8. Espaces metiers

### Rubriques et sous-rubriques

| Rubrique | Sous-rubrique | Endpoint |
| --- | --- | --- |
| Structuration metier | Domaines metiers | `GET /business-spaces/domains` |
| Referentiels metiers | Fournisseurs / projets / applications | `GET /business-spaces/referentials` |
| Documents metiers | Livrables | `GET /documents?space=business&sousRubrique=livrables` |
| Integration SI | Systemes existants | `GET /business-spaces/systems` |
| Structuration | Thematiques | `GET /business-spaces/topics` |
| Multimedia metier | Mediatheque metier | `GET /media?space=business` |

### GET `/business-spaces/domains`

Response :

```json
{
  "data": [
    {
      "id": "dom-1",
      "title": "Retraite",
      "description": "Processus et referentiels lies a la retraite",
      "owner": "Direction Metier",
      "documentsCount": 12
    }
  ]
}
```

### GET `/business-spaces/referentials`

Response :

```json
{
  "data": [
    {
      "id": "ref-1",
      "type": "application",
      "title": "Application pension",
      "owner": "SITD",
      "status": "Actif"
    }
  ]
}
```

## 9. Espaces collaboratifs

### Rubriques

| Rubrique | Sous-rubrique | Endpoint |
| --- | --- | --- |
| Discussions | Forums | `GET /collaboration/forums` |
| Communautes | Groupes thematiques | `GET /collaboration/groups` |
| Echanges | Discussions libres | `GET /collaboration/posts?type=free` |
| Partage | Informations / REX | `GET /collaboration/rex` |
| Animation | Communautes internes | `GET /collaboration/animations` |
| Vie interne | Vie interne | `GET /collaboration/internal-life` |

### GET `/collaboration/forums`

Response :

```json
{
  "data": [
    {
      "id": "forum-1",
      "title": "Forum RH",
      "members": 120,
      "activeThreads": 8,
      "lastActivityAt": "2026-06-08T10:00:00Z"
    }
  ]
}
```

### POST `/collaboration/posts`

Request :

```json
{
  "groupId": "forum-1",
  "text": "Nouveau sujet de discussion",
  "attachments": []
}
```

## 10. Projets

### GET `/projects`

Response :

```json
{
  "data": [
    {
      "id": "prj-1",
      "name": "Portail idees - MVP",
      "status": "En cours",
      "progress": 55,
      "owner": "Direction Digitale",
      "startDate": "2026-01-01",
      "endDate": "2026-09-30"
    }
  ]
}
```

### GET `/projects/{id}/deliverables`

Response :

```json
{
  "data": [
    {
      "id": "del-1",
      "projectId": "prj-1",
      "title": "Cadrage MVP",
      "status": "Valide",
      "documentId": "doc-1"
    }
  ]
}
```

## 11. Organisation & Gouvernance

### Rubriques internes

| Rubrique | Sous-rubrique | Endpoint |
| --- | --- | --- |
| Vue globale | overview | `GET /organization/overview` |
| Organisation | Organigramme | `GET /organization/tree` |
| Organisation | Fiches de postes | `GET /organization/job-descriptions` |
| Organisation | Presentation globale | `GET /organization/presentation` |
| Organisation | Plan strategique | `GET /organization/strategy` |
| Organisation | Referentiels | `GET /documents?space=organization&sousRubrique=referentiels` |
| Referentiel SMI | Politiques SMI | `GET /documents?space=organization&sousRubrique=smi-politiques` |
| Referentiel SMI | Dossiers processus | `GET /documents?space=organization&sousRubrique=smi-dossiers` |
| Referentiel SMI | Audits SMI | `GET /organization/smi-audits` |
| Cartographie | Cartographie | `GET /organization/process-map` |
| Gouvernance | Comites | `GET /organization/committees` |
| Gouvernance | KPI strategiques | `GET /organization/strategic-kpis` |
| Gouvernance | Rapports gouvernance | `GET /documents?space=organization&sousRubrique=governance-reports` |
| Direction | Mot / contenu direction | `GET /organization/direction-message` |

### GET `/organization/tree`

Response :

```json
{
  "name": "CMR",
  "role": "Direction Generale",
  "children": [
    {
      "name": "Direction Digitale",
      "role": "Digital & SI",
      "children": []
    }
  ]
}
```

### GET `/organization/committees`

Response :

```json
{
  "data": [
    {
      "id": "k1",
      "nom": "Comite d'audit",
      "periodicite": "Trimestriel",
      "documents": [
        {
          "id": "doc-pv-1",
          "label": "PV T1 2026",
          "fileName": "PV_Comite_Audit_T1_2026.pdf"
        }
      ]
    }
  ]
}
```

## 12. Annuaire

### GET `/directory/employees`

Query :

```txt
?search=nadia&direction=Direction%20RH&fonction=Responsable
```

Response :

```json
{
  "data": [
    {
      "id": "c2",
      "nom": "Nadia Benali",
      "direction": "Direction RH",
      "fonction": "Responsable Developpement RH",
      "email": "nadia.benali@cmr.ma",
      "tel": "+212 5 00 00 00 02",
      "localisation": "Rabat",
      "managerId": null,
      "managerLabel": "Direction RH",
      "orgPath": ["CMR", "Direction RH", "Nadia Benali"]
    }
  ]
}
```

## 13. Reglementation

### Rubriques et sous-rubriques

| Rubrique | Sous-rubrique | Endpoint |
| --- | --- | --- |
| Referentiels reglementaires | Textes officiels | `GET /regulation/texts` |
| Structuration | Thematiques | `GET /regulation/topics` |
| Referentiels internes | Procedures | `GET /documents?space=regulation&sousRubrique=procedures` |
| Referentiels internes | Notes / guides | `GET /documents?space=regulation&sousRubrique=notes` |
| Recherche | Moteur de recherche | `GET /regulation/search` |
| GED | Archivage | `GET /documents?space=regulation&sousRubrique=ged` |
| Gouvernance | Gestion des contenus | `GET /regulation/content-management` |
| Validation | Workflow validation | `GET /regulation/workflows` |
| Tracabilite | Historique | `GET /regulation/history` |
| Archivage | Documents actifs / archives | `GET /regulation/archives` |

### GET `/regulation/texts`

Response :

```json
{
  "data": [
    {
      "id": "reg-1",
      "title": "Loi relative aux regimes de retraite",
      "type": "Loi",
      "theme": "Retraite",
      "publicationDate": "2026-01-10",
      "documentId": "doc-reg-1"
    }
  ]
}
```

### GET `/regulation/workflows`

Response :

```json
{
  "data": [
    {
      "id": "wf-1",
      "contentId": "reg-1",
      "title": "Validation note interne",
      "status": "En validation",
      "currentStep": "Juridique",
      "assignedTo": "u2"
    }
  ]
}
```

## 14. Achats

### GET `/purchases`

Response :

```json
{
  "data": [
    {
      "id": "ach-1",
      "title": "Appel d'offres materiel informatique",
      "type": "Appel d'offres",
      "status": "Ouvert",
      "deadline": "2026-07-01",
      "documentId": "doc-ach-1"
    }
  ]
}
```

## 15. RSE

### Rubriques et sous-rubriques

| Rubrique | Sous-rubrique | Endpoint |
| --- | --- | --- |
| Referentiels RSE | Politiques | `GET /documents?space=rse&sousRubrique=politiques` |
| Referentiels RSE | Chartes | `GET /documents?space=rse&sousRubrique=chartes` |
| Referentiels RSE | Codes ethiques | `GET /documents?space=rse&sousRubrique=codes` |
| Referentiels RSE | Guides pratiques | `GET /documents?space=rse&sousRubrique=guides` |
| Reporting | Rapports RSE | `GET /rse/reports` |
| Initiatives | Actions RSE | `GET /rse/actions` |
| Communication | Information RSE | `GET /rse/news` |
| Participation | Idees | `GET /rse/ideas` |
| Participation | Contributions | `GET /rse/contributions` |
| Participation | Retours d'experience | `GET /rse/rex` |
| Structuration | Axes strategiques | `GET /rse/axes` |
| Interactivite | Echanges | `GET /rse/exchanges` |
| Interactivite | Sensibilisation | `GET /rse/awareness` |
| Interactivite | Animation | `GET /rse/animations` |

### GET `/rse/actions`

Response :

```json
{
  "data": [
    {
      "id": "rse-act-1",
      "title": "Operation economie d'energie",
      "axis": "Environnement",
      "status": "En cours",
      "progress": 40,
      "owner": "RSE"
    }
  ]
}
```

### POST `/rse/ideas`

Request :

```json
{
  "title": "Tri selectif dans les espaces communs",
  "description": "Installer des points de collecte.",
  "axis": "Environnement"
}
```

## 16. QSE

### Rubriques et sous-rubriques

| Rubrique | Sous-rubrique | Endpoint |
| --- | --- | --- |
| Referentiels QSE | Politiques | `GET /documents?space=qse&sousRubrique=politiques` |
| Referentiels QSE | Referentiels | `GET /documents?space=qse&sousRubrique=referentiels` |
| SMI | Documents SMI | `GET /documents?space=qse&sousRubrique=docs` |
| Sensibilisation | Contenus pedagogiques | `GET /qse/awareness-content` |
| Pilotage | Audits | `GET /qse/audits` |
| Pilotage | Resultats d'audits | `GET /qse/audit-results` |
| Pilotage | Indicateurs QSE | `GET /qse/indicators` |
| Pilotage | Statistiques | `GET /qse/stats` |
| Participation | Boite a idees | `GET /qse/ideas` |
| Participation | Contributions | `GET /qse/contributions` |
| Participation | Remontees terrain | `GET /qse/field-reports` |
| Culture QSE | Dynamique QSE | `GET /qse/culture` |
| Culture QSE | Portail sensibilisation | `GET /qse/culture-portal` |

### GET `/qse/audits`

Response :

```json
{
  "data": [
    {
      "id": "audit-qse-1",
      "title": "Audit processus RH",
      "status": "Planifie",
      "date": "2026-06-20",
      "auditor": "Equipe QSE",
      "resultStatus": null
    }
  ]
}
```

### POST `/qse/field-reports`

Request :

```json
{
  "title": "Non-conformite terrain",
  "description": "Description de la remontee.",
  "priority": "Moyenne",
  "location": "Siege"
}
```

## 17. Espace SI / SITD

### Rubriques et sous-rubriques

| Rubrique | Sous-rubrique | Endpoint |
| --- | --- | --- |
| Securite du SI | Sensibilisation cybersecurite | `GET /sitd/security-awareness` |
| Securite du SI | Modules e-learning | `GET /sitd/elearning-modules` |
| Securite du SI | Supports pedagogiques | `GET /sitd/supports` |
| Securite du SI | Campagnes SI | `GET /sitd/campaigns` |
| Referentiel IT | Bonnes pratiques IT | `GET /sitd/best-practices` |
| Integration SI | GLPI | `GET /sitd/glpi-tickets` |
| Pilotage SI | Tableaux de bord SI | `GET /sitd/dashboards` |
| Pilotage SI | Enquetes de satisfaction | `GET /sitd/surveys` |
| Contrats de services | SLA | `GET /sitd/sla` |
| SEAU | Repertoire des outils | `GET /sitd/seau/tools` |
| SEAU | Documentation d'exploitation | `GET /documents?space=sitd&sousRubrique=documentation-exploitation` |

### GET `/sitd/glpi-tickets`

Response :

```json
{
  "data": [
    {
      "id": "glpi-1",
      "title": "Incident poste utilisateur",
      "priority": "Haute",
      "status": "Ouvert",
      "createdAt": "2026-06-08T09:00:00Z",
      "assignedTo": "Support SI"
    }
  ]
}
```

### GET `/sitd/sla`

Response :

```json
{
  "data": [
    {
      "id": "sla-1",
      "service": "Support poste de travail",
      "target": "4h",
      "current": "3h20",
      "status": "Respecte"
    }
  ]
}
```

## 18. Audit, Risque & Conformite

### Rubriques et sous-rubriques

| Rubrique | Sous-rubrique | Endpoint |
| --- | --- | --- |
| Audit interne | Charte Audit | `GET /documents?space=arc&sousRubrique=charte-audit` |
| Audit interne | Plan d'audit | `GET /arc/audit-plans` |
| Audit interne | Rapports & PV | `GET /documents?space=arc&sousRubrique=rapports-pv` |
| Risque & conformite | Presentation des activites | `GET /arc/risk-compliance/overview` |
| Risque & conformite | Politiques & chartes | `GET /documents?space=arc&sousRubrique=politiques-chartes` |
| Risque & conformite | CNDP | `GET /arc/cndp` |
| Risque & conformite | PCA | `GET /arc/pca` |
| Controle permanent | Plans annuels | `GET /arc/permanent-control/plans` |
| Controle permanent | Manuels de controle | `GET /documents?space=arc&sousRubrique=manuels-controle` |
| Controle permanent | SMACAF | `GET /arc/smacaf` |
| Sensibilisation | Culture risque & conformite | `GET /arc/awareness` |

### GET `/arc/audit-plans`

Response :

```json
{
  "data": [
    {
      "id": "plan-1",
      "title": "Plan d'audit annuel 2026",
      "year": 2026,
      "status": "Valide",
      "missionsCount": 12,
      "documentId": "doc-plan-1"
    }
  ]
}
```

### GET `/arc/cndp`

Response :

```json
{
  "data": [
    {
      "id": "cndp-1",
      "title": "Registre des traitements",
      "status": "A jour",
      "owner": "Conformite",
      "documentId": "doc-cndp-1"
    }
  ]
}
```

## 19. Mediatheque

### Rubriques et sous-rubriques

| Rubrique | Sous-rubrique | Endpoint |
| --- | --- | --- |
| Acces central | Mediatheque | `GET /media/overview` |
| Phototheque | Images | `GET /media?type=image` |
| Videotheque | Videos | `GET /media?type=video` |
| Structuration | Categories | `GET /media/categories` |
| Acces contenus | Consultation | `GET /media/consultation` |
| Acces contenus | Telechargement | `GET /media/downloads` |
| Integration | Espaces intranet | `GET /media/integrations` |

### GET `/media?type=image`

Response :

```json
{
  "data": [
    {
      "id": "media-1",
      "type": "image",
      "title": "Signature contrat",
      "category": "Communication",
      "thumbnailUrl": "images/intranet/news_contract.jpg",
      "fileUrl": "images/intranet/news_contract.jpg",
      "tags": ["contrat", "gouvernance"]
    }
  ]
}
```

### GET `/media/categories`

Response :

```json
{
  "data": [
    {
      "id": "cat-1",
      "name": "Communication",
      "type": "image",
      "itemsCount": 12
    }
  ]
}
```

## 20. Innovation

### Rubriques

| Rubrique | Endpoint |
| --- | --- |
| Boite a idees | `GET /innovation/ideas` |
| Suivi des projets | `GET /innovation/projects` |
| Veille | `GET /innovation/feed` |
| Interactions sociales | `GET /innovation/social` |
| Ateliers / Challenges | `GET /innovation/events` |
| Axes d'innovation | `GET /innovation/axes` |
| OpenLab / Portefeuille | `GET /innovation/openlab` |
| ExcelWay | `GET /innovation/excelway` |
| Gestion des droits | `GET /innovation/access` |

### GET `/innovation/ideas`

Response :

```json
{
  "data": [
    {
      "id": "i1",
      "title": "Assistant IA pour tri des demandes",
      "axis": "Data/IA",
      "score": 42,
      "desc": "Automatiser le tri des demandes.",
      "comments": 5
    }
  ]
}
```

### POST `/innovation/ideas/{id}/vote`

Request :

```json
{
  "delta": 1
}
```

### GET `/innovation/events`

Response :

```json
{
  "data": [
    {
      "id": "inn-evt-1",
      "title": "Atelier Design Sprint",
      "date": "2026-05-05",
      "location": "Salle Innovation",
      "registrationOpen": true
    }
  ]
}
```

## 21. Actualites

### GET `/news`

Query :

```txt
?category=Digital&search=signature&page=1&limit=12
```

Response :

```json
{
  "data": [
    {
      "id": 1,
      "title": "Signature du nouveau contrat programme Etat-CMR 2026-2028",
      "category": "Strategie",
      "date": "2026-04-22",
      "author": "Direction Generale",
      "image": "images/intranet/news_contract.jpg",
      "excerpt": "La CMR et l'Etat marocain ont officialise leur partenariat strategique.",
      "tags": ["Strategie", "Gouvernance"]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 10
  }
}
```

### GET `/news/{id}`

Response :

```json
{
  "id": 1,
  "title": "Signature du nouveau contrat programme Etat-CMR 2026-2028",
  "category": "Strategie",
  "date": "2026-04-22",
  "author": "Direction Generale",
  "image": "images/intranet/news_contract.jpg",
  "excerpt": "Resume court.",
  "content": ["Paragraphe 1", "Paragraphe 2"],
  "tags": ["Strategie", "Gouvernance"]
}
```

## 22. Notifications

### GET `/notifications`

Response :

```json
{
  "data": [
    {
      "id": 1,
      "type": "document",
      "title": "Nouveau document publie",
      "desc": "La procedure RH 2026 est disponible.",
      "time": "Il y a 10 min",
      "date": "2026-06-08",
      "unread": true,
      "targetType": "view",
      "targetId": "km"
    }
  ]
}
```

### PATCH `/notifications/{id}/read`

Response :

```json
{
  "id": 1,
  "unread": false
}
```

## 23. Agenda interne

### GET `/events`

Query :

```txt
?scope=cmr&from=2026-06-01&to=2026-06-30&type=reunion
```

Response :

```json
{
  "data": [
    {
      "id": "evt-1",
      "title": "Comite de pilotage",
      "type": "Reunion",
      "scope": "cmr",
      "startAt": "2026-06-08T14:00:00Z",
      "endAt": "2026-06-08T15:30:00Z",
      "location": "Salle A",
      "onlineUrl": "https://teams.microsoft.com/...",
      "description": "Point de pilotage mensuel"
    }
  ]
}
```

## 24. Administration & Pilotage

### Rubriques et sous-rubriques

| Rubrique | Sous-rubrique | Endpoint |
| --- | --- | --- |
| Utilisateurs | Gestion comptes | `GET /admin/users` |
| Habilitations | Roles | `GET /admin/roles` |
| Acces | Droits d'acces | `GET /admin/access` |
| Pilotage usage | Usage plateforme | `GET /admin/usage` |
| Pilotage reporting | Reporting | `GET /admin/reporting` |
| Contenus CMS | CMS | `GET /admin/cms` |
| Securite | Acces restreint | `POST /admin/authenticate` |
| Tracabilite | Journal des actions | `GET /admin/logs` |
| Performance | Performance | `GET /admin/performance` |

### GET `/admin/users`

Response :

```json
{
  "data": [
    {
      "id": "u1",
      "name": "Admin 01",
      "email": "admin01@cmr.ma",
      "profil": "Administrateur",
      "status": "Actif"
    }
  ]
}
```

### POST `/admin/users`

Request :

```json
{
  "name": "Utilisateur 13",
  "email": "user13@cmr.ma",
  "profil": "Utilisateur"
}
```

### PUT `/admin/users/{id}/role`

Request :

```json
{
  "role": "Contributeur"
}
```

### PUT `/admin/access`

Request :

```json
{
  "userId": "u2",
  "scope": "KM",
  "level": "Acces"
}
```

### GET `/admin/logs`

Response :

```json
{
  "data": [
    {
      "id": "l1",
      "kind": "access",
      "text": "Acces attribue: u2 -> KM",
      "date": "2026-04-01",
      "userId": "u1"
    }
  ]
}
```

## 25. Detail flash info

### GET `/flash-infos/{id}`

Response :

```json
{
  "id": "cmr-actu-contrat",
  "category": "CMR Actualites",
  "title": "Detail Flash Info",
  "text": "Signature du nouveau contrat programme Etat-CMR.",
  "content": [
    "Paragraphe detail 1",
    "Paragraphe detail 2"
  ],
  "publishedAt": "2026-04-22T09:00:00Z"
}
```

## 26. Message DG

### GET `/dg-message`

Response :

```json
{
  "id": "dg-2026-01",
  "title": "Message du Directeur General",
  "author": "Direction Generale",
  "publishedAt": "2026-06-08T09:00:00Z",
  "content": ["Message paragraphe 1", "Message paragraphe 2"],
  "read": false
}
```

### PATCH `/dg-message/read`

Response :

```json
{
  "success": true,
  "read": true
}
```

## 27. Endpoints transverses indispensables

### Upload document

`POST /documents`

Request :

```json
{
  "title": "Document titre",
  "space": "km",
  "rubrique": "referentiels",
  "sousRubrique": "politiques",
  "tags": ["tag1", "tag2"],
  "fileUploadField": "file"
}
```

### Recherche globale

`GET /search?q=contrat&space=all`

Response :

```json
{
  "data": [
    {
      "id": "result-1",
      "type": "news",
      "title": "Signature contrat programme",
      "description": "Actualite CMR",
      "space": "actualites",
      "targetUrl": "/news/1"
    }
  ]
}
```

### Favoris utilisateur

`GET /users/me/favorites`

Response :

```json
{
  "data": [
    {
      "id": "fav-1",
      "targetType": "application",
      "targetId": "app-rh",
      "title": "Portail RH"
    }
  ]
}
```

### Permissions par espace

`GET /users/me/permissions`

Response :

```json
{
  "permissions": [
    {
      "space": "km",
      "canRead": true,
      "canCreate": true,
      "canUpdate": false,
      "canDelete": false,
      "canPublish": false
    }
  ]
}
```

## 28. Resume rapide des routes par espace

| Espace | Prefixe backend |
| --- | --- |
| Accueil | `/dashboard`, `/flash-infos` |
| Mes Applications | `/applications` |
| RH & Mobilite | `/hr/*`, `/surveys?space=rh` |
| CMR Academy | `/academy/*` |
| Vie Sociale | `/social-life/*` |
| Communication interne | `/internal-communication/*` |
| Knowledge Management | `/km/*`, `/documents?space=km` |
| Espaces metiers | `/business-spaces/*` |
| Espaces collaboratifs | `/collaboration/*` |
| Projets | `/projects/*` |
| Organisation & Gouvernance | `/organization/*` |
| Annuaire | `/directory/*` |
| Reglementation | `/regulation/*`, `/documents?space=regulation` |
| Achats | `/purchases/*` |
| RSE | `/rse/*`, `/documents?space=rse` |
| QSE | `/qse/*`, `/documents?space=qse` |
| SITD | `/sitd/*`, `/documents?space=sitd` |
| ARC | `/arc/*`, `/documents?space=arc` |
| Mediatheque | `/media/*` |
| Innovation | `/innovation/*` |
| Actualites | `/news/*` |
| Notifications | `/notifications/*` |
| Agenda interne | `/events/*` |
| Administration | `/admin/*` |
