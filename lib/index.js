var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import './common/css/List.css';
import { getData } from './common/utils/getCovidData';
import ReactDOM from 'react-dom';
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(props) {
        var _this = _super.call(this, props) || this;
        _this.latestWorldStatistics = [];
        _this.state = { data: {} };
        _this.listAllData = _this.listAllData.bind(_this);
        return _this;
    }
    List.prototype.listAllData = function (data) {
        if (this.latestWorldStatistics.length !== 0)
            return this.latestWorldStatistics;
        for (var item in data) {
            var country = item;
            var lastIndex = data[item].length - 1;
            var population = data[item][lastIndex].population;
            var total_case = data[item][lastIndex].total_case;
            var total_death = data[item][lastIndex].total_death;
            this.latestWorldStatistics.push(React.createElement("div", { className: "list-item", key: country },
                React.createElement("div", { className: "country" }, country),
                React.createElement("div", { className: "population" }, population),
                React.createElement("div", { className: "total-case" }, total_case),
                React.createElement("div", { className: "total-death" }, total_death)));
        }
        return this.latestWorldStatistics;
    };
    List.prototype.componentDidMount = function () {
        var _this = this;
        getData().then(function (data) {
            _this.setState({ data: data });
        });
    };
    List.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "header" },
                React.createElement("div", null, "Country"),
                React.createElement("div", null, "Population"),
                React.createElement("div", null, "Total_case"),
                React.createElement("div", null, "Total_death")),
            React.createElement("div", { className: "list" }, Object.keys(this.state.data).length !== 0 ? this.listAllData(this.state.data) : '加载中....')));
    };
    return List;
}(React.Component));
export default List;
ReactDOM.render(React.createElement(React.StrictMode, null,
    React.createElement(List, null)), document.getElementById('root'));
