pipeline {
    agent any

    stages {
        
        stage('Stopping docker containers'){
            steps{
                sh 'sudo docker stop some-rabbit || true && sudo docker rm some-rabbit || true'
                sh 'sudo docker stop docker-container-mysql5 || true && sudo docker rm docker-container-mysql5 || true'
            }
        }

        stage('Starting MySql and RabbitMQ docker'){
            steps{
                sh 'sudo docker run --name docker-container-mysql5 --net="host" -p 3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.12'
                sh 'sudo docker run -d --hostname my-rabbit --name some-rabbit --net="host" -p 5672 -p 15672 rabbitmq:3-management'
            }
        }

        // stage('Check and Ready the Host environment'){
        //     steps{
        //         //Run Ansible file here
        //         sh 'echo "hello"'
        //         sh 'set pid1 = $sudo lsof -t -i:3001'
        //         sh 'sudo kill -9 $pid1'
        //     }
        // }
        
        stage('Cloning Project repos'){
            steps{
                dir('scripts'){
                    sh 'sudo bash ./GetProject.sh'
                }
            }
        }
        
        stage('Deploying Controller') {
            steps {
                dir('scripts/CompleteProject/NodeRestController/zeus/'){
                    sh 'pwd'
                    sh 'sudo bash node_rest.sh'
                }
            }
        }

        // stage('Deploying Node Express') {
        //             steps {
        //                 dir('scripts/scripts'){
        //                     sh 'sudo bash ./Node_express_ms.sh'
        //                 }
        //             }
        //         }
        
        // stage('Deploying Python Flask') {
        //             steps {
        //                 dir('scripts/scripts'){
        //                     sh 'sudo bash ./python_flash_ms.sh'
        //                 }
        //             }
        //         }
        
        // stage('Deploying Spring Boot') {
        //     steps {
        //         dir('scripts/scripts'){
        //             sh 'sudo bash ./java_spring.sh'
        //         }
        //     }
        // }

        // stage('Final') {
        //     steps {
        //         echo 'Finsihed Deploying....'
        //     }
        // }

    }
}
