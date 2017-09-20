const initState = {
    shippingList: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SHIPPING_LIST':
            return {...state, shippingList: action.shippingList};
        default:
            return state;
    }
};

export default {initState, reducer};