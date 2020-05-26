/// <reference types="react" />
import './common/css/List.css';
interface IshowCountry {
    (country: string): JSX.Element;
}
interface Props {
    showCountry: IshowCountry;
    data: ListDataSet;
    switchPage: (newPageNumber: number) => void;
    currentPageNumber: number;
    pageLength: number;
    reOrderData(column: ListColumn, order: RankOrder): void;
}
export interface ListItem {
    country: string;
    population: string;
    total_case: string;
    total_death: string;
}
export declare enum ListColumn {
    country = 0,
    population = 1,
    total_case = 2,
    total_death = 3
}
export declare enum RankOrder {
    descend = 0,
    asend = 1
}
export declare type ListDataSet = Array<ListItem>;
export default function List(props: Props): JSX.Element;
export {};
