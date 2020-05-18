export interface SpecificCountryStatistics {
    publish_date: string;
    population: string;
    total_case: string;
    total_death: string;
}
export interface MergeCountryStatistics {
    [countryName: string]: Array<SpecificCountryStatistics>;
}
export declare function getData(): Promise<MergeCountryStatistics>;
