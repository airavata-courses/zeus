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
		    sh 'mvn clean install'
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
