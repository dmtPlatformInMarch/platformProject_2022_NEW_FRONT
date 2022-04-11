import { translator } from './index';

function translateTxt(trData) {
    return translator.post('/tlText', trData);
}

export { translateTxt };
