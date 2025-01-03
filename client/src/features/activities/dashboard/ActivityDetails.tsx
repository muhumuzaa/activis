import { Activity } from "../../../app/models/activity"


const ActivityDetails = ({selectedActivity,editActivity}: {selectedActivity: Activity , editActivity: (id: string)=>void}) => {
  return (
    <div className="bg-white rounded-lg sticky top-20">
        <img src={`categoryImages/${selectedActivity?.category}.jpg`} alt="" />
        <div className="p-4">
            <p>{selectedActivity.title}</p>
            <p>{selectedActivity?.category}</p>
            <p>{selectedActivity?.date}</p>
            <p>{selectedActivity?.city}</p>
            <p>{selectedActivity?.description}</p>

            <div className="flex justify-between">
                <button className="bg-blue-500 text-white p-2" type="button" onClick={() =>editActivity(selectedActivity?.id)}>Edit</button>
                <button className="bg-red-500 text-white p-2" type="button">Delete</button>
            </div>
        </div>
    </div>
  )
}

export default ActivityDetails