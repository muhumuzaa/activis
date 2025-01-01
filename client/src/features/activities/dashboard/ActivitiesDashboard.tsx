import { Activity } from "../../../app/models/activity";
import ActivityCard from "./ActivityCard";
import ActivityDetails from "./ActivityDetails";

const ActivitiesDashboard = ({
  activities,
  viewActivityDetails,
  selectedActivity
}: {
  activities: Activity[];
  viewActivityDetails: (id: string) => void;
  selectedActivity: Activity | null
}) => {

    
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto flex space-x-6 py-6">
        <div className="w-1/3">
          {activities.map((activity) => (
            <ActivityCard
              activity={activity} key={activity.id}
              viewActivityDetails={viewActivityDetails}
            />
          ))}
        </div>
        <div className="w-2/3">

          {selectedActivity &&<ActivityDetails  selectedActivity = {selectedActivity}/>}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesDashboard;
