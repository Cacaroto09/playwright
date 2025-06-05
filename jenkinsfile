pipeline {
agent { label 'docker'}
tools { nodejs 'node-lts' }
environment { BASE_URL = credential('base_url')}
options { timeout(time: 60, unit: 'MINUTES'); timestamps()}
stages{
    stage('Checkout') {steps { Checkout scm}}
    stage('Install Dependencies') {
        steps {
            sh 'npm ci'
        }
    }
    stage(install Playwright Browsers) {
        steps {
            sh 'npx playwright install'
        }
    }
    stage('Run Tests') {
        steps {
            sh 'npx playwright test --reporter=html'
        }
    }

}
post {
    always {
            junit 'test-results/junit.xml'
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
        success {
            echo 'Tests passed successfully!'
        }
        failure {
            echo 'Tests failed!'
        }
    }


}