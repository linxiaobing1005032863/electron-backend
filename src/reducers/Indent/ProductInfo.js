const initState = {
    productInfo: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'PRODUCT_INFO':
            return {...state, productInfo: action.productInfo};
        default:
            return state;
    }
};

export default {initState, reducer};