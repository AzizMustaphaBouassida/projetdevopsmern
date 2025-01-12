pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "azizbouassida11/gestion-parc-backend:latest" // Replace with your Docker image name
        DOCKER_CREDENTIALS_ID = "docker-hub-credentials" // Jenkins credentials ID for Docker Hub
        GIT_CREDENTIALS_ID = "github-credentials" // Jenkins credentials ID for GitHub
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "Checking out source code..."
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: 'main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/AzizMustaphaBouassida/projetdevopsmern',
                        credentialsId: "$GIT_CREDENTIALS_ID"
                    ]]
                ])
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker Image..."
                sh '''
                docker build -t $DOCKER_IMAGE .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                echo "Pushing Docker Image to Docker Hub..."
                withCredentials([usernamePassword(credentialsId: "$DOCKER_CREDENTIALS_ID", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    docker push $DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Clean Unused Docker Images') {
            steps {
                echo "Removing unused Docker images..."
                sh '''
                docker system prune -f || true
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check logs for details."
        }
        always {
            echo "Cleaning up Docker system..."
            sh '''
            docker system prune -f || true
            '''
        }
    }
}