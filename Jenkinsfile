pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'azizbouassida11/gestion-parc-backend'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Scan Vulnerabilities with Trivy') {
            steps {
                script {
                    sh '''
                    curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh
                    ./trivy image $DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    sh '''
                    docker login -u azizbouassida11 -p Saisho@1899
                    docker push $DOCKER_IMAGE
                    '''
                }
            }
        }
    }
}
