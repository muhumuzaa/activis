import { Activity } from "../../../app/models/activity";

const ActivityCard = ({ activity, viewActivityDetails }: { activity: Activity, viewActivityDetails: (id: string) => void }) => {
  return (
    <div className="bg-white mb-4 rounded-lg shadow p-4">
      <div>
        <h4 className="font-semibold">{activity.title}</h4>
        <p>{activity.city}</p>
        <p>{activity.date}</p>
        <p>{activity.venue}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button className="border border-gray-300 py-1 px-2 rounded">{activity.category}</button>
        <button className="bg-blue-500 rounded py-1 px-2 text-white" onClick={() =>viewActivityDetails(activity.id)}>View</button>
      </div>
    </div>
  );
};

export default ActivityCard;
