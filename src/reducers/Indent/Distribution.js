
const initState = {
    detailsInfo: [],
    numberList:[]
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'DETAILS_INFO':
            return {...state, detailsInfo: action.detailsInfo};
        case 'NUMBER_LIST':
            return {...state, numberList: action.numberList};
        default:
            return state;
    }
};

export default {initState, reducer};