import { resume, abilitySource, contactType } from './index';

function createResume(resumeData) {
    return resume.post('/new', resumeData);
}

function fetchAllAbilitySources() {
    return abilitySource.get('/all');
}

function fetchAllContactTypes() {
    return contactType.get('/all');
}

function fetchResumeMine(resumeData) {
    return resume.post('/mine', resumeData);
}

function fetchResume(resumeData) {
    return resume.post('/', resumeData);
}

function saveResume(resumeData) {
    return resume.post('/edit', resumeData);
}

function deleteResume(resumeData) {
    return resume.post('/delete', resumeData);
}

export {
    createResume,
    fetchAllAbilitySources,
    fetchAllContactTypes,
    fetchResumeMine,
    fetchResume,
    saveResume,
    deleteResume,
};
