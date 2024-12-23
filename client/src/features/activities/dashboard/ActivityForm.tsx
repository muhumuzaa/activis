import { useState } from "react";
import { Activity } from "../../../app/models/activity";

const ActivityForm = ({
  activity, 
  onCancel, 
  onSave
}: {
    activity: Activity; 
    onCancel: () => void;
    onSave: (updateActivity: Activity) =>void;
  }) => {

  const [formData, setFormData] = useState<Activity>(activity);
 
  const handleInputChange =(event: any) =>{
    const {name, value} = event.target;
    setFormData({...formData, [name]: value})
  }

  const handleSubmit =(e) =>{
    e.preventDefault();
    onSave(formData);
  }

  return (
    <div className="mt-4 bg-white p-4 rounded shadow">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 block w-full rounded-md border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="p-2 mt-1 block w-full rounded-md border border-gray-200  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className=" p-2 mt-1 block w-full rounded-md border border-gray-200  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="p-2 mt-1 block w-full rounded-md border border-gray-200  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="city">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="p-2 mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="venue">
            Venue
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            required
            className="p-2 mt-1 block w-full rounded-md border border-gray-200  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="pt-6 flex justify-between">
            <button type="submit" className="bg-blue-400 hover:bg-blue-600 py-1 px-4 rounded text-white" typeof="submit">Update</button>
            <button type="submit" className="border border-gray-500 hover:bg-gray-400 py-1 px-4 rounded " onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
