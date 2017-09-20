

import {userHttpRequest} from '../../utils/httpRequest';

export const Organize_controller = (callback) => {
    userHttpRequest('/organization/detail', 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};

export const editOrganize_controller = (data, callback) => {
    userHttpRequest('/organization/editor', 'POST', data, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};