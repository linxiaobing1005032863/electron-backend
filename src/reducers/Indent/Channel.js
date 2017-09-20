const initState = {
    channelInfo: {}
};

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'CHANNEL_INFO':
            return {...state, channelInfo: action.channelInfo};
        default:
            return state;
    }
};

export default {initState, reducer};