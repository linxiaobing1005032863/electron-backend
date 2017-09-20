const initState = {
    customerInfo: null
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'CUSTOMER_INFO':
            return {...state, customerInfo: action.customerInfo};
        default:
            return state;
    }
};

export default {initState, reducer};