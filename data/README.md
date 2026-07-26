# Organisation fonctionnelle des données

Les données sont organisées dans `data/rubriques/` selon la structure métier
de l’application.

## Principes

- Une rubrique principale possède son propre dossier au nom explicite.
- Chaque sous-rubrique visible possède un fichier JSON distinct dans le dossier
  `sous-rubriques/`.
- Les fichiers transverses portent un nom qui décrit directement leur rôle :
  `configuration-generale.json`, `menu-principal.json`,
  `liste-des-notifications.json`, etc.
- Les données d’une même sous-rubrique sont regroupées ensemble. Elles ne sont
  plus découpées arbitrairement par tableau, carte ou propriété technique.

Exemple :

```text
data/rubriques/ressources-humaines/
├── manifest.json
├── bundle.json
├── configuration-generale.json
└── sous-rubriques/
    ├── ma-carriere.json
    ├── documents-ressources-humaines.json
    ├── offres-emploi.json
    ├── mobilite-interne.json
    ├── enquetes-ressources-humaines.json
    └── forums-et-groupes.json
```

Autre exemple :

```text
data/rubriques/systemes-information-transformation-digitale/
├── configuration-generale.json
├── cartographie-fonctionnelle.json
└── sous-rubriques/
    ├── sensibilisation-cybersecurite.json
    ├── modules-elearning-securite.json
    ├── politiques-smsi.json
    ├── procedures-smsi.json
    ├── referentiel-it-et-bonnes-pratiques.json
    └── contrats-de-services-et-sla.json
```

## Manifestes

Le `manifest.json` de chaque rubrique sert uniquement de sommaire. Il associe
une description fonctionnelle à chaque fichier :

```json
{
  "rubrique": "ressources-humaines",
  "module": "rh",
  "fichiers": [
    {
      "contenu": "Offres d’emploi",
      "fichier": "sous-rubriques/offres-emploi.json"
    }
  ]
}
```

## Bundles générés

Le fichier `bundle.json` de chaque rubrique est généré automatiquement. Il
regroupe les fichiers fonctionnels afin que l’application ne fasse qu’une
requête HTTP par rubrique.

Ne pas modifier un `bundle.json` manuellement. Après une modification des
fichiers métier ou d’un manifeste, exécuter :

```bash
npm run data:build
```

Cette commande est également exécutée automatiquement avant `npm run dev` et
`npm run build`.
