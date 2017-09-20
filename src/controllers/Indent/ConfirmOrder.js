import {goodHttpRequest} from '../../utils/httpRequest';

export const orderInfo_controller = (data, callback) => {
    goodHttpRequest('/sale/update', 'POST', data, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};
export const orderList_controller = (callback) => {
    goodHttpRequest('/sale/getOrderList/0', 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};

export const draftInfo_controller = (id, callback) => {
    goodHttpRequest('/sale/getOrderInfo/' + id , 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};