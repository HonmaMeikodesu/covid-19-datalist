import React, { useState, useEffect } from 'react'
import './common/css/List.css'
import { getData } from './common/utils/getCovidData'
interface LatestData {
  population: string
  total_case: string
  total_death: string
}
interface MergeCountryStatistics {
  [countryName: string]: Array<LatestData>
}
let latestWorldStatistics: Array<JSX.Element> = []
function listAllData(data: MergeCountryStatistics) { // 将数据组装成JSX元素列表
  if (latestWorldStatistics.length !== 0) return latestWorldStatistics
  for (let item in data) {
    let country = item
    let lastIndex = data[item].length - 1
    let population = data[item][lastIndex].population
    let total_case = data[item][lastIndex].total_case
    let total_death = data[item][lastIndex].total_death
    latestWorldStatistics.push(
      <div className="list-item" key={country}>
        <div className="country">{country}</div>
        <div className="population">{population}</div>
        <div className="total-case">{total_case}</div>
        <div className="total-death">{total_death}</div>
      </div>
    )
  }
  return latestWorldStatistics
}
export default function List() {
  const [data, setData] = useState<MergeCountryStatistics>({})
  useEffect(function () {
    // 获取新冠数据
    getData().then(data => {
      setData(data)
    })
  }, [])
  return (
    <>
      <div className="header">
        <div>Country</div>
        <div>Population</div>
        <div>Total_case</div>
        <div>Total_death</div>
      </div>
      <div className="list">
        {Object.keys(data).length !== 0 ? listAllData(data) : '加载中....'}
      </div>
    </>
  )
}