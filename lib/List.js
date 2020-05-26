import React, { useState } from 'react';
import './common/css/List.css';
var DESCEND_ICON = React.createElement("svg", { className: "icon", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "p-id": "2341", width: "30", height: "30" },
    React.createElement("path", { d: "M512 685.248l-278.624-278.624 45.248-45.248L512 594.752l233.376-233.376 45.248 45.248z", fill: "#181818", "p-id": "2342" }));
var ASCEND_ICON = React.createElement("svg", { className: "icon", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "p-id": "2464", width: "30", height: "30" },
    React.createElement("path", { d: "M745.376 662.624L512 429.248l-233.376 233.376-45.248-45.248L512 338.752l278.624 278.624z", fill: "#181818", "p-id": "2465" }));
function listAllData(data, showCountry) {
    var latestWorldStatistics = [];
    if (latestWorldStatistics.length !== 0)
        return latestWorldStatistics;
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var item = data_1[_i];
        latestWorldStatistics.push(React.createElement("div", { className: "list-item", key: item.country },
            React.createElement("div", { className: "country" }, showCountry(item.country)),
            React.createElement("div", { className: "population" }, item.population),
            React.createElement("div", { className: "total-case" }, item.total_case),
            React.createElement("div", { className: "total-death" }, item.total_death)));
    }
    return latestWorldStatistics;
}
function showPageSpliter(pageNumber, pageLength, switchPage) {
    var page = [];
    var pageToJump = ''; // 闭包变量
    if (pageNumber > 1)
        page.push(React.createElement("li", { key: "last-page", className: "page prev-page", onClick: function () { return switchPage(pageNumber - 1); } },
            React.createElement("button", null, "\u4E0A\u4E00\u9875")));
    if (pageNumber !== 1)
        page.push(React.createElement("li", { key: 1, className: "page", onClick: function () { return switchPage(1); } },
            React.createElement("button", null, "1")));
    if (pageNumber > 5) {
        page.push(React.createElement("li", { key: 'pre-more', className: "page page-more" },
            React.createElement("strong", null, "...")));
        var _loop_1 = function (i) {
            page.push(React.createElement("li", { key: i, className: "page", onClick: function () { return switchPage(i); } },
                React.createElement("button", null, i)));
        };
        for (var i = pageNumber - 3; i >= pageNumber - 1; i++) {
            _loop_1(i);
        }
    }
    else {
        var _loop_2 = function (i) {
            page.push(React.createElement("li", { key: i, className: "page", onClick: function () { return switchPage(i); } },
                React.createElement("button", null, i)));
        };
        for (var i = 2; i < pageNumber; i++) {
            _loop_2(i);
        }
    }
    page.push(React.createElement("li", { key: pageNumber, className: "page page-active", onClick: function () { return switchPage(pageNumber); } },
        React.createElement("button", null, pageNumber)));
    if (pageNumber + 5 < pageLength) {
        var _loop_3 = function (i) {
            page.push(React.createElement("li", { key: i, className: "page", onClick: function () { return switchPage(i); } },
                React.createElement("button", null, i)));
        };
        for (var i = pageNumber + 1; i <= pageNumber + 3; i++) {
            _loop_3(i);
        }
        page.push(React.createElement("li", { key: 'last-more', className: "page page-more" },
            React.createElement("strong", null, "...")));
    }
    else {
        var _loop_4 = function (i) {
            page.push(React.createElement("li", { key: i, className: "page", onClick: function () { return switchPage(i); } },
                React.createElement("button", null, i)));
        };
        for (var i = pageNumber + 1; i <= pageLength - 1; i++) {
            _loop_4(i);
        }
    }
    if (pageNumber !== pageLength)
        page.push(React.createElement("li", { key: pageLength, className: "page", onClick: function () { return switchPage(pageLength); } },
            React.createElement("button", null, pageLength)));
    if (pageNumber < pageLength)
        page.push(React.createElement("li", { key: "next-page", className: "page next-page", onClick: function () { return switchPage(pageNumber + 1); } },
            React.createElement("button", null, "\u4E0B\u4E00\u9875")));
    page.push(React.createElement("li", { key: "jump-page", className: "page" },
        React.createElement("input", { className: "page-jump", type: "text", onChange: function (e) { pageToJump = e.target.value; } })));
    page.push(React.createElement("li", { key: "jump-confirmed", className: "page" },
        React.createElement("strong", { className: "page-jump-confirmed", onClick: function () { return switchPage(parseInt(pageToJump)); } }, "\u8DF3\u8F6C")));
    return (React.createElement("ul", { className: "page-spliter" }, page));
}
function showRankArrow(rankOrder) {
    if (rankOrder === 0)
        return DESCEND_ICON;
    else
        return ASCEND_ICON;
}
export var ListColumn;
(function (ListColumn) {
    ListColumn[ListColumn["country"] = 0] = "country";
    ListColumn[ListColumn["population"] = 1] = "population";
    ListColumn[ListColumn["total_case"] = 2] = "total_case";
    ListColumn[ListColumn["total_death"] = 3] = "total_death";
})(ListColumn || (ListColumn = {}));
export var RankOrder;
(function (RankOrder) {
    RankOrder[RankOrder["descend"] = 0] = "descend";
    RankOrder[RankOrder["asend"] = 1] = "asend";
})(RankOrder || (RankOrder = {}));
export default function List(props) {
    var _a = useState(-1), rankColumn = _a[0], setRankColumn = _a[1];
    var _b = useState(0), rankOrder = _b[0], setRankOrder = _b[1];
    function reOrder(column) {
        if (column === rankColumn) {
            switch (rankOrder) {
                case 0:
                    setRankOrder(1);
                    props.reOrderData(column, 1);
                    break;
                case 1:
                    setRankOrder(0);
                    props.reOrderData(column, 0);
            }
        }
        else {
            setRankOrder(0);
            setRankColumn(column);
            props.reOrderData(column, 0);
        }
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "header" },
            React.createElement("div", { className: "header-title", onClick: function () { return reOrder(0); } },
                React.createElement("div", null, ListColumn[0]),
                React.createElement("div", null, rankColumn === 0 && showRankArrow(rankOrder))),
            React.createElement("div", { className: "header-title", onClick: function () { return reOrder(1); } },
                React.createElement("div", null, ListColumn[1]),
                React.createElement("div", null, rankColumn === 1 && showRankArrow(rankOrder))),
            React.createElement("div", { className: "header-title", onClick: function () { return reOrder(2); } },
                React.createElement("div", null, ListColumn[2]),
                React.createElement("div", null, rankColumn === 2 && showRankArrow(rankOrder))),
            React.createElement("div", { className: "header-title", onClick: function () { return reOrder(3); } },
                React.createElement("div", null, ListColumn[3]),
                React.createElement("div", null, rankColumn === 3 && showRankArrow(rankOrder)))),
        React.createElement("div", { className: "list" }, props.data.length !== 0 ? listAllData(props.data, props.showCountry) : React.createElement("span", null, "\u52A0\u8F7D\u4E2D...")),
        React.createElement("div", { className: "footer" }, props.data.length !== 0 && showPageSpliter(props.currentPageNumber, props.pageLength, props.switchPage))));
}
