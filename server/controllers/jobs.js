import Job from '../models/Job.js';

export const getJobs = async (req, res) => {
  const { employment_type = '', minimum_package = '', search = '' } = req.query;

  try {
    const filter = {};

    // ✅ Filter by employment type (if present)
    if (employment_type) {
      const typesArray = employment_type.split(',');
      filter.employmentType = { $in: typesArray };
    }

    // ✅ Filter by minimum package using numeric field
    const salary = parseInt(minimum_package);
    if (!isNaN(salary)) {
      filter.packageValue = { $gte: salary };
    }

    // ✅ Search by title or description (case-insensitive)
    if (search.trim()) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { jobDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const jobs = await Job.find(filter);
    res.json({ jobs });
  } catch (err) {
    console.error('❌ Error fetching jobs:', err.message);
    res.status(500).json({ error: 'Server error while fetching jobs' });
  }
};

export const getJobById = async (req, res) => {
  const { id } = req.params

  try {
    const job = await Job.findById(id)
    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }

    // For simplicity, get similar jobs as top 3 others (excluding current one)
    const similarJobs = await Job.find({ _id: { $ne: id } }).limit(3)

    res.json({
      job_details: {
        id: job._id,
        title: job.title,
        company_logo_url: job.company_logo_url,
        company_website_url: job.company_website_url,
        employmentType: job.employmentType,
        location: job.location,
        package_per_annum: job.package_per_annum,
        rating: job.rating,
        job_description: job.job_description,
        life_at_company: job.life_at_company,
        skills: job.skills
      },
      similar_jobs: similarJobs.map(j => ({
        id: j._id,
        title: j.title,
        rating: j.rating,
        company_logo_url: j.company_logo_url,
        job_description: j.job_description,
        location: j.location
      }))
    })
  } catch (err) {
    console.error('Error fetching job details:', err.message)
    res.status(500).json({ error: 'Server error fetching job details' })
  }
}
