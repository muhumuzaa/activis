import { Activity } from "../../../app/models/activity";

const ActivityCard = ({
  activity,
  viewActivityDetails,
}: {
  activity: Activity;
  viewActivityDetails: (id: string) => void;
}) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm mb-4">
      <h4>{activity.title}</h4>
      <p>{activity.city}</p>
      <p>{activity.date}</p>
      <div className="flex justify-between mb-4">
        <button className="border border-gray-400 py-1 px-3">
          {activity.category}
        </button>
        <button
          className="border bg-blue-500 text-white py-1 px-3"
          onClick={() => viewActivityDetails(activity.id)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
