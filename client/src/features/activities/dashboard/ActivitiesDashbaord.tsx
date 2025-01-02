import { Activity } from "../../../app/models/activity";
import ActivityCard from "./ActivityCard";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";

const ActivitiesDashbaord = ({
  activities,
  viewActivityDetails,
  selectedActivity,
  isFormOpen,
  editActivity,
  onUpdate,
  onCancel,
  isViewing
}: {
  activities: Activity[];
  viewActivityDetails: (id: string) => void;
  selectedActivity: Activity | null;
  isFormOpen: boolean;
  editActivity: (id: string) => void;
  onUpdate: () => void;
  onCancel: () => void;
  isViewing: boolean
}) => {
  return (
    <div className="bg-gray-100">
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
          {isFormOpen ? (
            <ActivityForm
              selectedActivity={selectedActivity || null}
              onUpdate={onUpdate}
              onCancel = {onCancel}
            />
          ) : (
            isViewing? selectedActivity && (
              <ActivityDetails
                selectedActivity={selectedActivity}
                editActivity={editActivity}
              />
            ): <p>Choose activity to view</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesDashbaord;
