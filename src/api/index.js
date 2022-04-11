import axios from 'axios';
import { setInterceptors } from './common/interceptors';
//process.env.VUE_APP_API_URL
function createInstance() {
    return axios.create({
        baseURL: 'http://localhost:80/',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Platform-Token': 'Platform-Token',
            'Access-Control-Allow-Origin': '*',
        },
    });
}

// 액시오스 초기화 함수
function createInstanceWithAuth(url) {
    console.log('instance with auth');
    const instance = axios.create({
        baseURL: `http://localhost:80/${url}`,
    });
    return setInterceptors(instance);
}

function createInstanceWithUrl(url) {
    return axios.create({
        baseURL: `http://localhost:80/${url}`,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
export const instance = createInstance();
export const posts = createInstanceWithAuth('posts');

export const project = createInstanceWithAuth('project');
export const series = createInstanceWithAuth('series');
export const field = createInstanceWithAuth('field');
export const resume = createInstanceWithAuth('resume');
export const abilitySource = createInstanceWithAuth('ability-source');
export const contactType = createInstanceWithAuth('contact-type');
export const job = createInstanceWithAuth('job');
export const application = createInstanceWithAuth('application');
export const file = createInstanceWithUrl('file');
export const file2 = createInstanceWithAuth('file');
export const account = createInstanceWithAuth('account');
export const translator = createInstanceWithAuth('translator');
export const sentence = createInstanceWithAuth('sentence');
// CREATE - posts
// POST - posts
// PUT - posts {id}
// DELETE - posts {id}
