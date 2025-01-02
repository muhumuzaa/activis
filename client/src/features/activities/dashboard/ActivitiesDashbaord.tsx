import { Activity } from "../../../app/models/activity";
import ActivityCard from "./ActivityCard";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";

type ViewMode = "none" | "view" | "create" | "edit";

const ActivitiesDashbaord = ({
  activities,
  viewActivityDetails,
  selectedActivity,
  viewMode,
  editActivity,
  onUpdate,
  onCancel,
}: {
  activities: Activity[];
  viewActivityDetails: (id: string) => void;
  selectedActivity: Activity | null;

  editActivity: (id: string) => void;
  onUpdate: () => void;
  onCancel: () => void;
  viewMode: ViewMode;
}) => {
  return (
    <div className="bg-gray-100 pt-16">
      <div className="max-w-7xl mx-auto h-full flex py-6 space-x-6">
        <div className="w-1/2 ">
          {activities.map((activity) => (
            <ActivityCard
              activity={activity}
              key={activity.id}
              viewActivityDetails={viewActivityDetails}
            />
          ))}
        </div>
        <div className="w-1/2">
        {viewMode === 'view' && selectedActivity && <ActivityDetails selectedActivity={selectedActivity} editActivity={editActivity}/>}
        {viewMode === 'create' && <ActivityForm selectedActivity={null} onCancel={onCancel} onUpdate={onUpdate}/>}
        {viewMode === 'edit' && selectedActivity && (<ActivityForm selectedActivity={selectedActivity} onCancel={onCancel} onUpdate={onUpdate}/>)}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesDashbaord;
