import {authHttpRequest} from '../../utils/httpRequest';

export const logout_controller = (callback) => {
        authHttpRequest('/account/logout', 'POST', {}, (error, result) => {
            if (error) return callback(false, error);
            if (result.result.token !== null && result.status === 200)
                callback(true, result.result);
            else
                callback(false, result.result);
        });
};