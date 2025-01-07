import { Activity } from "../../../app/models/activity";

const ActivityDetails = ({
  selectedActivity,
  onEditActivity
}: {
  selectedActivity: Activity | null;
  onEditActivity: () => void
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <img src={`categoryImages/${selectedActivity?.category}.jpg`} alt="" />
      <div className="p-3">
        <p>{selectedActivity?.title}</p>
        <p>{selectedActivity?.date}</p>
        <p>{selectedActivity?.city}</p>
        <p>{selectedActivity?.venue}</p>
        <p>{selectedActivity?.description}</p>
        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={() =>onEditActivity()}>
            Edit
          </button>
          <button className="bg-red-500 text-white p-2 rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
