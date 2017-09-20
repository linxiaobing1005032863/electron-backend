/**
 * Created by chenlizan on 2017/6/24.
 */

const initState = {
    account: null
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SHOW_PERSON_INFO':
            return {...state, account: action.account};
        default:
            return state;
    }
};

export default {initState, reducer};