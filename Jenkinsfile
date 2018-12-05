pipeline {
  environment {
    registry = 'aravindbharatha/python-ms-build'
    registryCredential = 'dockerhub'
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/airavata-courses/zeus.git'
      }
    }
    stage('Building image') {
      steps{
        dir('scripts/scripts'){
          script {
            docker.build registry + ':$BUILD_NUMBER'
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
