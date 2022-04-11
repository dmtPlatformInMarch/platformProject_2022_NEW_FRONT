import { application } from './index';

function registerApplicationByWorker(appData) {
    return application.post('/new/byworker', appData);
}

function fetchWorkerApplicaition(appData) {
    return application.post('/project/byworker', appData);
}

function fetchManagerApplicaition(appData) {
    return application.post('/project/bymanager', appData);
}

function changeAppStatusByWorker(appData) {
    return application.post('/change/byworker', appData);
}

function changeAppStatusByManager(appData) {
    return application.post('/change/bymanager', appData);
}

function fetchApplication(appData) {
    return application.post('/one', appData);
}

export {
    registerApplicationByWorker,
    fetchWorkerApplicaition,
    changeAppStatusByWorker,
    fetchManagerApplicaition,
    changeAppStatusByManager,
    fetchApplication,
};
