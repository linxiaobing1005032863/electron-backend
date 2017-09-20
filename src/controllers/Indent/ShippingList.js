import {goodHttpRequest} from '../../utils/httpRequest';

export const shippingInfo_controller = (data, callback) => {
    goodHttpRequest('/sale/setTrackingNO', 'POST', data, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};
export const shippingList_controller = (callback) => {
    goodHttpRequest('/sale/getOrderList/2', 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};

export const shipping_controller = (id, callback) => {
    goodHttpRequest('/sale/getOrderInfo/' + id, 'GET', {}, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};