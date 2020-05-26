import React, { useState } from 'react'
import './common/css/List.css'
interface IshowCountry {
  (country: string): JSX.Element
}
interface Props {
  showCountry: IshowCountry
  data: ListDataSet,
  switchPage: (newPageNumber: number) => void,
  currentPageNumber: number,
  pageLength: number,
  reOrderData(column:ListColumn,order:RankOrder):void
}
const DESCEND_ICON = <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2341" width="30" height="30"><path d="M512 685.248l-278.624-278.624 45.248-45.248L512 594.752l233.376-233.376 45.248 45.248z" fill="#181818" p-id="2342"></path></svg>
const ASCEND_ICON = <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2464" width="30" height="30"><path d="M745.376 662.624L512 429.248l-233.376 233.376-45.248-45.248L512 338.752l278.624 278.624z" fill="#181818" p-id="2465"></path></svg>
function listAllData(data: ListDataSet, showCountry: IshowCountry) { // 将数据组装成JSX元素列表
  let latestWorldStatistics: Array<JSX.Element> = []
  if (latestWorldStatistics.length !== 0) return latestWorldStatistics
  for (let item of data) {
    latestWorldStatistics.push(
      <div className="list-item" key={item.country}>
        <div className="country">{showCountry(item.country)}</div>
        <div className="population">{item.population}</div>
        <div className="total-case">{item.total_case}</div>
        <div className="total-death">{item.total_death}</div>
      </div>
    )
  }
  return latestWorldStatistics
}
function showPageSpliter(pageNumber: number, pageLength: number, switchPage: (newPageNumber: number) => void): JSX.Element {
  let page: Array<JSX.Element> = []
  let pageToJump: string = '' // 闭包变量
  if (pageNumber > 1) page.push(<li key="last-page" className="page prev-page" onClick={() => switchPage(pageNumber - 1)}><button>上一页</button></li>)
  if (pageNumber !== 1)
    page.push(<li key={1} className="page" onClick={() => switchPage(1)}><button>1</button></li>)
  if (pageNumber > 5) {
    page.push(<li key='pre-more' className="page page-more"><strong>...</strong></li>)
    for (let i = pageNumber - 3; i >= pageNumber - 1; i++) {
      page.push(<li key={i} className="page" onClick={() => switchPage(i)}><button>{i}</button></li>)
    }
  } else {
    for (let i = 2; i < pageNumber; i++) {
      page.push(<li key={i} className="page" onClick={() => switchPage(i)}><button>{i}</button></li>)
    }
  }
  page.push(<li key={pageNumber} className="page page-active" onClick={() => switchPage(pageNumber)}><button>{pageNumber}</button></li>)
  if (pageNumber + 5 < pageLength) {
    for (let i = pageNumber + 1; i <= pageNumber + 3; i++) {
      page.push(<li key={i} className="page" onClick={() => switchPage(i)}><button>{i}</button></li>)
    }
    page.push(<li key='last-more' className="page page-more"><strong>...</strong></li>)
  } else {
    for (let i = pageNumber + 1; i <= pageLength - 1; i++) {
      page.push(<li key={i} className="page" onClick={() => switchPage(i)}><button>{i}</button></li>)
    }
  }
  if (pageNumber !== pageLength)
    page.push(<li key={pageLength} className="page" onClick={() => switchPage(pageLength)}><button>{pageLength}</button></li>)
  if (pageNumber < pageLength)
    page.push(<li key="next-page" className="page next-page" onClick={() => switchPage(pageNumber + 1)}><button>下一页</button></li>)
  page.push(<li key="jump-page" className="page"><input className="page-jump" type="text" onChange={e => { pageToJump = e.target.value }} /></li>)
  page.push(<li key="jump-confirmed" className="page"><strong className="page-jump-confirmed" onClick={() => switchPage(parseInt(pageToJump))}>跳转</strong></li>)
  return (
    <ul className="page-spliter">
      {page}
    </ul>
  )
}
function showRankArrow(rankOrder: RankOrder): JSX.Element {
  if (rankOrder === 0) return DESCEND_ICON
  else return ASCEND_ICON
}
export interface ListItem {
  country: string,
  population: string
  total_case: string
  total_death: string
}
export enum ListColumn { country, population, total_case, total_death }
export enum RankOrder { descend, asend }
export type ListDataSet = Array<ListItem>
export default function List(props: Props) {
  const [rankColumn, setRankColumn] = useState<ListColumn>(-1)
  const [rankOrder, setRankOrder] = useState<RankOrder>(0)
  function reOrder(column:ListColumn):void{
    if(column===rankColumn){
      switch(rankOrder){
        case 0:
          setRankOrder(1)
          props.reOrderData(column,1)
          break
        case 1:
          setRankOrder(0)
          props.reOrderData(column,0)
      }
    }else{
      setRankOrder(0)
      setRankColumn(column)
      props.reOrderData(column,0)
    }
  }
  return (
    <>
      <div className="header">
        <div className="header-title" onClick={()=>reOrder(0)}>
          <div>{ListColumn[0]}</div>
          <div>
            {rankColumn === 0 && showRankArrow(rankOrder)}
          </div>
        </div>
        <div className="header-title" onClick={()=>reOrder(1)}>
          <div>{ListColumn[1]}</div>
          <div>
            {rankColumn === 1 && showRankArrow(rankOrder)}
          </div>
        </div>
        <div className="header-title" onClick={()=>reOrder(2)}>
          <div>{ListColumn[2]}</div>
          <div>
            {rankColumn === 2 && showRankArrow(rankOrder)}
          </div>
        </div>
        <div className="header-title" onClick={()=>reOrder(3)}>
          <div>{ListColumn[3]}</div>
          <div>
            {rankColumn === 3 && showRankArrow(rankOrder)}
          </div>
        </div>
      </div>
      <div className="list">
        {props.data.length !== 0 ? listAllData(props.data, props.showCountry) : <span>加载中...</span>}
      </div>
      <div className="footer">
        {props.data.length !== 0 && showPageSpliter(props.currentPageNumber, props.pageLength, props.switchPage)}
      </div>
    </>
  )
}