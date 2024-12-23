import { Activity } from "../../../app/models/activity";
import { FaRunning } from "react-icons/fa";

const ActivityCard = ({ activity, onViewDetails }: { activity: Activity, onViewDetails: (id: string) => void }) => {
  return (
    <div className=" w-full bg-white rounded-lg shadow-md p-6">
      <div className="  flex items-center space-x-4">
        <div className="text-blue-500">
          <FaRunning />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{activity.title}</h2>
          <p>{activity.date}</p>
          <p>{activity.venue}</p>
          <p>{activity.city}</p>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button className="py-1 px-4 border border-gray-200 rounded-lg">{activity.category}</button>
        <button className="py-1 px-4 bg-blue-500 text-white rounded-lg border border-blue-500" onClick={() => onViewDetails(activity.id)}>View</button>
      </div>
    </div>
  );
};

export default ActivityCard;
