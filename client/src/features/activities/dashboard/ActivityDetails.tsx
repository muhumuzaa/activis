import { Activity } from "../../../app/models/activity";

const ActivityDetails = ({
  selectedActivity,
  editActivity
}: {
  selectedActivity: Activity;
  editActivity: (id: string) => void
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <img
        src={`categoryImages/${selectedActivity?.category}.jpg`}
        alt={selectedActivity?.title}
      />
      <div className="p-4">
        <h4>{selectedActivity?.title}</h4>
        <p>{selectedActivity?.city}</p>
        <p>{selectedActivity?.venue}</p>
        <p>{selectedActivity?.date}</p>
        <p>{selectedActivity?.category}</p>

        <div className="flex justify-between mt-4 ">
          <button className="bg-blue-500 text-white py-1 px-3" onClick={() =>editActivity(selectedActivity?.id)}>Edit</button>
          <button className="border bg-red-500 text-white py-1 px-3">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
