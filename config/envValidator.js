const Logger = require('../utils/logger');

/**
 * Validates required environment variables
 */
function validateEnv() {
  const requiredVars = [
    'ACCESS_TOKEN_SECRET',
    'MAILCHIMP_KEY',
    'MAILCHIMP_LIST',
    'MONGODB_URI',
  ];
  
  const missingVars = [];
  
  for (const envVar of requiredVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }
  
  if (missingVars.length > 0) {
    Logger.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
  
  Logger.info('Environment variables validated successfully');
}

module.exports = validateEnv;
