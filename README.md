# Octogone API - backend

## API

La documentation a été réalisée avec l’outil swagger-jsdoc [https://www.npmjs.com/package/swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)). Nous avons conçu pour répondre à la demande le model suivant (Waste) et nous avons mis à disposition différents Endpoint listés à la suite.

Utilisation d’une base de données Mongo Atlas —> cloud

## Dépendances

- Typescript : Typage des données
- cors : Autorisation des communications entrantes
- dotenv : Gestions des variables d’environnement
- express : Framework nodejs facilitant la création de server
- mongoose : ORM MongoDB Atlas
- morgan : Middleware de log
- swagger-jsdoc : Utilisation des commentaires pour l’import de données Swagger
- swagger-ui-express : Interface swagger

## Model

- Waste
    
    *_id : id technique en base de données de l'élément*
    
    *label : libellé du déchet alimentaire.*
    
    *issuing_company : compagnie émettrice du déchet alimentaire.*
    
    *quantity : quantité en kg de déchet alimentaire.*
    
    *expiration_date : date limite de consommation du produit.*
    
    *is_collected : le déchet alimentaire est-il récupérable --> limiter le gaspillage alimentaire.*
    
    + timestamp : createdAt et updateAt (utilisés à titre de logs notamment).
    
## Endpoints 
  
  | HTTP Verb | Url | Description | Paramètres | Body |
| --- | --- | --- | --- | --- |
| GET | /wastes | Récupère l’ensemble des déchets alimentaires. |  |  |
| GET BY ID | /wastes/:id | Récupère les informations d’un seul déchet, par son ID en base de données | ID en base de données. mongodb —> _id |  |
| POST | /wastes | Ajoute un déchet alimentaire. |  | label, issuing_company, quantity, expiration_date, is_collected |
| UPDATE | /wastes/:id | Modifie le champs is_collected, afin de garantir la disponibilité du produit. | ID en base de données. mongodb —> _id | is_collected |
| DELETE | /wastes/:id | Supprime un déchet alimentaire. | ID en base de données. mongodb —> _id |  |
