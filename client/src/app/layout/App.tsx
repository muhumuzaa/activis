import { useEffect, useState } from "react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import NavBar from "./Navbar";
import { Activity } from "../models/activity";
import axios from "axios";
import { ViewMode } from "../models/viewMode";


const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("none");

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
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

  const handleCancel = () => {
    if (selectedActivity) {
      setViewMode("view");
    } else {
      setViewMode("none");
      setSelectedActivity(null);
    }
  };

  const handleEditActivity = (id: string) => {
    const activity = activities.find((a) => a.id === id);
    setSelectedActivity(activity || null);
    setViewMode("edit");
  };

  const handleDeleteActivity = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/activities/${id}`);
      // Remove deleted activity from UI
      setActivities((prev) => prev.filter((a) => a.id !== id));
      // Reset view mode if the deleted activity was being viewed or edited
      if (selectedActivity?.id === id) {
        setSelectedActivity(null);
        setViewMode("none");
      }
      console.log("Deleted activity with id:", id);
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("Failed to delete activity. Please try again.");
    }
  };

  const handleOnCreateUpdateActivity = async (newActivity: Activity) => {
    const isUpdate = activities.some(a => a.id === newActivity.id);
  
    if (isUpdate) {
      // **Update Activity**
      try {
        // Corrected URL with double slashes
        const response = await axios.put<Activity>(
          `http://localhost:5000/api/activities/${newActivity.id}`,
          newActivity
        );
        console.log('Updated activity: ', response.data);
  
        // Update UI state by replacing the old activity with the updated one
        setActivities(prev =>
          prev.map(a => (a.id === response.data.id ? response.data : a))
        );
  
        // Display the updated activity details
        handleViewActivityDetails(response.data.id);
      } catch (error) {
        console.error("Error updating activity:", error);
        alert("Failed to update activity. Please try again.");
      }
    } else {
      // **Create Activity**
      try {
        const response = await axios.post<Activity>(
          'http://localhost:5000/api/activities',
          newActivity
        );
  
        console.log("Created Activity Response:", response.data);
  
        if (!response.data.id) {
          throw new Error("Created activity is missing an id.");
        }
  
        // Add new activity to the activities list
        setActivities(prev => [...prev, response.data]);
  
        // Display the new activity details
        handleViewActivityDetails(response.data.id);
      } catch (error) {
        console.log('Error creating an activity', error);
        alert('Error creating activity');
      }
    }
  };
  

  return (
    <div>
      <NavBar createActivity={handleCreateActivity} />
      <ActivityDashboard
        activities={activities}
        viewActivityDetails={handleViewActivityDetails}
        selectedActivity={selectedActivity}
        viewMode={viewMode}
        onCancel={handleCancel}
        editActivity={handleEditActivity}
        deleteActivity={handleDeleteActivity}
        onCreateUpdateActivity={handleOnCreateUpdateActivity}
      />
    </div>
  );
};

export default App;