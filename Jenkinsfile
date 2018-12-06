pipeline {
  environment {
    registry = 'aravindbharatha/java-ms-build'
    registryCredential = 'dockerhub'
  }
  agent any
  stages {
    stage('Building image') {
      steps{
        dir('Java_Spring_Ms'){
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
