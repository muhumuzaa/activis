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
  onUpdate
}: {
  activities: Activity[];
  viewActivityDetails: (id: string) => void;
  selectedActivity: Activity | null;
  isFormOpen: boolean;
  editActivity: (id: string) => void;
  onUpdate: () => void
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
        {
            isFormOpen ? <ActivityForm selectedActivity ={selectedActivity} onUpdate ={onUpdate}/>: (selectedActivity &&<ActivityDetails selectedActivity = {selectedActivity} editActivity ={editActivity}/>)
        }
          
        </div>
      </div>
    </div>
  );
};

export default ActivitiesDashbaord;
