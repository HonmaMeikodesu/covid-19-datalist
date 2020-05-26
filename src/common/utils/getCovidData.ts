// 从第三方仓库获取新冠数据并将数据格式化
let DATA_SOURCE_URL:string
if(process.env.NODE_ENV==='development'){
  DATA_SOURCE_URL='http://localhost:8080/data.csv'
}else{
  DATA_SOURCE_URL='https://covid.ourworldindata.org/data/owid-covid-data.csv'
}
const LOCATION='location'
const PUBLISH_DATE='date'
const POPULATION='population'
const CASE='total_cases'
const DEATH='total_deaths'
export interface SpecificCountryStatistics{
  publish_date:string
  population:string
  total_case:string
  total_death:string
}
interface NotMergeCountryStatistics extends SpecificCountryStatistics{
  country:string
}
export interface MergeCountryStatistics{
  [countryName:string]:Array<SpecificCountryStatistics>
}
export async function getData():Promise<MergeCountryStatistics>{
  let raw_data:string
  return fetch(DATA_SOURCE_URL).then(res=>res.text()).then(data=>{
    raw_data=data.trim()
    const unsorted_data_list=raw_data.split('\n')
    const row_header=unsorted_data_list[0].split(',')
    const country_index=row_header.indexOf(LOCATION)
    const publish_date_index=row_header.indexOf(PUBLISH_DATE)
    const population_index=row_header.indexOf(POPULATION)
    const case_index=row_header.indexOf(CASE)
    const death_index=row_header.indexOf(DEATH)
    unsorted_data_list.shift()
    const sorted_data_list:Array<NotMergeCountryStatistics>=unsorted_data_list.map(item=>{
      const temp=item.split(',')
      const country:string=temp[country_index]
      const publish_date:string=temp[publish_date_index] || ''
      const population:string=temp[population_index] || '0'
      const total_case:string=temp[case_index] || '0'
      const total_death:string=temp[death_index] || '0'
      return {country,publish_date,population,total_case,total_death}
    })
    let merge_data_list:MergeCountryStatistics={}
    for(let item of sorted_data_list){
      if(!merge_data_list.hasOwnProperty(item.country)){
        merge_data_list[item.country]=[]
      }
      merge_data_list[item.country].push({
        publish_date:item.publish_date,
        population:item.population,
        total_case:item.total_case,
        total_death:item.total_death
      })
    }
    return merge_data_list
  })
}