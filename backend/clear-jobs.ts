// Clear test jobs and re-fetch from Adzuna
import './src/config/firebase';
import { db } from './src/config/firebase';

async function clearJobs() {
  try {
    console.log('Clearing test jobs from database...');
    const snapshot = await db.collection('adzuna_jobs').get();
    console.log(`Found ${snapshot.size} jobs to delete`);
    
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log('✅ All test jobs cleared! Next API call will fetch 150 real jobs from Adzuna.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing jobs:', error);
    process.exit(1);
  }
}

clearJobs();
