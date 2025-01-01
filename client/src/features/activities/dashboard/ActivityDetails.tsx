import { Activity } from "../../../app/models/activity";

const ActivityDetails = ({
  selectedActivity,
}: {
  selectedActivity: Activity;
}) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <img
        src={`categoryImages/${selectedActivity.category}.jpg`}
        alt={selectedActivity.title}
      />
      <div className="p-4">
        <h4 className="text-lg">{selectedActivity.title}</h4>
        <p>{selectedActivity.category}</p>
        <p>{selectedActivity.city}</p>
        <p>{selectedActivity.date}</p>
        <p>{selectedActivity.venue}</p>
        <p>{selectedActivity.description}</p>

        <div className="flex justify-between mt-4">
          <button className="bg-blue-500  text-white py-1 px-2 rounded">
            Edit
          </button>
          <button className="bg-red-500 rounded py-1 px-2 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
