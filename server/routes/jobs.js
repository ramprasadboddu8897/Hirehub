// routes/jobs.js
import express from 'express';
import { getJobs,getJobById } from '../controllers/jobs.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getJobs); // GET /api/jobs
router.get('/:id',auth, getJobById) // <-- New route

export default router;