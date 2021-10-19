import React,{useState} from 'react';

const api={
  key:"9d561569387be75c37789fb1749295c6",
  base:"https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query,setQuery]=useState('')
  const [wheather,setwheather]=useState({});
  const search=evt=>{
    if(evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setQuery('')
        setwheather(result);
        })
    }
  }
  const dateBuilder=(d)=>{
      let mounths=["january","february","march","april","may","june","july","augast","september","october","november","december"];
      let days=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
      let day=days[d.getDay()];
      let date=d.getDate();
      let month=mounths[d.getMonth()];
      let year=d.getFullYear(); 
      return `${day} ${date} ${month} ${year}`
  }
  return (
    
    <div className={(typeof wheather.main != "undefined")?((wheather.main.temp > 16) ?'App warm' : 'App'):'App'}>
       <main>
         <div className="search-box">
            <input type="text" className="search-bar" placeholder="Search..." onChange={e=> setQuery(e.target.value)} value={query} onKeyPress={search} />
         </div>
         {(typeof wheather.main != "undefined") ?(
           <div>
              <div className="location-box">
                <div className="location">{wheather.name},{wheather.sys.country}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="wheather-box">
                <div className="temp">{Math.round(wheather.main.temp)}°C</div>
                <div className="wheather">{wheather.weather[0].main}</div>
              </div>
         </div>
         ):(
           <div className="undefined">
             <h1>not a valid state or country</h1>
           </div>
         )}
       </main>
    </div>
  );
}

export default App;

