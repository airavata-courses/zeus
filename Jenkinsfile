pipeline {
    agent any

    stages {
        
        stage('Kill existing ports'){
            steps{
                sh 'echo "hello"'
                sh 'set pid1 = $sudo lsof -t -i:3001'
                sh 'set pid2 = $sudo lsof -t -i:8080'
                sh 'echo $pid2'
                sh 'sudo kill -9 $pid1'
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
