import { file, file2 } from './index';

function uploadFilesAtProject(fileData) {
    console.log('file/upload api');
    console.log(fileData);
    return file.post('/upload/project', fileData);
}

function downloadFile(id) {
    file({ responseType: 'blob' });

    console.log('download file');
    console.log(id);
    return file.get(`/download/${id}`);
}

function uploadTrFiles(fileData) {
    console.log('file/upload api');
    console.log(fileData);
    return file.post('/upload/tr', fileData);
}

function fetchTestFiles() {
    console.log('file/get api');
    return file.post('/test');
}

function fetchTestFile(id) {
    console.log('file/get one api');
    console.log(id);
    return file.get(`/one/${id}`);
}

function fetchAppFiles(fileData) {
    return file2.post('/app', fileData);
}

function fetchTrDetail(fileData) {
    return file2.post('/detail', fileData);
}

function uploadAppFile(fileData) {
    console.log('file/upload api');
    console.log(fileData);
    return file.post('/upload/app', fileData);
}

export {
    uploadFilesAtProject,
    downloadFile,
    uploadTrFiles,
    fetchTestFiles,
    fetchTestFile,
    fetchAppFiles,
    uploadAppFile,
    fetchTrDetail,
};
