import { job } from './index';

function registerJob(jobData) {
    return job.post('/new', jobData);
}

function fetchJobs(jobData) {
    return job.post('/', jobData);
}

function fetchJobsWithFiles(jobData) {
    return job.post('/files', jobData);
}

function fetchAllJobs(jobData) {
    return job.post('/all', jobData);
}

function fetchAllJobsAsManager(jobData) {
    return job.post('/manager/application', jobData);
}

function fetchAllJobsAsWorker(jobData) {
    return job.post('/worker/application', jobData);
}

function fetchJobsByProject(jobData) {
    return job.post('/byproject', jobData);
}

function fetchJobsByApplication(jobData) {
    return job.post('/byapplication', jobData);
}

export {
    registerJob,
    fetchJobs,
    fetchAllJobs,
    fetchAllJobsAsManager,
    fetchAllJobsAsWorker,
    fetchJobsWithFiles,
    fetchJobsByProject,
    fetchJobsByApplication,
};
