import {codeHttpRequest} from '../../utils/httpRequest';
import {goodHttpRequest} from '../../utils/httpRequest';

export const productAdd_controller = (data, callback) => {
    goodHttpRequest('/produce/create', 'POST', data, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};

export const code_controller = (callback) => {
    codeHttpRequest('/code', 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};

export const codeInfo_controller = (id,callback) => {
    codeHttpRequest('/code/'+id, 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};

export const codeDict_controller = (id,callback) => {
    codeHttpRequest('/codeDict/'+id, 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};
