import { useState } from "react";
import { Activity } from "../../../app/models/activity";

const ActivityForm = ({
  selectedActivity,
  onUpdate
}: {
  selectedActivity: Activity | null;
  onUpdate: () => void
}) => {

    const [formData, setFormData] = useState({
        title: selectedActivity?.title || '',
        description: selectedActivity?.description || '',
        category: selectedActivity?.category || '',
        date: selectedActivity?.date || '',
        venue: selectedActivity?.venue || '',
        city: selectedActivity?.city || ''
    });

    const handleInputChange =(e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    
    

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <form onSubmit={onUpdate}>
        <div className="mb-4">
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            name="title"
            type="text"
            onChange={handleInputChange}
            value={formData.title || ""}
            className="block border border-gray-200 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block">
            Description
          </label>
          <input
            name="description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            className="block border border-gray-200 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block">
            Category
          </label>
          <input
            name="category"
            type="text"
            value={formData.category}
            onChange={handleInputChange}
            className="block border border-gray-200 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block">
            Date
          </label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            className="block border border-gray-200 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="venue" className="block">
            Venue
          </label>
          <input
            name="venue"
            type="text"
            value={formData.venue}
            onChange={handleInputChange}
            className="block border border-gray-200 rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block">
            City
          </label>
          <input
            name="city"
            type="text"
            value={formData.city}
            onChange={handleInputChange}
            className="block border border-gray-200 rounded-lg w-full"
          />
        </div>

        <div className="flex justify-between mt-4 ">
          <button className="bg-gray-400 text-white py-1 px-3" type="button">Cancel</button>
          <button className="border bg-blue-500 text-white py-1 px-3" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
