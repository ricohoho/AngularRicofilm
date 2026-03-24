# RicoFilm — Frontend Angular

Application de découverte et streaming de films. Interface Angular connectée à un backend Node.js via proxy Nginx.

## Stack technique

- **Angular 15.1.3** — module-based (AppModule), pas de standalone components
- **PrimeNG 15.2.0** — bibliothèque UI principale (Table, Dialog, DataView, Toast, etc.)
- **PrimeFlex 3.2.1** — CSS grid/utilitaires
- **RxJS ~7.5.0** — programmation réactive (pas de NgRx)
- **@angular/youtube-player** — intégration trailers YouTube
- **TypeScript ~4.9.5**

## Architecture des répertoires

```
src/app/
├── _helpers/
│   └── http.interceptor.ts       # Injection token Bearer + gestion 401
├── _services/
│   ├── auth.service.ts           # Login / Register / Logout
│   ├── user.service.ts           # CRUD utilisateurs et rôles
│   ├── storage.service.ts        # Wrapper sessionStorage (clé : auth-user)
│   ├── navbars.service.ts        # État de la navbar (RxJS Subject)
│   └── redirect.service.ts       # Navigation centralisée (goHome, goLogin, etc.)
├── _shared/
│   ├── event-bus.service.ts      # Émetteur global (événement logout)
│   └── event.class.ts            # Modèle d'événement
├── authentification/
│   ├── home/                     # Page d'accueil (route '')
│   ├── login/                    # Formulaire de connexion (route 'login')
│   ├── register/                 # Inscription (route 'register')
│   ├── profile/                  # Profil utilisateur (route 'profile')
│   └── navbar/                   # Header avec menu utilisateur et rôles
├── filmlist/                     # Recherche et liste des films (route 'searchfilm')
├── filmdetail/                   # Dialog détail film (DynamicDialog)
├── filmfiltre/                   # Composant filtres avancés
├── filmrequest/                  # Formulaire de demande de film (route 'request')
├── filmrequestlist/              # Gestion des demandes (route 'requestlist')
├── userlist/                     # Admin : gestion utilisateurs (route 'userlist')
├── video-player/                 # Lecteur vidéo custom
├── film.service.ts               # Appels API films
├── requestfilm.service.ts        # Appels API demandes
├── ifilm.ts                      # Interface Film (schéma TMDB + champs custom)
├── iuser.ts                      # Interface User avec rôles
├── irequest.ts                   # Interface Request
├── user.ts / role.ts             # Modèles User et Role
├── app.module.ts                 # Module racine
├── app-routing.module.ts         # Définition des routes
└── app.component.ts              # Composant racine
```

## Routes

| Route | Composant | Accès |
|---|---|---|
| `` | HomeComponent | Public |
| `login` | LoginComponent | Public |
| `register` | RegisterComponent | Public |
| `profile` | ProfileComponent | Connecté |
| `searchfilm` | FilmlistComponent | Connecté |
| `userlist` | UserlistComponent | ROLE_ADMIN |
| `request` | FilmrequestComponent | Connecté |
| `requestlist` | FilmrequestlistComponent | Connecté |

## Authentification

- **Stockage :** sessionStorage (clé `auth-user`, JSON avec user + token JWT)
- **Intercepteur HTTP :** injecte `Authorization: Bearer {token}` + `withCredentials: true` sur toutes les requêtes
- **Sur 401 :** émet un événement logout via EventBusService (pas de refresh token)
- **RBAC :** deux rôles — `ROLE_ADMIN`, `ROLE_MODERATOR` — contrôlent les menus navbar et l'accès aux routes

**Flux de connexion :**
1. LoginComponent → AuthService.signin() → `POST /api/auth/signin`
2. Réponse stockée dans sessionStorage via StorageService
3. NavbarsService déclenche le rafraîchissement de la navbar
4. RedirectService redirige vers la page d'accueil

## API Backend

Le backend tourne sur le port 3000. En dev, un proxy (`proxy.conf.json`) redirige les appels ; en production, Nginx assure le reverse proxy.

### FilmService (`film.service.ts`)

| Endpoint | Description |
|---|---|
| `GET /films/list` | Liste paginée avec filtres, tri. Header `NbFilms` = total |
| `GET /films/listselect` | Titres pour l'autocomplete de recherche |
| `GET /films/listmenufilmimage` | Films récents avec images |
| `GET /films/detail/id/{id}` | Détail complet (TMDB + fichiers locaux) |
| `POST /films/add` | Ajouter un film |
| `GET /emby/stream/{title}` | URL de streaming Emby |
| `GET /emby/download/{title}/{file}` | URL de téléchargement |

### RequestfilmService (`requestfilm.service.ts`)

| Endpoint | Description |
|---|---|
| `POST /request/add` | Créer une demande |
| `GET /request/list` | Lister les demandes |
| `DELETE /request/delete/{id}` | Supprimer une demande |
| `POST /request/edit` | Modifier le statut |

### UserService (`_services/user.service.ts`)

| Endpoint | Description |
|---|---|
| `GET /api/user/list` | Liste des utilisateurs (admin) |
| `GET /api/roles/list` | Liste des rôles |
| `PUT /api/{user_id}` | Mise à jour profil |
| `POST /api/syncFilms` | Forcer la sync films |

## Interfaces principales

**Ifilm** : schéma TMDB complet + champs custom RicoFilm :
- `RICO_FICHIER[]` — fichiers locaux (serveur, chemin, codec, taille)
- `present_streaming` — disponible dans Emby
- `UPDATE_DB_DATE` — date de mise à jour DB

**Iuser** : id, username, email, roles (string[]), token, active

**Irequest** : username, id, title, serveur_name, path, file, size, status

## Gestion d'état

Pas de NgRx. Approche service-based :
- **StorageService** — état persistant (sessionStorage)
- **NavbarsService** — Subject RxJS pour rafraîchir la navbar
- **EventBusService** — émetteur global pour le logout cross-composant
- État local dans les composants via `@Input`/`@Output`

## Environnements

| Config | REST_HOST | Usage |
|---|---|---|
| `development` | `http://localhost:4200/` | Dev local avec proxy |
| `production` | `https://film.ricohoho.fr/` | Serveur de production |
| `cloud-render` | `https://ricofilm-web.onrender.com/` | Déploiement cloud (active le bouton sync) |

## Build & Déploiement

**Build :** `npm run build` (production par défaut, outputPath: `dist/angular-rico-film`)

**Docker (multi-stage) :**
1. Build avec Node.js 22 → `npm run build -- --configuration production`
2. Runtime Nginx Alpine — copie `nginx.conf.davic` + `dist/`
3. Port exposé : 4200 (mappé sur le port 80 interne Nginx)

**Nginx (`nginx.conf.davic`) :**
- SPA routing via `try_files $uri $uri/ /index.html`
- Reverse proxy vers `backend:3000` pour `/films/`, `/api/`, `/request/`, `/emby/`, `/mcp/`, `/image/`
- Route `/mcp/` configurée pour SSE (no buffering, timeout 24h)
- Headers CORS ajoutés sur toutes les routes proxy

**CI/CD (`.github/workflows/front-ci-cd.yml`) :**
1. Push sur `master` → build Angular + image Docker
2. Push image sur `ghcr.io/ricohoho/ricofilm-frontend:latest`
3. SSH sur serveur → pull image → redémarrage container sur `ricofilm-network`

## Points d'attention

- Pas de refresh token — un 401 déconnecte directement l'utilisateur
- sessionStorage : l'authentification ne persiste pas après fermeture d'onglet
- Budget de build : 2 Mo maximum pour le bundle initial
- Le bouton de sync films n'est visible qu'avec `DISPLAY_SYNC_BUTTON: true` (cloud-render)
