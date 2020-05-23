import React from 'react';
import './common/css/List.css';
var latestWorldStatistics = [];
function listAllData(data, showCountry) {
    if (latestWorldStatistics.length !== 0)
        return latestWorldStatistics;
    for (var item in data) {
        var country = item;
        var lastIndex = data[item].length - 1;
        var population = data[item][lastIndex].population;
        var total_case = data[item][lastIndex].total_case;
        var total_death = data[item][lastIndex].total_death;
        latestWorldStatistics.push(React.createElement("div", { className: "list-item", key: country },
            React.createElement("div", { className: "country" }, showCountry(country)),
            React.createElement("div", { className: "population" }, population),
            React.createElement("div", { className: "total-case" }, total_case),
            React.createElement("div", { className: "total-death" }, total_death)));
    }
    return latestWorldStatistics;
}
export { getData } from './common/utils/getCovidData';
export default function List(props) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "header" },
            React.createElement("div", null, "Country"),
            React.createElement("div", null, "Population"),
            React.createElement("div", null, "Total_case"),
            React.createElement("div", null, "Total_death")),
        React.createElement("div", { className: "list" }, Object.keys(props.data).length !== 0 ? listAllData(props.data, props.showCountry) : '加载中....')));
}
