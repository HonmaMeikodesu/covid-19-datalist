var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// 从第三方仓库获取新冠数据并将数据格式化
var DATA_SOURCE_URL;
if (process.env.NODE_ENV === 'development') {
    DATA_SOURCE_URL = 'http://localhost:8080/data.csv';
}
else {
    DATA_SOURCE_URL = 'https://covid.ourworldindata.org/data/owid-covid-data.csv';
}
var LOCATION = 'location';
var PUBLISH_DATE = 'date';
var POPULATION = 'population';
var CASE = 'total_cases';
var DEATH = 'total_deaths';
export function getData() {
    return __awaiter(this, void 0, void 0, function () {
        var raw_data;
        return __generator(this, function (_a) {
            return [2 /*return*/, fetch(DATA_SOURCE_URL).then(function (res) { return res.text(); }).then(function (data) {
                    raw_data = data.trim();
                    var unsorted_data_list = raw_data.split('\n');
                    var row_header = unsorted_data_list[0].split(',');
                    var country_index = row_header.indexOf(LOCATION);
                    var publish_date_index = row_header.indexOf(PUBLISH_DATE);
                    var population_index = row_header.indexOf(POPULATION);
                    var case_index = row_header.indexOf(CASE);
                    var death_index = row_header.indexOf(DEATH);
                    unsorted_data_list.shift();
                    var sorted_data_list = unsorted_data_list.map(function (item) {
                        var temp = item.split(',');
                        var country = temp[country_index];
                        var publish_date = temp[publish_date_index] || '';
                        var population = temp[population_index] || '0';
                        var total_case = temp[case_index] || '0';
                        var total_death = temp[death_index] || '0';
                        return { country: country, publish_date: publish_date, population: population, total_case: total_case, total_death: total_death };
                    });
                    var merge_data_list = {};
                    for (var _i = 0, sorted_data_list_1 = sorted_data_list; _i < sorted_data_list_1.length; _i++) {
                        var item = sorted_data_list_1[_i];
                        if (!merge_data_list.hasOwnProperty(item.country)) {
                            merge_data_list[item.country] = [];
                        }
                        merge_data_list[item.country].push({
                            publish_date: item.publish_date,
                            population: item.population,
                            total_case: item.total_case,
                            total_death: item.total_death
                        });
                    }
                    return merge_data_list;
                })];
        });
    });
}
