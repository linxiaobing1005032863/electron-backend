/**
 * Created by chenlizan on 2017/6/24.
 */

import {userHttpRequest} from '../../utils/httpRequest';

export const myInfo_controller = (callback) => {
    userHttpRequest('/person/myInfo', 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};

export const editMyInfo_controller = (data, callback) => {
    userHttpRequest('/person/editMyInfo', 'POST', data, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};