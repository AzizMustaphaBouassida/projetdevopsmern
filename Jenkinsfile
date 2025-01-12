pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'azizbouassida11/gestion-parc-backend:latest' 
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials' // Docker credentials ID
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
                        credentialsId: 'github-credentials'
                    ]]
                ])
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo "Building Docker Image..."
                sh '''
                ls -l ./gestion-parc-backend
                docker build -t $DOCKER_IMAGE ./gestion-parc-backend
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
                sh 'docker images -q | xargs -r docker rmi -f || true'
            }
        }
        
        stage('Clean Workspace') {
            steps {
                echo "Cleaning workspace..."
                cleanWs()
            }
        }
    }
    
    post {
        always {
            echo "Cleaning up Docker system..."
            sh 'docker system prune -f || true'
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check logs for details."
        }
    }
}

