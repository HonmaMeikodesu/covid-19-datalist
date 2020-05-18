import React from 'react';
import './common/css/List.css';
interface LatestData {
    population: string;
    total_case: string;
    total_death: string;
}
interface MergeCountryStatistics {
    [countryName: string]: Array<LatestData>;
}
interface Props {
}
interface State {
    data: MergeCountryStatistics;
}
export default class List extends React.Component<Props, State> {
    private latestWorldStatistics;
    constructor(props: Props);
    private listAllData;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
