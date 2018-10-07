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

        stage('Cloning Porject repos'){
            steps{
                sh 'sudo bash ./scripts/GetProject.sh'
            }
        }


        stage('Parallel Builds') {
            parallel{
                
                stage('Build 2'){
                    steps {
                        echo 'Building 2'
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }

    }
}
