import { Activity } from "../../../app/models/activity";

import { useState } from "react";
import ActivityDetails from "./ActivityDetails";
import ActCard from "./ActCard";
import ActivityForm from "./ActivityForm";


// // const ActivityDashboard = ({ activities }: { activities: Activity[] }) => {

// //     const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

// //     const handleViewDetails = (id: string) =>{
// //         const activity = activities.find(a => a.id === id);
// //         setSelectedActivity(activity || null);

// //     };
// //   return (
// //     <div className="flex w-full space-x-4">
// //       <div className="w-3/4 bg-gray-100 p-6 rounded-lg shadow-md ">
// //         <ul>
// //           {activities.map((activity) => (
// //             <li key={activity.id} className="m-2">
// //               <ActivityCard activity={activity} onViewDetails = {handleViewDetails}/>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //       <div className="w-1/4 mt-10">

// //         {
// //             selectedActivity ? (
// //                 <ActivityDetails activity={selectedActivity}/>
// //             ) :
// //             <h4>Select an activity to view its details</h4>
// //         }
// //       </div>
// //     </div>
// //   );
// // };

// export default ActivityDashboard;

const ActivityDashboard = ({ activities }: { activities: Activity[] }) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const [activityToEdit, setActivityToEdit] = useState<Activity | null>(null);



  const handleViewDetails = (id: string) => {
    const activity = activities.find((a) => a.id === id);
    setSelectedActivity(activity || null);
  };

  const handleEdit = (id: string) => {
    const activity = activities.find((a) => a.id === id);
    setActivityToEdit(activity|| null);
   
    setSelectedActivity(null);
  };

  const handleCancel =() =>{
    setActivityToEdit(null);
    setSelectedActivity(activityToEdit)
  }

  const handleUpdateActivity =(updateActivity: Activity) =>{
    console.log(updateActivity);
    setActivityToEdit(null)
  }
  


  return (
    <div className="bg-gray-100">
      <div className="flex max-w-6xl mx-auto h-full p-6 space-x-8">
        <div className="w-1/2 space-y-4">
          {activities.map((activity) => (
            <ActCard
              activity={activity}
              viewDetails={handleViewDetails}
              key={activity.id}
            />
          ))}
        </div>

        <div className="w-1/2">
          <div>
            {selectedActivity ? (
              <ActivityDetails
                activity={selectedActivity}
                onEdit={handleEdit}
              />
            ) : (
              <h4>Select an activity to view its details</h4>
            )}
          </div>
          <div className="mt-8">
            {
                activityToEdit && (<div>
                    <h4 className="pl-4">Edit {activityToEdit.title}</h4>
                    <ActivityForm activity ={activityToEdit} onCancel={handleCancel} onSave={handleUpdateActivity}/>
                </div>) 
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDashboard;
