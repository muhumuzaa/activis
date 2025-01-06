import { Activity } from "../../../app/models/activity";
import { ViewMode } from "../../../app/models/viewMode";
import ActivityCard from "./ActivityCard";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";

interface ActivityDashboardProps {
  activities: Activity[];
  viewActivityDetails: (id: string) => void;
  selectedActivity: Activity | null;
  viewMode: ViewMode;
  deleteActivity: (id: string) => void;
  onCancel: () => void;
  editActivity: (id: string) => void;
  onCreateUpdateActivity: (newActivity: Activity) => Promise<void>;
}

const ActivityDashboard: React.FC<ActivityDashboardProps> = ({
  activities,
  viewActivityDetails,
  selectedActivity,
  viewMode,
  deleteActivity,
  onCancel,
  editActivity,
  onCreateUpdateActivity,
}) => {
  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto flex space-x-6">
        <div className="w-1/2">
          {activities.map((activity) => (
            <ActivityCard
              activity={activity}
              key={activity.id} // Ensure unique key
              viewActivityDetails={viewActivityDetails}
            />
          ))}
        </div>
        <div className="w-1/2">
          {viewMode === "view" && selectedActivity && (
            <ActivityDetails
              selectedActivity={selectedActivity}
              editActivity={editActivity}
              deleteActivity={deleteActivity}
            />
          )}
          {viewMode === "create" && (
            <ActivityForm
              onCancel={onCancel}
              selectedActivity={null}
              onCreateUpdateActivity={onCreateUpdateActivity}
            />
          )}
          {viewMode === "edit" && selectedActivity && (
            <ActivityForm
              onCancel={onCancel}
              selectedActivity={selectedActivity}
              onCreateUpdateActivity={onCreateUpdateActivity} // Optional: handle differently if editing
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityDashboard;
