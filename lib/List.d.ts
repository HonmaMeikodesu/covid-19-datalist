/// <reference types="react" />
import './common/css/List.css';
interface LatestData {
    population: string;
    total_case: string;
    total_death: string;
}
interface MergeCountryStatistics {
    [countryName: string]: Array<LatestData>;
}
interface IshowCountry {
    (country: string): JSX.Element;
}
interface Props {
    showCountry: IshowCountry;
    data: MergeCountryStatistics;
}
export { getData } from './common/utils/getCovidData';
export default function List(props: Props): JSX.Element;
