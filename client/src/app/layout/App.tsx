import { useEffect, useState } from "react"
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard"
import NavBar from "./Navbar"
import axios from "axios";
import { Activity } from "../models/activity";

const App = () => {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response =>{
      setActivities(response.data);
    })
  }, []);

  const handleViewActivityDetails = (id: string) =>{
    const activityToView = activities.find(a =>a.id === id);
    setSelectedActivity(activityToView || null);

  }

  return (
    <div>
      <NavBar />
      <ActivitiesDashboard activities = {activities} viewActivityDetails ={handleViewActivityDetails} selectedActivity ={selectedActivity}/>
    </div>
  )
}

export default App