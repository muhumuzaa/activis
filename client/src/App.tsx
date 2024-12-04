import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
 const [activities, setActivities] = useState([])

 useEffect(()=>{
  axios.get('http://localhost:5000/api/activities')
  .then(response =>{
    console.log(response);
    
    setActivities(response.data)
 })
 }, [])


  return (
    <div>
      <h1 className='text-3xl'>Reactivities</h1>
      <ul>
        {
          activities.map((activity: any) =>(
            <li key={activity.id} >{activity.title}</li>
            
          ))
        }
      </ul>
    </div>
  ) 
}

export default App
