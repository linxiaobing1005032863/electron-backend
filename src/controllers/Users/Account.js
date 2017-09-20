/**
 * Created by chenlizan on 2017/6/24.
 */

import {authHttpRequest} from '../../utils/httpRequest';

export const register_controller = (name, password, phone, email, callback) => {

    authHttpRequest('/account/editAccount', 'POST', {accountId: name, passWord: password, phone: phone, email: email}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};