pipeline {
    agent any

    stages {
        
        stage('Kill existing ports'){
            steps{
                sh 'echo "hello"'
                sh 'set pid1 = $sudo lsof -t -i:3001'
                sh 'sudo kill -9 $pid1'
            }
        }

        stage('Parallel Builds') {
            parallel{
                stage('Java Micro Service'){
                    steps {
                        sh """
                            mkdir NodeRestController
                            cd NodeRestController
                            git clone -b dev_node_controller https://github.com/airavata-courses/zeus.git
                            cd ..

                            mkdir NodeExpressMS
                            cd NodeExpressMS
                            git clone -b devbranch_node_express_ms https://github.com/airavata-courses/zeus.git
                            cd ..
                                    
                            mkdir PythonFlaskApplication
                            cd PythonFlaskApplication
                            git clone -b python_flask_ms https://github.com/airavata-courses/zeus.git
                            cd ..

                            mkdir SpringMSApplication
                            cd SpringMSApplication
                            git clone -b dev_aravind https://github.com/airavata-courses/zeus.git
                            cd ../..
                        """
                    }
                }
                stage('Build 2'){
                    steps {
                        echo 'Building 2'
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }

    }
}
