pipeline {
  environment {
    registry = 'aravindbharatha/python-ms-build'
    registryCredential = 'dockerhub'
  }
  agent any
  stages {
    stage('Building image') {
      steps{
        dir('python_flask_ms'){
          script {
            dockerImage = docker.build registry + ':$BUILD_NUMBER' registry + ':latest'
          }
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry('', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }

  }
}
