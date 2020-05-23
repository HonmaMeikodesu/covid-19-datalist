import React, { Suspense, useState, useEffect } from 'react'
import { getData, MergeCountryStatistics } from './common/utils/getCovidData'
const List = React.lazy(() => import('./List'))
type allStatistics = MergeCountryStatistics
function showCountry(country:string):JSX.Element{
  return(
    <div>{country}</div>
  )
}
export default function App() {
  const [allStatistics, setAllStatistics] = useState<allStatistics>({})
  useEffect(function () {
    getData().then(data => {
      setAllStatistics(data)
    })
  },[])
  return (
    <div className="App">
      <Suspense fallback="Loading.....">
        <List data={allStatistics} showCountry={showCountry} />
      </Suspense>
    </div>
  )
}