// backend/src/utils/validateEnv.ts

interface EnvConfig {
  PORT: string;
  JWT_SECRET: string;
  NODE_ENV: string;
  FIREBASE_PROJECT_ID?: string;
  CLOUDINARY_CLOUD_NAME?: string;
  CLOUDINARY_API_KEY?: string;
  CLOUDINARY_API_SECRET?: string;
}

export function validateEnvironment(): void {
  const requiredVars = [
    'PORT',
    'JWT_SECRET',
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    throw new Error('Environment validation failed. Please check .env file.');
  }

  // Validate JWT_SECRET length (should be at least 32 characters)
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 32) {
    console.warn('⚠️  JWT_SECRET should be at least 32 characters long for security');
  }

  // Check optional but recommended variables
  const recommendedVars: Array<keyof EnvConfig> = [
    'FIREBASE_PROJECT_ID',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
  ];

  const missingRecommended = recommendedVars.filter(varName => !process.env[varName]);
  if (missingRecommended.length > 0) {
    console.warn('⚠️  Missing optional environment variables (some features may not work):');
    missingRecommended.forEach(varName => {
      console.warn(`   - ${varName}`);
    });
  }

  console.log('✅ Environment validation passed');
  console.log(`   - PORT: ${process.env.PORT}`);
  console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   - JWT_SECRET: ${process.env.JWT_SECRET ? '***CONFIGURED***' : 'MISSING'}`);
}
