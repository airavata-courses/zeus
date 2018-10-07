pipeline {
    agent any

    stages {
        
        stage('Kill existing ports'){
            steps{
                sh 'echo "hello"'
                sh 'set pid1 = $sudo lsof -t -i:3001'
                sh 'sudo kill -9 $pid1'
            }
        }

        stage('Cloning Project repos'){
            steps{
                dir('scripts'){
                    sh 'sudo bash ./GetProject.sh'
                }
            }
        }
        
        stage('Deploying DB and Controller') {
            steps {
                dir('scripts/scripts'){
                    sh 'sudo bash ./Node_rest_controller.sh'
                }
            }
        }

        stage('Parallel Builds and Deploys for MicroServices') {
            parallel{    
                stage('Deploying Node Express') {
                    steps {
                        dir('scripts/scripts'){
                            sh 'sudo bash ./Node_express_ms.sh'
                        }
                    }
                }
                stage('Deploying Python Flask') {
                    steps {
                        dir('scripts/scripts'){
                            sh 'sudo bash ./python_flash_ms.sh'
                        }
                    }
                }
                stage('Deploying Spring Boot') {
                    steps {
                            dir('scripts/scripts'){
                                sh 'sudo bash ./python_flash_ms.sh'
                            }
                        }
                    }
            }
        }
        
        
        
        stage('Final') {
            steps {
                echo 'Finsihed Deploying....'
            }
        }

    }
}
