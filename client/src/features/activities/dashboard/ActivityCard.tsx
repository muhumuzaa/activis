import { Activity } from "../../../app/models/activity"


const ActivityCard = ({activity,viewActivityDetails }: {activity: Activity, viewActivityDetails: (id: string) => void}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h4>{activity.title}</h4>
        <p>{activity.city}</p>
        <p>{activity.date}</p>
        <div className="flex justify-between mt-4">
            <button className="border border-gray-300 p-2 rounded-lg">{activity.category}</button>
            <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={() =>viewActivityDetails(activity.id)}>View</button>
        </div>
    </div>
  )
}

export default ActivityCard