import { Activity } from "../../../app/models/activity";
import { ViewMode } from "../../../app/models/viewMode";
import ActivityCard from "./ActivityCard";
import ActivityDetails from "./ActivityDetails";
import ActivityForm from "./ActivityForm";



const ActivityDashboard = ({
  activities,
  viewActivityDetails,
  selectedActivity,
  viewMode,
 
  onCancel,
  editActivity
  
}: {
  activities: Activity[];
  viewActivityDetails: (id: string) => void;
  selectedActivity: Activity | null;
  viewMode: ViewMode;

  onCancel: () => void;
  editActivity: (id: string) => void
}) => {

    
  return (
    <div className="bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto flex space-x-6">
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
        {viewMode === 'view' && selectedActivity && <ActivityDetails selectedActivity ={selectedActivity} editActivity  ={editActivity}/>}
        {viewMode === 'create' && <ActivityForm onCancel = {onCancel} selectedActivity ={null}/>}
        {viewMode === 'edit' && selectedActivity && <ActivityForm onCancel = {onCancel} selectedActivity ={selectedActivity}/>}
          
        </div>
      </div>
    </div>
  );
};

export default ActivityDashboard;
