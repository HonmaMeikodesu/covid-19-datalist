import React, { useState, useEffect } from 'react';
import './common/css/List.css';
import { getData } from './common/utils/getCovidData';
var latestWorldStatistics = [];
function listAllData(data) {
    if (latestWorldStatistics.length !== 0)
        return latestWorldStatistics;
    for (var item in data) {
        var country = item;
        var lastIndex = data[item].length - 1;
        var population = data[item][lastIndex].population;
        var total_case = data[item][lastIndex].total_case;
        var total_death = data[item][lastIndex].total_death;
        latestWorldStatistics.push(React.createElement("div", { className: "list-item", key: country },
            React.createElement("div", { className: "country" }, country),
            React.createElement("div", { className: "population" }, population),
            React.createElement("div", { className: "total-case" }, total_case),
            React.createElement("div", { className: "total-death" }, total_death)));
    }
    return latestWorldStatistics;
}
export default function List() {
    var _a = useState({}), data = _a[0], setData = _a[1];
    useEffect(function () {
        // 获取新冠数据
        getData().then(function (data) {
            setData(data);
        });
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "header" },
            React.createElement("div", null, "Country"),
            React.createElement("div", null, "Population"),
            React.createElement("div", null, "Total_case"),
            React.createElement("div", null, "Total_death")),
        React.createElement("div", { className: "list" }, Object.keys(data).length !== 0 ? listAllData(data) : '加载中....')));
}
