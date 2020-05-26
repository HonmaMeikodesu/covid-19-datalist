import React, { useState, useEffect } from 'react'
import { getData, MergeCountryStatistics } from './common/utils/getCovidData'
import {ListDataSet,ListItem,ListColumn,RankOrder} from './List'
// 动态导入组件
import List from './List'
function customShowCountry(country:string):JSX.Element{
  return(
    <div>{country}</div>
  )
}
const pageSplitNumber=10
function getCurrentPageStatistics(listLatestData:ListDataSet,currentPageNumber:number):ListDataSet{
  let beginIndex=(currentPageNumber-1)*pageSplitNumber
  return listLatestData.slice(beginIndex,beginIndex+pageSplitNumber)
}
export default function App() {
  const [allStatistics, setAllStatistics] = useState<MergeCountryStatistics>({})
  const [listLatestData, setListLatestData] = useState<ListDataSet>([])
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1)
  function switchPage(newPageNumber:number):void{
    let pageLength=Math.ceil(Object.keys(allStatistics).length/pageSplitNumber)
    if(newPageNumber>pageLength) {
      setCurrentPageNumber(pageLength)
      return
    }else if(newPageNumber<1){
      setCurrentPageNumber(1)
      return
    }
    setCurrentPageNumber(newPageNumber)
  }
  function reOrderData(column:ListColumn,order:RankOrder):void{
    let columnName=ListColumn[column] as keyof ListItem
    let orderFunc:(prev:ListItem,last:ListItem)=>number
    if(order===0) 
      orderFunc=(prev:ListItem,last:ListItem)=>{
        if(isNaN(parseFloat(prev[columnName]))||isNaN(parseFloat(last[columnName]))){
          return prev[columnName].localeCompare(last[columnName])
        }else{
          return parseFloat(prev[columnName])-parseFloat(last[columnName])
        }
      }
    else 
      orderFunc=(prev:ListItem,last:ListItem)=>{
        if(isNaN(parseFloat(prev[columnName]))||isNaN(parseFloat(last[columnName]))){
          return last[columnName].localeCompare(prev[columnName])
        }else{
          return parseFloat(last[columnName])-parseFloat(prev[columnName])
        }
      }
    let dataInNewOrder=listLatestData.sort(orderFunc)
    setListLatestData([...dataInNewOrder]) // todo 为何此处必须解构?否则无法触发重新render
    setCurrentPageNumber(1)
  }
  useEffect(function () {
    // 获取新冠数据
    // 给useEffect传递第二个参数为空数组，代表仅在componentDidMount执行副作用并且在componentWillUnmount
    // 清除副作用，否则在componentDidUpdate也会执行该effect,而setState又会导致重新render,导致
    // 出现无限请求,无限请求的背后是无限次重新render
    getData().then(data => {
      setAllStatistics(data)
      const tempListLatestData:ListDataSet=[]
      for (let item in data) {
        let country = item
        let lastIndex = data[item].length - 1
        let population = data[item][lastIndex].population
        let total_case = data[item][lastIndex].total_case
        let total_death = data[item][lastIndex].total_death
        tempListLatestData.push(
          {country,population,total_case,total_death}
        )
      }
      setListLatestData(tempListLatestData)
    })
  },[])
  return (
    <div className="App">
      <div className="left-fill-up"></div>
      <div className="container">
        <List 
          data={getCurrentPageStatistics(listLatestData,currentPageNumber)} 
          showCountry={customShowCountry}
          switchPage={switchPage}
          currentPageNumber={currentPageNumber}
          pageLength={Math.ceil(Object.keys(allStatistics).length/pageSplitNumber)}
          reOrderData={reOrderData}
        />
      </div>
      <div className="right-fill-up"></div>
    </div>
  )
}