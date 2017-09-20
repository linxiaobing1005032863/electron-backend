const initState = {
    orderInfo: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'ORDER_INFO':
            return {...state, orderInfo: action.orderInfo};
        default:
            return state;
    }
};

export default {initState, reducer};