/**
 * Created by chenlizan on 2017/6/18.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store from './store';
import './stylesheets/index.css';

import App from './App';
import Login from './containers/Account/Login';
import Home from './containers/Home';
import Person from './containers/Users/Person';
import Register from './containers/Account/Register';
import Forget from './containers/Account/Forget';
import Organize from './containers/Users/Organize';
import Task from './containers/Users/Task';
import Log from './containers/Users/Log';
import Password from './containers/Users/Password';
import ChangeWrap from './containers/Users/ChangeWrap';
import Email from './containers/Users/Email';
import Phone from './containers/Users/Phone';
import CreateIndent from './containers/Indent/CreateIndent';
import ShippingList from './containers/Indent/ShippingList';
import InstallList from './containers/Indent/InstallList';
import CreateCode from './containers/Code/CreateCode';
import CreateField from './containers/Code/CreateField';
import ConfirmOrder from './containers/Indent/ConfirmOrder';
import CreateProduct from './containers/Indent/CreateProduct';
import Distribution from './containers/Indent/Distribution';

const validate = function (next, replace, callback) {
    const isLoggedIn = !!window.localStorage.getItem('token');
    if (!isLoggedIn && next.location.pathname !== '/login') {
        replace('/login');
    }
    callback();
};

const routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} onEnter={validate}>
                <IndexRoute component={Login}/>
                <Route path="login" component={Login}/>
                <Router path="register" component={Register}/>
                <Router path="forget" component={Forget}/>
                <Route path="home" component={Home}>
                    <Route path="person" component={Person}/>
                    <Route path="organize" component={Organize}/>
                    <Route path="password" component={Password}/>
                    <Route path="changeWrap" component={ChangeWrap}/>
                    <Route path="email" component={Email}/>
                    <Route path="phone" component={Phone}/>
                    <Route path="task" component={Task}/>
                    <Route path="log" component={Log}/>
                    <Route path="createIndent" component={CreateIndent}/>
                    <Route path="createProduct" components={CreateProduct}/>
                    <Route path="Distribution" components={Distribution}/>
                    <Route path="shippingList" components={ShippingList}/>
                    <Route path="installList" components={InstallList}/>
                    <Route path="code" components={CreateCode}/>
                    <Route path="field" components={CreateField}/>
                    <Route path="ConfirmOrder" components={ConfirmOrder}/>
                </Route>
            </Route>
        </Router>
    </Provider>
);

ReactDOM.render(routes, document.getElementById('root'));
// registerServiceWorker();
