import { Activity } from "../../../app/models/activity";

interface ActivityCardProps {
  activity: Activity;
  viewActivityDetails: (id: string) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, viewActivityDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h4>{activity.title}</h4>
      <p>{new Date(activity.date).toLocaleString()}</p> {/* Formatted Date */}
      <p>{activity.city}</p>

      <div className="flex justify-between">
        <button className="border border-gray-200 p-2">{activity.category}</button>
        <button
          className="bg-blue-500 text-white p-2"
          onClick={() => viewActivityDetails(activity.id)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
