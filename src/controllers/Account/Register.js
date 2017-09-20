

import {authHttpRequest} from '../../utils/httpRequest';

export const register_controller = (data, callback) => {
    authHttpRequest('/account/register', 'POST', {account: data.name, passWord: data.password, phone: data.phone, email: data.email}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};