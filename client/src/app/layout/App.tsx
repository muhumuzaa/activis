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

  // Helper function to sort activities by date descending
  const sortActivitiesByDateDesc = (activities: Activity[]): Activity[] => {
    return [...activities].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };



  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        const sortedActivities = sortActivitiesByDateDesc(response.data);
        setActivities(sortedActivities);
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
      // Remove deleted activity from UI and sort the remaining activities
      setActivities(prev => sortActivitiesByDateDesc(prev.filter((a) => a.id !== id)));
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
      try {
        // Corrected URL with double slashes
        const response = await axios.put<Activity>(
          `http://localhost:5000/api/activities/${newActivity.id}`,
          newActivity
        );
        console.log('Updated activity: ', response.data);

        // Update UI state by replacing the old activity with the updated one and sort
        setActivities(prev =>
          sortActivitiesByDateDesc(
            prev.map(a => (a.id === response.data.id ? response.data : a))
          )
        );

        // Directly set the updated activity as selected
        setSelectedActivity(response.data);
        setViewMode("view");
      } catch (error) {
        console.error("Error updating activity:", error);
        alert("Failed to update activity. Please try again.");
      }
    } else {
      // Create new activity
      try {
        const response = await axios.post<Activity>(
          'http://localhost:5000/api/activities',
          newActivity
        );

        console.log("Created Activity Response:", response.data);

        if (!response.data.id) {
          throw new Error("Created activity is missing an id.");
        }

        // Add new activity to the activities list and sort
        setActivities(prev => sortActivitiesByDateDesc([...prev, response.data]));

        // Display the new activity
        setSelectedActivity(response.data);
        setViewMode("view");
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
