import { account } from './index';

function fetchOneAccountWithApp(accountData) {
    return account.post('/one/application', accountData);
}

export { fetchOneAccountWithApp };
