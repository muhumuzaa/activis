import { useEffect, useState } from "react";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard";
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

  const handleOnCancel =() =>{
    setViewMode('none')
  }

  const handleOnCreateOrUpdate = async (newActivity: Activity) =>{
    
    const isUpdate = activities.some(a => a.id === newActivity.id);

  if (isUpdate) {
    try {
      // Update the activity
      const response = await axios.put<Activity>(
        `http://localhost:5000/api/activities/${newActivity.id}`,
        newActivity
      );
      console.log('Updated activity: ', response.data);

      // Update UI state by replacing the old activity with the updated one
      setActivities(prev =>
        prev.map(a => (a.id === response.data.id ? response.data : a))
      );

      // Directly set the updated activity as selected
      setSelectedActivity(response.data);
      setViewMode("view");
    } catch (error) {
      console.error("Error updating activity:", error);
      alert("Failed to update activity. Please try again.");
    }
  }else{
      const response = await axios.post<Activity>('http://localhost:5000/api/activities', newActivity);
      console.log('created new activity', response.data);
      setViewMode('none');
    }
  }

  const handleOnEditActivity =() =>{
    setViewMode('edit')
  }

  return (
    <div>
      <NavBar createActivity={handleCreateActivity} />
      <ActivitiesDashboard
        activities={activities}
        viewActivityDetails={handleViewActivityDetails}
        selectedActivity={selectedActivity}
        viewMode={viewMode}
        onCancel={handleOnCancel}
        onCreateOrUpdate ={handleOnCreateOrUpdate}
        onEditActivity ={handleOnEditActivity}
      />
    </div>
  );
};

export default App;
