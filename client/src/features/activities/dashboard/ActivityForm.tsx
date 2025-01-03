import { useState } from "react";
import { Activity } from "../../../app/models/activity";

const ActivityForm = ({
  onCancel,
  selectedActivity,
}: {
  onCancel: () => void;
  selectedActivity: Activity | null;
}) => {
  const [formData, setFormData] = useState({
    title: selectedActivity?.title || "",
    category: selectedActivity?.category || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div>
      <form>
        <div>
          <label htmlFor="title" className="w-full block">
            Title
          </label>
          <input
            name="title"
            className="w-full block "
            onChange={handleInputChange}
            value={formData.title}
          />
        </div>
        <div>
          <label htmlFor="category" className="w-full block">
            Category
          </label>
          <input
            name="category"
            className="w-full block "
            onChange={handleInputChange}
            value={formData.category}
          />
        </div>
        <div className="flex justify-between">
          <button className="bg-gray-500 text-white p-2" onClick={onCancel}>
            Cancel
          </button>
          <button className="bg-red-500 text-white p-2">Update</button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
