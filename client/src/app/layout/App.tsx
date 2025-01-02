import { useEffect, useState } from "react";
import ActivitiesDashbaord from "../../features/activities/dashboard/ActivitiesDashbaord";
import NavBar from "./Navbar";
import axios from "axios";
import { Activity } from "../models/activity";

type ViewMode = 'none' | 'view' | 'edit' | 'create';
const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivities] = useState<Activity | null>(
    null
  );

  const [viewMode, setViewMode] = useState<ViewMode>('none')

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
    setViewMode('view')
  };

  const handleCreateActivity = () => {
    setSelectedActivities(null)
    setViewMode('create')
  };

  const handleEditActivity =(id: string) =>{
    const activity = activities.find(a => a.id === id);
    setSelectedActivities(activity || null);
    setViewMode('edit')
  }

  const handleUpdateActivity = () => {
    setViewMode('create')
  
  }

  const handleCancel = () => {
    setViewMode('none')
    
    
  }

  return (
    <div>
      <NavBar createActivity={handleCreateActivity} />
      <ActivitiesDashbaord
        activities={activities}
        viewActivityDetails={handleViewActivityDetails}
        selectedActivity={selectedActivity}
        
        editActivity ={handleEditActivity}
        onUpdate={handleUpdateActivity}
        onCancel = {handleCancel}
        viewMode = {viewMode}
      />
    </div>
  );
};

export default App;
