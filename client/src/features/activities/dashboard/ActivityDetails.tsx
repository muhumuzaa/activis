
import { Activity } from "../../../app/models/activity"



const ActivityDetails = ({activity, onEdit}: {activity: Activity, onEdit: (id: string) => void}) => {
    
   
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow">
        <a href="#">
            <img src={`categoryImages/${activity.category}.jpg`}/>
        </a>
        <div className="p-4">
            <a href="#"><h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{activity.title}</h5></a>
            <p className="mb-3 font-normal text-gray-700 ">{activity.category}</p>
            <p className="mb-3 font-normal text-gray-700 ">{activity.city}</p>
            <p className="mb-3 font-normal text-gray-700 ">{activity.date}</p>
            <p className="mb-3 font-normal text-gray-700 ">{activity.venue}</p>
            <p className="mb-3 font-normal text-gray-700 ">{activity.description}</p>
        </div>
        <div className="flex justify-between mt-4 py-4 px-2">
        <button className="py-2 px-4 border bg-blue-500  border-blue-500 rounded-lg text-white" onClick={() => onEdit(activity.id)}>Edit</button>
        <button className="py-2 px-4  rounded-lg border border-gray-800" >Cancel</button>
      </div>
    </div>
  )
}

export default ActivityDetails