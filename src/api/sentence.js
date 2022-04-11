import { sentence } from './index';

function saveSentences(data) {
    return sentence.post('/save', data);
}

export { saveSentences };
