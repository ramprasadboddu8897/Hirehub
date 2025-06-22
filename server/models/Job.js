// import mongoose from 'mongoose';

// const jobSchema = new mongoose.Schema({
//   title: String,
//   rating: Number,
//   location: String,
//   employmentType: String,
//   package_per_annum: String,
//   job_description: String,
//   company_logo_url: String,
//   packageValue: Number, 
// });

// const Job = mongoose.model('Job', jobSchema);
// export default Job;

// models/Job.js
import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: String,
  image_url: String,
});

const lifeAtCompanySchema = new mongoose.Schema({
  description: String,
  image_url: String,
});

const jobSchema = new mongoose.Schema({
  id: String,
  title: String,
  rating: Number,
  company_logo_url: String,
  company_website_url: String,
  location: String,
  job_description: String,
  employmentType: String,
  package_per_annum: String,
  packageValue: Number,
  skills: [skillSchema],
  life_at_company: lifeAtCompanySchema,
});

export default mongoose.model('Job', jobSchema);
