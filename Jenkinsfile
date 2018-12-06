pipeline {
  environment {
    registry = 'aravindbharatha/node-express-ms-build'
    registryCredential = 'dockerhub'
  }
  agent any
  stages {
    stage('Building image') {
      steps{
        dir('node_express_ms'){
          script {
            dockerImage = docker.build registry + ':$BUILD_NUMBER'
          }
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry('', registryCredential ) {
            dockerImage.push()
            dockerImage.push("latest")
          }
        }
      }
    }

  }
}
