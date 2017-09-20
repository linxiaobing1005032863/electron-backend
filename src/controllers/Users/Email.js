/**
 * Created by chenlizan on 2017/6/26.
 */

import {authHttpRequest} from '../../utils/httpRequest';

export const changEmailAndPhone_controller = (type, data, callback) => {
    authHttpRequest('/account/editAccount/' + type, 'POST', {
        email: data.email,
        phone: data.phone
    }, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};