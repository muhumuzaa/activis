import { useEffect, useState } from "react";
import ActivitiesDashbaord from "../../features/activities/dashboard/ActivitiesDashbaord";
import NavBar from "./Navbar";
import axios from "axios";
import { Activity } from "../models/activity";

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivities] = useState<Activity | null>(
    null
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false)



  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  const handleViewActivityDetails = (id: string) => {
    const activity = activities.find((a) => a.id === id);
    setSelectedActivities(activity || null);
    setIsFormOpen(false);
    setIsViewing(true);
  };

  const handleCreateActivity = () => {
    setSelectedActivities(null)
    setIsFormOpen(true);
  };

  const handleEditActivity =(id: string) =>{
    const activity = activities.find(a => a.id === id);
    setSelectedActivities(activity || null);
    setIsFormOpen(true)
  }

  const handleUpdateActivity = () => {
    setIsFormOpen(false)
  
  }

  const handleCancel = () => {
    setIsFormOpen(false)
    
    
  }

  return (
    <div>
      <NavBar createActivity={handleCreateActivity} />
      <ActivitiesDashbaord
        activities={activities}
        viewActivityDetails={handleViewActivityDetails}
        selectedActivity={selectedActivity}
        isFormOpen ={isFormOpen}
        editActivity ={handleEditActivity}
        onUpdate={handleUpdateActivity}
        onCancel = {handleCancel}
        isViewing = {isViewing}
      />
    </div>
  );
};

export default App;
