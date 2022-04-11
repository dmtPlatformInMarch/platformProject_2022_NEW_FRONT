import { project, series, field } from './index';

/* 시리즈 */
function createSeries(seriesData) {
    return series.post('/new', seriesData);
}

function fetchSeriesMine(seriesData) {
    console.log(seriesData);
    return series.post('/mine', seriesData);
}

/* 프로젝트 */
function createProject(projectData) {
    console.log('I want to create new project');
    return project.post('/new', projectData);
}

/* 프로젝트 */
function editProject(projectData) {
    return project.post('/edit', projectData);
}

/* 필드 */
function fetchAllField() {
    return field.get('/all');
}

function fetchMyProject(projectData) {
    return project.post('/mine', projectData);
}

function fetchAllProject(projectData) {
    return project.post('/all', projectData);
}

function fetchProject(projectData) {
    return project.post('/', projectData);
}

export {
    createSeries,
    createProject,
    fetchSeriesMine,
    fetchAllField,
    fetchMyProject,
    fetchProject,
    fetchAllProject,
    editProject,
};
