// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import Job from './models/Job.js';
// import fs from 'fs';

// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI;

// const seedJobs = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('✅ Connected to MongoDB');

//     let data = JSON.parse(fs.readFileSync('./jobsData.json', 'utf-8'));

//     // 🔧 Add packageValue field to each job
//     data = data.map(job => {
//       const match = job.package_per_annum.match(/\d+/); // Extract numeric part
//       const value = match ? parseInt(match[0]) * 100000 : 0;
//       return {
//         ...job,
//         packageValue: value,
//       };
//     });

//     await Job.deleteMany(); // Clean slate
//     await Job.insertMany(data);

//     console.log('✅ Jobs seeded successfully');
//     process.exit();
//   } catch (error) {
//     console.error('❌ Seeding error:', error.message);
//     process.exit(1);
//   }
// };

// seedJobs();

// // Updated_seedJobs.js
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import Job from './models/Job.js';
// import fs from 'fs';

// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI;

// const generateSkills = () => [
//   { name: 'ReactJS', image_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/reactjs-img.png' },
//   { name: 'NodeJS', image_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/nodejs-img.png' },
//   { name: 'MongoDB', image_url: 'https://assets.ccbp.in/frontend/react-js/jobby-app/mongodb-img.png' },
//   { name: 'ExpressJS', image_url: 'https://assets.ccbp.in/frontend/react-js/jobyy=app/express-js-img.png' },
// ];

// const generateLifeAtCompany = () => ({
//   description: 'At our company, we foster innovation and teamwork to solve real-world problems.',
//   image_url: 'https://assets.ccbp.in/frontend/react-js/life-at-company-img.png',
// });

// const seedJobs = async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('✅ Connected to MongoDB');

//     let data = JSON.parse(fs.readFileSync('./jobsData.json', 'utf-8'));

//     const enrichedJobs = data.map(job => ({
//       ...job,
//       company_website_url: `https://www.${job.title.toLowerCase().split(' ').join('')}.com`,
//       packageValue: parseInt(job.package_per_annum) * 100000 || 0,
//       skills: generateSkills(),
//       life_at_company: generateLifeAtCompany(),
//     }));

//     await Job.deleteMany();
//     await Job.insertMany(enrichedJobs);

//     console.log('✅ Jobs seeded successfully');
//     process.exit();
//   } catch (error) {
//     console.error('❌ Seeding error:', error.message);
//     process.exit(1);
//   }
// };

// seedJobs();


import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Job from './models/Job.js'; // Make sure this model has the updated schema

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seedJobs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Read and parse JSON file
    let data = JSON.parse(fs.readFileSync('./final_enriched_jobsData.json', 'utf-8'));
//  let data = JSON.parse(fs.readFileSync('./jobsData.json', 'utf-8'));
    // 🔧 Add packageValue field to each job

    data = data.map(job => {
      const match = job.package_per_annum.match(/\d+/); // Extract numeric part
      const value = match ? parseInt(match[0]) * 100000 : 0;
      return {
        ...job,
        packageValue: value,
      };
    });

    // Clear previous job records
    await Job.deleteMany();
    console.log('🗑️ Existing jobs deleted');

    // Insert new records
    await Job.insertMany(data);
    console.log('✅ Jobs seeded successfully');

    process.exit();
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedJobs();

