/**
 * Created by chenlizan on 2017/6/21.
 */

import request from 'request';
import {authServerAddress, userServerAddress, logServerAddress, codeServerAddress,goodServerAddress} from "../config";

const httpRequest = (url, method, data, callback) => {
    const token = (typeof window === 'object') ? window.localStorage.token : '';
    request({
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            "Authorization": 'Bearer ' + token
        },
        url: url,
        method: method || "GET",
        body: data,
        json: true
    }, function (error, response, body) {
        //callback(err, body);
        if (error) {//网络错误，api无法连接
            let error = {};
            error.code = 500;//区分api返回的500错误
            error.statusCode = 500001;
            error.error = true;
            error.message = '系统错误，请稍后重试！';
            callback(error, null);
        }
        else {//非网络错误，api逻辑或者程序报错
            if (response.statusCode === 200) {
                callback(null, body);
            }
            else {
                let error = {};
                error.body = response.body;
                error.error = true;
                error.message = response.statusMessage;
                error.statusCode = response.statusCode;
                callback(error, null);
            }
        }
    });
};

export const authHttpRequest = (url, method, data, callback) => {
    httpRequest(authServerAddress + url, method, data, callback);
};

export const userHttpRequest = (url, method, data, callback) => {
    httpRequest(userServerAddress + url, method, data, callback);
};

export const logHttpRequest = (url, method, data, callback) => {
    httpRequest(logServerAddress + url, method, data, callback);
};
export const codeHttpRequest = (url, method, data, callback) => {
    httpRequest(codeServerAddress + url, method, data, callback);
};

export const goodHttpRequest = (url, method, data, callback) => {
    httpRequest(goodServerAddress + url, method, data, callback);
};