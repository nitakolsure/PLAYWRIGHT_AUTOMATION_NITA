pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.64.0-noble'
    }
  }

  options {
    timeout(time: 60, unit: 'MINUTES')
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Quality') {
      steps {
        sh 'npm run typecheck'
        sh 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
