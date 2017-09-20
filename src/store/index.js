

import {createStore, combineReducers} from 'redux';
import Person from '../reducers/Users/Person';
import Organize from '../reducers/Users/Organize';
import Phone from '../reducers/Users/Phone';
import Email from '../reducers/Users/Email';
import Indent from '../reducers/Indent/Indent';
import CustomerInfo from '../reducers/Indent/CustomerInfo';
import ProductInfo from '../reducers/Indent/ProductInfo';
import AllRule from '../reducers/Indent/AllRule';
import RuleId from '../reducers/Indent/RuleId';
import RuleInfo from '../reducers/Indent/RuleInfo'
import IndexInfo from '../reducers/Indent/IndexInfo';
import OrderInfo from '../reducers/Indent/OrederInfo';
import OrderIndex from '../reducers/Indent/OrderIndex';
import ChannelInfo from '../reducers/Indent/Channel';
import ShippingList from '../reducers/Indent/ShippingList';
import ShippingDraft from '../reducers/Indent/ShippingDraft';
import Distribution from '../reducers/Indent/Distribution';
import InstallList from "../reducers/Indent/InstallList";
import InstallDraft from '../reducers/Indent/InstallDraft';
import InstallIndex from '../reducers/Indent/InstallIndex';
import FieldType from '../reducers/Code/FieldType';
import FieldInfo from '../reducers/Code/FieldInfo';
import ConfirmOrder from '../reducers/Indent/ConfirmOrder';
import OrderDraft from '../reducers/Indent/OrderDraft';
import DraftIndex from'../reducers/Indent/DraftIndex';
import FieldData from '../reducers/Code/FieldData';
import FieldId from '../reducers/Code/FieldId';
import FieldLength from '../reducers/Code/FieldLength';
import CodeData from '../reducers/Code/CodeData';
import CodeIndex from '../reducers/Code/CodeIndex'

// 定义reducer
// 每个组件自己的reducer负责维护自己的状态, 注意key的名字和组件名一致
const reducers = {
    Person: Person.reducer,
    Organize: Organize.reducer,
    Phone: Phone.reducer,
    Email: Email.reducer,
    Indent: Indent.reducer,
    CustomerInfo: CustomerInfo.reducer,
    ProductInfo: ProductInfo.reducer,
    AllRule:AllRule.reducer,
    RuleId:RuleId.reducer,
    RuleInfo:RuleInfo.reducer,
    IndexInfo:IndexInfo.reducer,
    OrderInfo: OrderInfo.reducer,
    OrderIndex: OrderIndex.reducer,
    ChannelInfo: ChannelInfo.reducer,
    ShippingList: ShippingList.reducer,
    ShippingDraft: ShippingDraft.reducer,
    Distribution:Distribution.reducer,
    InstallList: InstallList.reducer,
    InstallDraft: InstallDraft.reducer,
    InstallIndex:InstallIndex.reducer,
    FieldType: FieldType.reducer,
    FieldInfo:FieldInfo.reducer,
    FieldLength:FieldLength.reducer,
    ConfirmOrder: ConfirmOrder.reducer,
    DraftIndex:DraftIndex.reducer,
    OrderDraft:OrderDraft.reducer,
    FieldData: FieldData.reducer,
    FieldId: FieldId.reducer,
    CodeData: CodeData.reducer,
    CodeIndex: CodeIndex.reducer
};

// 整体的初始状态
// 就是把每个组件自己的初始状态组合起来, 注意key的名字和组件名一致
const initState = {
    Person: Person.initState,
    Organize: Organize.initState,
    Phone: Phone.initState,
    Email: Email.initState,
    Indent: Indent.initState,
    CustomerInfo: CustomerInfo.initState,
    ProductInfo: ProductInfo.initState,
    AllRule:AllRule.initState,
    RuleId:RuleId.initState,
    RuleInfo:RuleInfo.initState,
    IndexInfo:IndexInfo.initState,
    OrderInfo: OrderInfo.initState,
    OrderIndex: OrderIndex.initState,
    ChannelInfo: ChannelInfo.initState,
    ShippingDraft: ShippingDraft.initState,
    ShippingList: ShippingList.initState,
    Distribution:Distribution.initState,
    InstallDraft: InstallDraft.initState,
    InstallList: InstallList.initState,
    InstallIndex:InstallIndex.initState,
    FieldType: FieldType.initState,
    FieldInfo:FieldInfo.initState,
    FieldLength:FieldLength.initState,
    ConfirmOrder: ConfirmOrder.initState,
    OrderDraft:OrderDraft.initState,
    DraftIndex:DraftIndex.initState,
    FieldData: FieldData.initState,
    FieldId: FieldId.initState,
    CodeData: CodeData.initState,
    CodeIndex: CodeIndex.initState
};

const store = createStore(combineReducers(reducers), initState);

export default store;
