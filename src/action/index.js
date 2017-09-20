/**
 * Created by chenlizan on 2017/6/21.
 */

/**
 * 我的个人信息
 * @param data
 * @returns {{type: string, personInfo: *}}
 */
export const show_person_info_creator = (data) => {
    return {type: 'SHOW_PERSON_INFO', account: data};
};

export const show_organize_info_creator = (data) => {
    return {type: 'SHOW_ORGANIZE_INFO', account: data};
};

export const verify_email_current_add = (data) => {
    return {type: 'VERIFY_EMAIL_CURRENT_ADD', current: data};
};

export const verify_phone_current_add = (data) => {
    return {type: 'VERIFY_PHONE_CURRENT_ADD', current: data};
};

export const indent_current_add = (data) => {
    return {type: 'INDENT_CURRENT_ADD', current: data};
};

export const customer_info = (data) => {
    return {type: 'CUSTOMER_INFO', customerInfo: data};
};

export const rule_id = (data) => {
    return {type: 'RULE_ID', ruleId: data};
};

export const all_rule = (data) => {
    return {type: 'ALL_RULE', allRule: data};
};

export const rule_info = (data) => {
    return {type: 'RULE_INFO', ruleInfo: data};
};

export const rule_index_info = (data) => {
    return {type: 'RULE_INDEX_INFO', indexInfo: data};
};

export const product_info = (data) => {
    return {type: 'PRODUCT_INFO', productInfo: data};
};

export const order_info = (data) => {
    return {type: 'ORDER_INFO', orderInfo: data};
};

export const order_index = (data) => {
    return {type: 'ORDER_INDEX', orderIndex: data};
};

export const channel_info = (data) => {
    return {type: 'CHANNEL_INFO', channelInfo: data};
};

export const shipping_list = (data) => {
    return {type: 'SHIPPING_LIST', shippingList: data};
};

export const shipping_draft = (data) => {
    return {type: 'SHIPPING_DRAFT', shippingDraft: data};
};

export const number_list = (data) => {
    return {type: 'NUMBER_LIST', numberList: data};
};

export const details_info = (data) => {
    return {type: 'DETAILS_INFO', detailsInfo: data};
};

export const install_list = (data) => {
    return {type: 'INSTALL_LIST', installList: data};
};

export const install_draft = (data) => {
    return {type: 'INSTALL_DRAFT', installDraft: data};
};

export const install_index = (data) => {
    return {type: 'INSTALL_INDEX', installIndex: data};
};

export const confirm_order = (data) => {
    return {type: 'CONFIRM_ORDER', order: data};
};

export const order_draft= (data) => {
    return {type: 'ORDER_DRAFT', orderDraft: data};
};

export const draft_index= (data) => {
    return {type: 'DRAFT_INDEX', draftIndex: data};
};

export const field_add_type = (data) => {
    return {type: 'FIELD_ADD_TYPE', fieldType: data};
};

export const field_type_data = (data) => {
    return {type: 'FIELD_TYPE_DATA', typeData: data};
};

export const field_type_id = (data) => {
    return {type: 'FIELD_TYPE_ID', typeId: data};
};

export const field_type_length = (data) => {
    return {type: 'FIELD_TYPE_LENGTH', typeLength: data};
};

export const field_type_info = (data) => {
    return {type: 'FIELD_TYPE_INFO', typeInfo: data};
};

export const code_data = (data) => {
    return {type: 'CODE_DATA', codeData: data};
};
export const code_index = (data) => {
    return {type: 'CODE_INDEX', codeIndex: data};
};


