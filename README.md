# DevOps Mini-Projet : Conteneurisation, Orchestration et Monitoring d'une Application Web

## 1. Introduction
Ce projet vise à démontrer les compétences en DevOps en mettant en œuvre la conteneurisation, l'orchestration Kubernetes, l'intégration continue et le monitoring d'une application MERN (MongoDB, Express.js, React.js, Node.js).

## 2. Objectifs
- Conteneuriser les composants de l'application MERN (frontend, backend et base de données MongoDB).
- Orchestrer le déploiement avec Kubernetes.
- Configurer l'intégration continue pour automatiser les builds et les déploiements.
- Mettre en place un système de monitoring avec Prometheus et Grafana.

## 3. Étapes du Projet

### 3.1. Conteneurisation
Chaque composant de l'application est conteneurisé à l'aide de Docker :
- **Backend** : Création d'un fichier Dockerfile pour l'API Node.js.
- **Frontend** : Création d'un fichier Dockerfile pour l'application React.
- **MongoDB** : Utilisation de l'image officielle de MongoDB.

### 3.2. Orchestration Kubernetes
L'orchestration est gérée par Kubernetes avec les éléments suivants :
- **Deployments** : Définit les réplicas pour le backend, le frontend et MongoDB.
- **Services** : Expose les services via ClusterIP ou NodePort.
- **Ingress** : Gère l'accès au frontend via un nom de domaine (ex. `mern-app.local`).

### 3.3. Intégration Continue
Un pipeline CI/CD est configuré pour :
- Construire les images Docker.
- Pousser les images sur Docker Hub.
- Déployer automatiquement sur le cluster Kubernetes.

### 3.4. Monitoring et Observabilité
- **Prometheus** : Collecte des métriques des services Kubernetes et de l'application.
- **Grafana** : Visualise les métriques via des tableaux de bord personnalisés.

---

## 4. Instructions de Déploiement

### 4.1. Prérequis
- Cluster Kubernetes fonctionnel (Minikube ou Docker Desktop avec Kubernetes activé).
- Outils installés : `kubectl`, `helm`, `git`, et `docker`.
- Accès à Docker Hub pour publier les images.

### 4.2. Conteneurisation
1. Backend :
   ```bash
   cd backend
   docker build -t <dockerhub-username>/mern-backend:latest .
   docker push <dockerhub-username>/mern-backend:latest
   ```

2. Frontend :
   ```bash
   cd frontend
   docker build -t <dockerhub-username>/mern-frontend:latest .
   docker push <dockerhub-username>/mern-frontend:latest
   ```

3. MongoDB :
   Utilisation de l'image MongoDB officielle (aucune action requise).

### 4.3. Déploiement Kubernetes

1. Appliquer les fichiers YAML Kubernetes :
   ```bash
   kubectl apply -f kubernetes/backend-deployment.yaml
   kubectl apply -f kubernetes/frontend-deployment.yaml
   kubectl apply -f kubernetes/mongodb-deployment.yaml
   ```

2. Vérifier les pods et services :
   ```bash
   kubectl get pods
   kubectl get services
   ```

3. Accéder au frontend via Ingress :
   Ajouter `mern-app.local` dans le fichier `/etc/hosts` :
   ```
   127.0.0.1 mern-app.local
   ```
   Puis accéder à `http://mern-app.local`.

### 4.4. Monitoring avec Prometheus et Grafana

#### 1. Installation de Prometheus :
   ```bash
   kubectl create namespace monitoring
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo update
   helm install prometheus prometheus-community/prometheus --namespace monitoring
   ```

#### 2. Installation de Grafana :
   ```bash
   helm repo add grafana https://grafana.github.io/helm-charts
   helm install grafana grafana/grafana --namespace monitoring \
       --set admin.password=admin \
       --set service.type=NodePort
   ```

#### 3. Accès à Grafana :
   Obtenez le port NodePort de Grafana :
   ```bash
   kubectl get svc -n monitoring grafana
   ```
   Connectez-vous à `http://<minikube-ip>:<nodeport>` avec les identifiants `admin/admin`.

#### 4. Configuration des Dashboards :
- Ajouter une datasource Prometheus avec l'URL : `http://prometheus-server.monitoring.svc.cluster.local`.
- Importer le dashboard Kubernetes depuis Grafana Labs (ID : 18283).

#### 5. Vérification des métriques :
Utilisez cette requête PromQL dans Grafana pour afficher les métriques de l'application :
```promql
sum(rate(http_requests_total{app="goprom"}[5m])) by (version)
```

---

## 5. Nettoyage
Pour supprimer toutes les ressources créées :
```bash
kubectl delete namespace monitoring
kubectl delete -f kubernetes/
```

---
## 6. Captures d'ecrans

![Capture d'écran 2025-01-13 221133](https://github.com/user-attachments/assets/5db99c3d-59cb-429e-949e-0968988079d5)
![Capture d'écran 2025-01-13 221203](https://github.com/user-attachments/assets/f1d304e0-e0dd-4e5f-b526-9195060522fd)
![Capture d'écran 2025-01-13 221337](https://github.com/user-attachments/assets/45b7dd71-af6c-44a5-bf16-645816fa0a29)
![Capture d'écran 2025-01-13 221300](https://github.com/user-attachments/assets/2d36f244-829c-49a6-81d3-4b696cdc10d8)
![Capture d'écran 2025-01-13 221413](https://github.com/user-attachments/assets/e6cce20f-369c-43a0-adb9-30fb4cc3e963)

---

## 7. Conclusion
Ce projet met en avant les bonnes pratiques DevOps : conteneurisation, orchestration et monitoring. Grâce à Prometheus et Grafana, les métriques de performance sont facilement accessibles, offrant une vue complète sur l'état du système.
