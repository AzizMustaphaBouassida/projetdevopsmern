pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'azizbouassida11/gestion-parc-backend'
    }

    stages {
        stage('Check Docker Installation') {
            steps {
                script {
                    sh '''
                    if ! command -v docker &> /dev/null; then
                        echo "Docker not found. Ensure Docker is installed and accessible from Jenkins."
                        exit 127
                    fi
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE ./gestion-parc-backend'
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
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $DOCKER_IMAGE
                        '''
                    }
                }
            }
        }
    }
}
