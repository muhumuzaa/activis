import { Activity } from "../../../app/models/activity";

const ActCard = ({ activity, viewDetails }: { activity: Activity, viewDetails : (id: string) =>void }) => {
  return (
    <div className="rounded-lg bg-white shadow-md w-full p-4">
      <h4 className="font-semibold">{activity.title}</h4>
      <p className="text-sm">{activity.city}</p>
      <p className="text-sm">{activity.venue}</p>
      <p className="text-sm">{activity.date}</p>
      <div className="flex justify-between mt-4">
        <button className="py-1 px-4 border border-gray-200 rounded-lg">
          {activity.category}
        </button>
        <button className="py-1 px-4 bg-blue-500 text-white rounded-lg border border-blue-500" onClick={() =>viewDetails(activity.id)}>
          View
        </button>
      </div>
    </div>
  );
};

export default ActCard;
