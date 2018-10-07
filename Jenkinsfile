pipeline {
    environment {
     pid1 = "foo"
   }

    agent any

    stages {
        
        stage('Kill existing ports'){
            steps{
                sh 'echo "hello"'
                pid1 = sh(returnStdout: true, script: 'sudo lsof -t -i:3001')
                sh 'sudo kill -9 ${pid1}'
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
