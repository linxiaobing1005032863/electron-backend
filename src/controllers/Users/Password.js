/**
 * Created by chenlizan on 2017/6/26.
 */

import {authHttpRequest} from '../../utils/httpRequest';

export const changePassword_controller = (data, callback) => {
    authHttpRequest('/account/changePassword', 'POST', {
        passWord: data.passWord,
        newPassWord: data.newPassWord
    }, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};