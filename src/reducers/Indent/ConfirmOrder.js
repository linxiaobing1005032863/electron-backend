/**
 * Created by Administrator on 2017/7/18 0018.
 */
const initState = {
    order: []
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'CONFIRM_ORDER':
            return {...state, order: action.order};
        default:
            return state;
    }
};

export default {initState, reducer};