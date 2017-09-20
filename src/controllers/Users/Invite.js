import {userHttpRequest} from '../../utils/httpRequest';


export const invite_controller = (data, callback) => {
    userHttpRequest('/task/createInvitation', 'POST', data, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};
export const transfer_controller = (data, callback) => {
    userHttpRequest('/organization/transfer', 'POST', data, (error, result) => {
        if (error) return callback(false, error);
        if (result.result !== null && result.status === 200)
            callback(true, result.result);
        else
            callback(false, result.result);
    });
};