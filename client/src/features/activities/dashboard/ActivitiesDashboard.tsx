import { Activity } from "../../../app/models/activity";
import { ViewMode } from "../../../app/models/viewMode";
import ActivityCard from "./ActivityCard";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";

const ActivitiesDashboard = ({
  activities,
  viewActivityDetails,
  onCancel,
  selectedActivity,
  viewMode,
  onCreateOrUpdate,
  onEditActivity,
}: {
  activities: Activity[];
  viewActivityDetails: (id: string) => void;
  onCancel: () => void;
  selectedActivity: Activity | null;
  viewMode: ViewMode;
  onCreateOrUpdate: (newActivity: Activity) => Promise<void>;
  onEditActivity: () => void;
}) => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto flex py-6 space-x-6">
        <div className="w-1/2">
          {activities.map((activity) => (
            <ActivityCard
              activity={activity}
              key={activity.id}
              viewActivityDetails={viewActivityDetails}
            />
          ))}
        </div>
        <div className="w-1/2">
          {viewMode === "view" && (
            <ActivityDetails
              selectedActivity={selectedActivity}
              onEditActivity={onEditActivity}
            />
          )}

          {(viewMode === "edit" || viewMode === "create") && (
            <ActivityForm
              selectedActivity={viewMode === "edit" ? selectedActivity : null}
              onCancel={onCancel}
              onCreateOrUpdate={onCreateOrUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesDashboard;
