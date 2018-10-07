pipeline {
    agent any

    stages {
        stage('Kill existing ports'){
            steps{
                sh ''' 
                    sudo kill -9 $(sudo lsof -t -i 3001)&sudo kill -9 $(sudo lsof -t -i 3050)&sudo kill -9 $(sudo lsof -t -i 4000)&sudo kill -9 $(sudo lsof -t -i 8090)&
                '''
            }
        }
        stage('Parallel Builds') {
            parallel{
                stage('Build 1'){
                    steps {
                        echo 'Building 1'
                    }
                }
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
