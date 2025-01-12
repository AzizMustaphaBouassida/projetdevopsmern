pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'your-dockerhub-repo/your-image-name:latest' // Define Docker image name
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials' // Docker credentials ID
    }
    stages {
        stage('Checkout Code') {
            steps {
                echo "Checking out source code..."
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/master']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/AzizMustaphaBouassida/mern.git',
                        credentialsId: 'gitlab-credentials'
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
        
        stage('Scan with Trivy') {
            steps {
                echo "Scanning Docker Image with Trivy..."
                sh '''
                docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                -v $(pwd):/root/.cache/ aquasec/trivy image $DOCKER_IMAGE || exit 1
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
