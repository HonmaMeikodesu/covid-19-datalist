var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, useEffect } from 'react';
import { getData } from './common/utils/getCovidData';
import { ListColumn } from './List';
// 动态导入组件
import List from './List';
function customShowCountry(country) {
    return (React.createElement("div", null, country));
}
var pageSplitNumber = 10;
function getCurrentPageStatistics(listLatestData, currentPageNumber) {
    var beginIndex = (currentPageNumber - 1) * pageSplitNumber;
    return listLatestData.slice(beginIndex, beginIndex + pageSplitNumber);
}
export default function App() {
    var _a = useState({}), allStatistics = _a[0], setAllStatistics = _a[1];
    var _b = useState([]), listLatestData = _b[0], setListLatestData = _b[1];
    var _c = useState(1), currentPageNumber = _c[0], setCurrentPageNumber = _c[1];
    function switchPage(newPageNumber) {
        var pageLength = Math.ceil(Object.keys(allStatistics).length / pageSplitNumber);
        if (newPageNumber > pageLength) {
            setCurrentPageNumber(pageLength);
            return;
        }
        else if (newPageNumber < 1) {
            setCurrentPageNumber(1);
            return;
        }
        setCurrentPageNumber(newPageNumber);
    }
    function reOrderData(column, order) {
        var columnName = ListColumn[column];
        var orderFunc;
        if (order === 0)
            orderFunc = function (prev, last) {
                if (isNaN(parseFloat(prev[columnName])) || isNaN(parseFloat(last[columnName]))) {
                    return prev[columnName].localeCompare(last[columnName]);
                }
                else {
                    return parseFloat(prev[columnName]) - parseFloat(last[columnName]);
                }
            };
        else
            orderFunc = function (prev, last) {
                if (isNaN(parseFloat(prev[columnName])) || isNaN(parseFloat(last[columnName]))) {
                    return last[columnName].localeCompare(prev[columnName]);
                }
                else {
                    return parseFloat(last[columnName]) - parseFloat(prev[columnName]);
                }
            };
        var dataInNewOrder = listLatestData.sort(orderFunc);
        setListLatestData(__spreadArrays(dataInNewOrder)); // todo 为何此处必须解构?否则无法触发重新render
        setCurrentPageNumber(1);
    }
    useEffect(function () {
        // 获取新冠数据
        // 给useEffect传递第二个参数为空数组，代表仅在componentDidMount执行副作用并且在componentWillUnmount
        // 清除副作用，否则在componentDidUpdate也会执行该effect,而setState又会导致重新render,导致
        // 出现无限请求,无限请求的背后是无限次重新render
        getData().then(function (data) {
            setAllStatistics(data);
            var tempListLatestData = [];
            for (var item in data) {
                var country = item;
                var lastIndex = data[item].length - 1;
                var population = data[item][lastIndex].population;
                var total_case = data[item][lastIndex].total_case;
                var total_death = data[item][lastIndex].total_death;
                tempListLatestData.push({ country: country, population: population, total_case: total_case, total_death: total_death });
            }
            setListLatestData(tempListLatestData);
        });
    }, []);
    return (React.createElement("div", { className: "App" },
        React.createElement("div", { className: "left-fill-up" }),
        React.createElement("div", { className: "container" },
            React.createElement(List, { data: getCurrentPageStatistics(listLatestData, currentPageNumber), showCountry: customShowCountry, switchPage: switchPage, currentPageNumber: currentPageNumber, pageLength: Math.ceil(Object.keys(allStatistics).length / pageSplitNumber), reOrderData: reOrderData })),
        React.createElement("div", { className: "right-fill-up" })));
}
