import {goodHttpRequest} from '../../utils/httpRequest';

export const confirm_controller = (data, callback) => {
    goodHttpRequest('/sale/confirm', 'POST', data, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};
export const disList_controller = (callback) => {
    goodHttpRequest('/sale/getOrderList/1', 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};

export const disInfo_controller = (id, callback) => {
    goodHttpRequest('/sale/getOrderInfo/' + id , 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};