import { useEffect, useState } from "react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import NavBar from "./Navbar";
import { Activity } from "../models/activity";
import axios from "axios";
import { ViewMode } from "../models/viewMode";



const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const [viewMode, setViewMode] = useState<ViewMode>("none");

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  const handleViewActivityDetails = (id: string) => {
    const activity = activities.find((a) => a.id === id);
    setSelectedActivity(activity || null);
    setViewMode("view");
  };

  const handleCreateActivity = () => {
    setViewMode("create");
  };

  const handleCancel =() =>{
    setViewMode('none')
  }

  const handleEditActivity = (id: string) =>{
    const activity = activities.find(a => a.id === id);
    setSelectedActivity(activity || null);
    setViewMode('edit')
  }

  return (
    <div>
      <NavBar createActivity={handleCreateActivity} />
      <ActivityDashboard
        activities={activities}
        viewActivityDetails={handleViewActivityDetails}
        selectedActivity={selectedActivity}
        viewMode={viewMode}
        
        onCancel ={handleCancel}
        editActivity ={handleEditActivity}
      />
    </div>
  );
};

export default App;
