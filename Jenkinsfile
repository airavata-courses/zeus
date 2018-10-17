pipeline {
    agent any

    stages {
        
        stage('Stopping docker containers'){
            steps{
                sh 'sudo docker stop some-rabbit || true && sudo docker rm some-rabbit || true'
                sh 'sudo docker stop docker-container-mysql5 || true && sudo docker rm docker-container-mysql5 || true'
                sh 'sudo docker stop node_express_ms_cont || true && sudo docker rm node_express_ms_cont || true'
                sh 'sudo docker stop node_rest_ms_cont || true && sudo docker rm node_rest_ms_cont || true'
                sh 'sudo docker stop java_ms_cont || true && sudo docker rm java_ms_cont || true'
                sh 'sudo docker stop python_flask_ms_cont || true && sudo docker rm python_flask_ms_cont || true'
            }
        }

        stage('Starting MySql and RabbitMQ docker'){
            steps{
               // sh 'sudo docker run --name docker-container-mysql5 --net="host" -p 3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.12 || true'
                sh 'sudo docker run -d --hostname my-rabbit --name some-rabbit --net="host" -p 5672 -p 15672 rabbitmq:3-management'
            }
        }

        stage('Check and Ready the Host environment'){
            steps{
                //Run Ansible file here
                sh 'echo "hello"'  
                sh 'sudo apt-get install oracle-java8-installer'
                sh 'export JAVA_HOME=$(/usr/lib/jvm/java-8-openjdk-amd64/)'
                sh 'export PATH=$JAVA_HOME/bin:$PATH'
            }
        }
        
        stage('Cloning Project repos'){
            steps{
                dir('scripts'){
                    sh 'sudo bash ./GetProject.sh'
                }
            }
        }

        stage('Dump file'){
            steps{
                ///var/lib/jenkins/workspace/Zeus_Pipeline/scripts/CompleteProject/NodeRestController/zeus/noderest_controller
                //dir('scripts/CompleteProject/NodeRestController/zeus/noderest_controller'){
                //sh 'sudo docker stop docker-container-mysql5 || true && sudo docker rm docker-container-mysql5 || true'
                    sh 'sudo docker run --name docker-container-mysql5 --net="host" -p 3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.12 || true'
                    sh 'sudo docker exec -i docker-container-mysql5 /usr/bin/mysql  -uroot -proot  < /var/lib/jenkins/workspace/Zeus_Pipeline/scripts/CompleteProject/NodeRestController/zeus/noderest_controller/data.sql'
                //}
            }
        }

        stage('Deploying Controller') {
            steps {
                dir('scripts/CompleteProject/NodeRestController/zeus'){
                    sh 'sudo bash ./node_rest.sh || true'
                }
            }
        }

        stage('Deploying Node Express') {
                    steps {
                        dir('scripts/CompleteProject/NodeExpressMS/zeus'){
                            sh 'sudo bash ./node_express.sh || true'
                        }
                    }
                }
        
        stage('Deploying Spring Boot') {
                    steps {
                        dir('scripts/CompleteProject/SpringMSApplication/zeus'){
                            sh 'sudo bash ./java_ms.sh'
                        }
                    }
                }
        
        stage('Deploying Python Flask') {
            steps {
                dir('scripts/CompleteProject/PythonFlaskApplication/zeus'){
                    sh 'sudo bash ./pythonScript.sh'
                }
            }
        }

        stage('Final') {
            steps {
                echo 'Finsihed Deploying....'
            }
        }

    }
}
