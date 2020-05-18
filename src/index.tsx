import React from 'react'
import './common/css/List.css'
import {getData} from './common/utils/getCovidData'
import ReactDOM from 'react-dom';
interface LatestData{
    population:string
    total_case:string
    total_death:string
}
interface MergeCountryStatistics{
  [countryName:string]:Array<LatestData>
}
interface Props{
}
interface State{
  data:MergeCountryStatistics
}
export default class List extends React.Component<Props,State>{
  private latestWorldStatistics:Array<JSX.Element>=[]
  constructor(props:Props){
    super(props)
    this.state={data:{}}
    this.listAllData=this.listAllData.bind(this)
  }
  private listAllData(data:MergeCountryStatistics):Array<JSX.Element>{
    if(this.latestWorldStatistics.length!==0) return this.latestWorldStatistics
    for(let item in data){
      let country=item
      let lastIndex=data[item].length-1
      let population=data[item][lastIndex].population
      let total_case=data[item][lastIndex].total_case
      let total_death=data[item][lastIndex].total_death
      this.latestWorldStatistics.push(
        <div className="list-item" key={country}>
          <div className="country">{country}</div>
          <div className="population">{population}</div>
          <div className="total-case">{total_case}</div>
          <div className="total-death">{total_death}</div>
        </div>
      )
    }
    return this.latestWorldStatistics
  }
  componentDidMount(){
    getData().then(data=>{
      this.setState({data:data})
    })
  }
  render(){
    return(
      <>
        <div className="header">
          <div>Country</div>
          <div>Population</div>
          <div>Total_case</div>
          <div>Total_death</div>
        </div>
        <div className="list">
          {Object.keys(this.state.data).length!==0?this.listAllData(this.state.data):'加载中....'}
        </div>
      </>
    )
  }
}
ReactDOM.render(
  <React.StrictMode>
    <List />
  </React.StrictMode>,
  document.getElementById('root')
);
