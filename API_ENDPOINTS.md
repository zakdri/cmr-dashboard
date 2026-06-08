# Contrat API backend - CMR Dashboard

Pour la matrice complete par espace, rubrique et sous-rubrique, voir aussi `API_RUBRIQUES_DETAIL.md`.

Base URL conseillee :

```txt
http://localhost:8000/api/v1
```

Convention de reponse liste :

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

Convention erreur :

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Champ obligatoire manquant",
    "details": {
      "field": "title"
    }
  }
}
```

## 1. Authentification

### POST `/auth/login`

Connexion utilisateur.

Request :

```json
{
  "email": "admin01@cmr.ma",
  "password": "secret"
}
```

Response :

```json
{
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token",
  "user": {
    "id": "u1",
    "name": "Admin 01",
    "email": "admin01@cmr.ma",
    "profil": "Administrateur",
    "roles": ["Administrateur"]
  }
}
```

### GET `/auth/me`

Utilisateur connecte.

Response :

```json
{
  "id": "u1",
  "name": "Admin 01",
  "email": "admin01@cmr.ma",
  "profil": "Administrateur",
  "roles": ["Administrateur"],
  "permissions": ["admin:read", "admin:write", "content:publish"]
}
```

### POST `/auth/logout`

Response :

```json
{
  "success": true
}
```

## 2. Dashboard accueil

### GET `/dashboard`

Donnees globales de la page d'accueil : carrousel, flash info, widgets.

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
  "quickStats": {
    "unreadNotifications": 3,
    "openTasks": 5,
    "upcomingEvents": 4
  }
}
```

## 3. Actualites et communication interne

### GET `/news`

Query params :

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
      "tags": ["Strategie", "Gouvernance", "Contrat Programme"],
      "published": true
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
  "excerpt": "La CMR et l'Etat marocain ont officialise leur partenariat strategique.",
  "content": [
    "La CMR et l'Etat marocain ont procede a la signature du nouveau contrat programme.",
    "Le contrat prevoit le renforcement de la gouvernance institutionnelle."
  ],
  "tags": ["Strategie", "Gouvernance", "2026-2028"]
}
```

### POST `/news`

Creation d'une actualite depuis le CMS.

Request :

```json
{
  "title": "Nouvelle procedure RH 2026",
  "category": "RH",
  "author": "Ressources Humaines",
  "image": "images/intranet/slider1.png",
  "excerpt": "La nouvelle procedure RH est disponible.",
  "content": ["Paragraphe 1", "Paragraphe 2"],
  "tags": ["RH", "Procedure"],
  "published": true
}
```

Response :

```json
{
  "id": 11,
  "title": "Nouvelle procedure RH 2026",
  "published": true,
  "createdAt": "2026-06-08T10:00:00Z"
}
```

### PATCH `/news/{id}`

Request :

```json
{
  "title": "Titre modifie",
  "published": false
}
```

Response :

```json
{
  "success": true
}
```

### DELETE `/news/{id}`

Response :

```json
{
  "success": true
}
```

## 4. Notifications

### GET `/notifications`

Query params :

```txt
?filter=unread&type=document&page=1&limit=20
```

Response :

```json
{
  "data": [
    {
      "id": 1,
      "type": "document",
      "title": "Nouveau document publie",
      "desc": "La procedure RH 2026 est maintenant disponible dans KM.",
      "time": "Il y a 10 min",
      "date": "2026-06-08",
      "unread": true,
      "targetType": "view",
      "targetId": "km"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 15
  }
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

### PATCH `/notifications/read-all`

Response :

```json
{
  "success": true,
  "updated": 3
}
```

## 5. Annuaire et organisation

### GET `/directory/employees`

Query params :

```txt
?search=nadia&direction=Direction%20RH&fonction=Responsable&page=1&limit=20
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
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

### GET `/directory/employees/{id}`

Response :

```json
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
```

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
      "children": [
        {
          "name": "Data & Analytics",
          "role": "BI / Data",
          "children": []
        }
      ]
    }
  ]
}
```

### GET `/organization/job-descriptions`

Response :

```json
{
  "data": [
    {
      "id": "p1",
      "titre": "Chef de projet",
      "famille": "Digital",
      "missions": ["Piloter le delivery", "Coordonner les parties prenantes"],
      "competences": ["Gestion de projet", "Communication"],
      "profil": ["Bac+5", "3+ ans"]
    }
  ]
}
```

## 6. Documents, referentiels et GED

### GET `/documents`

Endpoint generique pour KM, reglementation, QSE, RSE, audit, metiers.

Query params :

```txt
?space=km&category=referentiels&search=charte&page=1&limit=20
```

Response :

```json
{
  "data": [
    {
      "id": "doc-1",
      "space": "km",
      "category": "referentiels",
      "title": "Charte de gouvernance",
      "fileName": "Charte_Gouvernance.pdf",
      "mimeType": "application/pdf",
      "size": 245760,
      "version": "1.0",
      "status": "Publie",
      "updatedAt": "2026-04-10T09:00:00Z",
      "downloadUrl": "/api/v1/documents/doc-1/download"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

### GET `/documents/{id}`

Response :

```json
{
  "id": "doc-1",
  "space": "km",
  "category": "referentiels",
  "title": "Charte de gouvernance",
  "fileName": "Charte_Gouvernance.pdf",
  "description": "Document de reference.",
  "tags": ["Gouvernance", "Reference"],
  "version": "1.0",
  "status": "Publie",
  "downloadUrl": "/api/v1/documents/doc-1/download"
}
```

### POST `/documents`

Upload multipart/form-data :

```txt
file=<binary>
space=km
category=referentiels
title=Charte de gouvernance
tags=Gouvernance,Reference
```

Response :

```json
{
  "id": "doc-1",
  "title": "Charte de gouvernance",
  "status": "Publie",
  "downloadUrl": "/api/v1/documents/doc-1/download"
}
```

### GET `/documents/{id}/download`

Retourne le fichier binaire.

## 7. Agenda interne

### GET `/events`

Query params :

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
      "description": "Point de pilotage mensuel",
      "canRegister": false
    }
  ]
}
```

### POST `/events/{id}/registrations`

Inscription a un evenement.

Request :

```json
{
  "userId": "u1"
}
```

Response :

```json
{
  "eventId": "evt-1",
  "userId": "u1",
  "status": "registered"
}
```

## 8. RH

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
      "mission": "Piloter les projets de Business Intelligence de la DSI.",
      "profil": ["Bac+5 en Informatique", "Minimum 5 ans d'experience"]
    }
  ]
}
```

### GET `/hr/job-offers/{id}`

Response :

```json
{
  "id": "bi",
  "titre": "Chef de Projet BI (H/F)",
  "direction": "Direction des Systemes d'Information",
  "lieu": "Casablanca",
  "niveau": "Cadre",
  "date": "2026-05-15",
  "mission": "Piloter les projets de Business Intelligence de la DSI.",
  "profil": ["Bac+5 en Informatique", "Minimum 5 ans d'experience"]
}
```

### POST `/hr/job-offers/{id}/applications`

Request multipart/form-data :

```txt
fullName=Nadia Benali
email=nadia.benali@cmr.ma
phone=+212 6 00 00 00 00
motivation=Je souhaite postuler...
cv=<binary>
```

Response :

```json
{
  "id": "app-1",
  "offerId": "bi",
  "status": "submitted",
  "submittedAt": "2026-06-08T10:00:00Z"
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
      "status": "Disponible"
    }
  ]
}
```

## 9. Humeur du jour

### GET `/mood/today`

Response :

```json
{
  "date": "2026-06-08",
  "alreadyVoted": false,
  "myMood": null,
  "stats": [
    { "mood": "great", "label": "Excellent", "percent": 45, "count": 45 },
    { "mood": "good", "label": "Bien", "percent": 30, "count": 30 },
    { "mood": "neutral", "label": "Neutre", "percent": 15, "count": 15 },
    { "mood": "bad", "label": "Pas bien", "percent": 7, "count": 7 },
    { "mood": "terrible", "label": "Difficile", "percent": 3, "count": 3 }
  ]
}
```

### POST `/mood/today`

Request :

```json
{
  "mood": "good"
}
```

Response :

```json
{
  "date": "2026-06-08",
  "myMood": "good",
  "stats": [
    { "mood": "great", "label": "Excellent", "percent": 44, "count": 45 },
    { "mood": "good", "label": "Bien", "percent": 31, "count": 32 }
  ]
}
```

## 10. Innovation

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
      "desc": "Automatiser le tri/categorisation des demandes.",
      "comments": 5,
      "createdBy": "u2",
      "createdAt": "2026-04-01T09:00:00Z"
    }
  ]
}
```

### POST `/innovation/ideas`

Request :

```json
{
  "title": "Assistant IA pour tri des demandes",
  "axis": "Data/IA",
  "desc": "Automatiser le tri des demandes GLPI et mails."
}
```

Response :

```json
{
  "id": "i4",
  "title": "Assistant IA pour tri des demandes",
  "axis": "Data/IA",
  "score": 0,
  "comments": 0
}
```

### POST `/innovation/ideas/{id}/vote`

Request :

```json
{
  "delta": 1
}
```

Response :

```json
{
  "id": "i1",
  "score": 43
}
```

### GET `/innovation/projects`

Response :

```json
{
  "data": [
    {
      "id": "prj-1",
      "name": "Portail idees - MVP",
      "status": "En cours",
      "progress": 55
    }
  ]
}
```

### GET `/innovation/feed`

Response :

```json
{
  "data": [
    {
      "id": "feed-1",
      "title": "Tendances IA 2026",
      "meta": "Article - 2j",
      "source": "Veille",
      "url": null
    }
  ]
}
```

## 11. Espaces collaboratifs

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
      "lastPostAt": "2026-06-08T09:00:00Z"
    }
  ]
}
```

### GET `/collaboration/posts`

Query params :

```txt
?groupId=forum-1&page=1&limit=20
```

Response :

```json
{
  "data": [
    {
      "id": "post-1",
      "groupId": "forum-1",
      "author": {
        "id": "u2",
        "name": "Sarah B."
      },
      "text": "Quelles sont vos pratiques pour maintenir l'equilibre travail / vie perso ?",
      "likes": 14,
      "comments": 3,
      "createdAt": "2026-06-08T08:00:00Z"
    }
  ]
}
```

### POST `/collaboration/posts`

Request :

```json
{
  "groupId": "forum-1",
  "text": "Nouveau sujet de discussion"
}
```

Response :

```json
{
  "id": "post-2",
  "groupId": "forum-1",
  "text": "Nouveau sujet de discussion",
  "likes": 0,
  "comments": 0
}
```

## 12. Mediatheque

### GET `/media`

Query params :

```txt
?type=image&search=contrat&category=communication&page=1&limit=20
```

Response :

```json
{
  "data": [
    {
      "id": "media-1",
      "type": "image",
      "title": "Signature du contrat programme",
      "category": "Communication",
      "thumbnailUrl": "images/intranet/news_contract.jpg",
      "fileUrl": "images/intranet/news_contract.jpg",
      "tags": ["contrat", "gouvernance"],
      "createdAt": "2026-04-22T09:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}
```

### POST `/media`

Upload multipart/form-data :

```txt
file=<binary>
type=image
title=Photo evenement
category=Communication
tags=event,cmr
```

Response :

```json
{
  "id": "media-2",
  "type": "image",
  "title": "Photo evenement",
  "fileUrl": "/uploads/media-2.jpg",
  "thumbnailUrl": "/uploads/media-2-thumb.jpg"
}
```

## 13. Administration

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

Response :

```json
{
  "id": "u4",
  "name": "Utilisateur 13",
  "email": "user13@cmr.ma",
  "profil": "Utilisateur",
  "status": "Actif"
}
```

### PATCH `/admin/users/{id}`

Request :

```json
{
  "profil": "Contributeur",
  "status": "Actif"
}
```

Response :

```json
{
  "success": true
}
```

### GET `/admin/roles`

Response :

```json
{
  "data": [
    {
      "id": "r_admin",
      "name": "Administrateur",
      "desc": "Tous droits admin."
    },
    {
      "id": "r_contrib",
      "name": "Contributeur",
      "desc": "Publier / modifier contenus."
    }
  ]
}
```

### PUT `/admin/users/{id}/role`

Request :

```json
{
  "role": "Contributeur"
}
```

Response :

```json
{
  "userId": "u2",
  "role": "Contributeur"
}
```

### GET `/admin/access`

Response :

```json
{
  "data": [
    {
      "userId": "u2",
      "scope": "KM",
      "level": "Acces"
    }
  ]
}
```

### PUT `/admin/access`

Request :

```json
{
  "userId": "u2",
  "scope": "Mediatheque",
  "level": "Restreint"
}
```

Response :

```json
{
  "userId": "u2",
  "scope": "Mediatheque",
  "level": "Restreint"
}
```

### GET `/admin/cms`

Response :

```json
{
  "data": [
    {
      "id": "c1",
      "title": "Page - Accueil bannière",
      "status": "Publie",
      "updated": "2026-04-01"
    }
  ]
}
```

### POST `/admin/cms`

Request :

```json
{
  "title": "Bloc - Communication interne",
  "status": "Brouillon",
  "contentType": "html",
  "content": "<p>Contenu</p>"
}
```

Response :

```json
{
  "id": "c3",
  "title": "Bloc - Communication interne",
  "status": "Brouillon"
}
```

### GET `/admin/logs`

Query params :

```txt
?kind=access&page=1&limit=30
```

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
  ],
  "meta": {
    "page": 1,
    "limit": 30,
    "total": 1
  }
}
```

## 14. KPI et reporting

### GET `/admin/usage`

Response :

```json
{
  "visits": 12450,
  "activeUsers": 820,
  "documentsDownloaded": 340,
  "topSections": [
    {
      "section": "Actualites",
      "views": 3200
    },
    {
      "section": "KM",
      "views": 2100
    }
  ]
}
```

### GET `/admin/reporting`

Response :

```json
{
  "kpis": [
    {
      "code": "SATISFACTION",
      "label": "Satisfaction interne",
      "value": 78,
      "unit": "%"
    },
    {
      "code": "PARTICIPATION",
      "label": "Participation enquete",
      "value": 85,
      "unit": "%"
    }
  ]
}
```

## 15. Mapping frontend vers backend

| Donnee frontend actuelle | Endpoint cible |
| --- | --- |
| `cmrNewsItems` | `GET /dashboard` ou `GET /flash-infos` |
| `actuData` | `GET /news`, `GET /news/{id}` |
| `notifData` | `GET /notifications` |
| `annuaireData` | `GET /directory/employees` |
| `orgData` | `GET /organization/tree` |
| `postesData` | `GET /organization/job-descriptions` |
| `offresData` | `GET /hr/job-offers` |
| `ideas` | `GET /innovation/ideas` |
| `adminUsers` | `GET /admin/users` |
| `adminRoles` | `GET /admin/roles` |
| `adminAccess` | `GET /admin/access` |
| `adminLogs` | `GET /admin/logs` |
| `mediaImages`, `mediaVideos` | `GET /media` |

## 16. Ordre d'integration conseille

1. Integrer `GET /news`, `GET /news/{id}` et `GET /notifications`.
2. Integrer `GET /directory/employees` et `GET /organization/tree`.
3. Integrer `GET /documents` comme endpoint commun pour KM, GED, QSE, RSE, reglementation.
4. Integrer les actions utilisateur : humeur, idees, votes, candidatures.
5. Integrer l'administration : users, roles, access, CMS, logs.
