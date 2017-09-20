/**
 * Created by chenlizan on 2017/6/21.
 */

import {authHttpRequest} from '../../utils/httpRequest';

export const login_controller = (data, callback) => {
    if (data.name === 'guest' && data.password === 'guest')
        callback(true, {guest: 'guest'});
    else
        authHttpRequest('/account/login', 'POST', {account: data.name, passWord: data.password}, (error, result) => {
            if (error) return callback(false, error);
            if (result.result.token !== null && result.status === 200)
                callback(true, result.result);
            else
                callback(false, result.result);
        });
};