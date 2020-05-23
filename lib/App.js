import React, { Suspense, useState, useEffect } from 'react';
import { getData } from './common/utils/getCovidData';
var List = React.lazy(function () { return import('./List'); });
function showCountry(country) {
    return (React.createElement("div", null, country));
}
export default function App() {
    var _a = useState({}), allStatistics = _a[0], setAllStatistics = _a[1];
    useEffect(function () {
        getData().then(function (data) {
            setAllStatistics(data);
        });
    }, []);
    return (React.createElement("div", { className: "App" },
        React.createElement(Suspense, { fallback: "Loading....." },
            React.createElement(List, { data: allStatistics, showCountry: showCountry }))));
}
