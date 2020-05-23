import React from 'react'
import './common/css/List.css'
interface LatestData {
  population: string
  total_case: string
  total_death: string
}
interface MergeCountryStatistics {
  [countryName: string]: Array<LatestData>
}
interface IshowCountry{
  (country:string):JSX.Element
}
interface Props {
  showCountry:IshowCountry
  data: MergeCountryStatistics
}
let latestWorldStatistics: Array<JSX.Element> = []
function listAllData(data: MergeCountryStatistics,showCountry:IshowCountry) { // 将数据组装成JSX元素列表
  if (latestWorldStatistics.length !== 0) return latestWorldStatistics
  for (let item in data) {
    let country = item
    let lastIndex = data[item].length - 1
    let population = data[item][lastIndex].population
    let total_case = data[item][lastIndex].total_case
    let total_death = data[item][lastIndex].total_death
    latestWorldStatistics.push(
      <div className="list-item" key={country}>
        <div className="country">{showCountry(country)}</div>
        <div className="population">{population}</div>
        <div className="total-case">{total_case}</div>
        <div className="total-death">{total_death}</div>
      </div>
    )
  }
  return latestWorldStatistics
}
export { getData } from './common/utils/getCovidData'
export default function List(props:Props) {
  return (
    <>
      <div className="header">
        <div>Country</div>
        <div>Population</div>
        <div>Total_case</div>
        <div>Total_death</div>
      </div>
      <div className="list">
        {Object.keys(props.data).length !== 0 ? listAllData(props.data,props.showCountry) : '加载中....'}
      </div>
    </>
  )
}