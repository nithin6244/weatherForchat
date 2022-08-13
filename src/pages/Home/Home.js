import React, { useEffect, useState } from 'react';

import './Home.scss'
import Header from '../Header/Header';
import Feed from '../Feed/Feed'
/* 
    This is just a sample introduction file.
    You can clear the code written in this file and start writing your own code.
*/

export default function Home(){

    const key='b2623e558cf5d9ea0b9ef4d4d0cc67d7'
    let city='Kolkata'
    
    let [weathData,setWeathData]=useState('');
    
    useEffect(() => {
        
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`,)
      .then(response => response.json())
      .then(data => setWeathData(data))
      .catch(err => console.log(err))
    }, [])

    
    //displays background based on time of day
    const backgroundColor=() => {

      const date=new Date()

      let hours=date.getHours()
     let minutes=date.getMinutes()

      //return morning for time between 6Am to 5PM
      if(hours>=6 && hours<17){
        return 'morning '
      }
       //return morning for time between 5PM to 7:30pm
      else if((hours>=17 && hours<=18) || (hours==19 && minutes<=30)){
        return 'evening '
      }
      //return night from 7:30Pm to 6AM
      else
        return 'night '
    }

    //to set backgroung gif if its stormy or rainy
    const backgroundImage=() => {
      if(weathData && weathData.weather[0].main=='Rain'){
        return 'rain '
      }
      if(weathData && weathData.weather[0].main=='Stormy'){
        return 'stormy '
      }


    }

        return (
          <div className={'container ' + backgroundColor()+backgroundImage()}>
            <Header />
            {weathData &&
             <Feed 
                data={weathData} />}

            {console.log(weathData)}
          </div>
            
        )
    
}


