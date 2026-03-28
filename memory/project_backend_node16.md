---
name: Contrainte Node.js 16 sur le serveur de production
description: Le serveur ricohoho.fr ne supporte pas Node.js > 16 dans Docker — impact sur les dépendances npm
type: project
---

Le container backend (ricofilm-web) tourne obligatoirement sur Node.js 16 (Dockerfile `FROM node:16-bullseye`) car le serveur ricohoho.fr ne supporte pas Node 18+.

**Why:** Contrainte d'infrastructure du serveur de déploiement davic/ricohoho.fr.

**How to apply:** Avant d'ajouter ou mettre à jour une dépendance npm dans ricofilm-web, vérifier que son champ `engines.node` est compatible avec Node 16. Exemple : `google-auth-library` v10 requiert Node ≥ 18 → utiliser v9 (Node ≥ 14). Les globals `Blob`, `FormData`, `fetch` ne sont pas disponibles nativement en Node 16.
