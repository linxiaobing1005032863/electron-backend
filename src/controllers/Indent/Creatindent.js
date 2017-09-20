import {goodHttpRequest} from '../../utils/httpRequest';

export const orderAdd_controller = (data, callback) => {
    goodHttpRequest('/sale/create', 'POST', data, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};
export const productInfo_controller = (callback) => {
    goodHttpRequest('/produce/getAll', 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};
