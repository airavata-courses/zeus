pipeline {
    agent any

    stages {
        
        stage('Kill existing ports'){
            steps{
                sh 'set +e'
                sh 'echo "hello"'
                sh 'sudo fuser -k 3001/tcp'
                sh 'set -e'
            }
        }


        // stage('Parallel Builds') {
        //     parallel{
        //         stage('Build 1'){
        //             steps {
        //                 echo 'Building 1'
        //             }
        //         }
        //         stage('Build 2'){
        //             steps {
        //                 echo 'Building 2'
        //             }
        //         }
        //     }
        // }
        
        // stage('Test') {
        //     steps {
        //         echo 'Testing..'
        //     }
        // }
        
        // stage('Deploy') {
        //     steps {
        //         echo 'Deploying....'
        //     }
        // }

    }
}
