const initState = {
    orderIndex: 0
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'ORDER_INDEX':
            return {...state, orderIndex: action.orderIndex};
        default:
            return state;
    }
};

export default {initState, reducer};