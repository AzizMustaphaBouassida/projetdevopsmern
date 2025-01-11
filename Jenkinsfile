pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "azizbouassida11/gestion-parc-backend"
        DOCKER_CREDENTIALS_ID = "dockerhub-credentials"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo "Checking out source code..."
                checkout scm: [
                    $class: 'GitSCM',
                    branches: [[name: 'master']], 
                    userRemoteConfigs: [[
                        url: 'https://github.com/AzizMustaphaBouassida/mern.git',
                        credentialsId: 'gitlab-credentials'
                    ]]
                ]
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker Image..."
                sh 'docker build -t $DOCKER_IMAGE ./gestion-parc-backend'
            }
        }

        stage('Scan with Trivy') {
            steps {
                echo "Scanning Docker Image with Trivy..."
                sh '''
                docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                aquasec/trivy image $DOCKER_IMAGE || exit 1
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
                sh 'docker images -q | xargs docker rmi -f || true'
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
