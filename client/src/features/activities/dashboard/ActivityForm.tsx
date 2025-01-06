import { useEffect, useState } from "react";
import { Activity } from "../../../app/models/activity";

import { v4 as uuid } from "uuid"; // Import uuid



const ActivityForm = ({
  onCancel,
  selectedActivity,
  onCreateUpdateActivity,

}: {
    onCancel: () => void;
    selectedActivity: Activity | null;
    onCreateUpdateActivity: (newActivity: Activity) => Promise<void>;
    
    

}) => {

  const [formData, setFormData] = useState<Activity>({
    id: selectedActivity?.id || "", // Will set below
    title: selectedActivity?.title || "",
    category: selectedActivity?.category || "",
    description: selectedActivity?.description || "",
    city: selectedActivity?.city || "",
    venue: selectedActivity?.venue || "",
    date: selectedActivity?.date || "", // Will set below
  });

  useEffect(() =>{
    if(selectedActivity){
        setFormData({...selectedActivity, date: selectedActivity.date || new Date().toISOString(),});
    } else {
        // Reset form for creating a new activity
        setFormData({
          id: "",
          title: "",
          category: "",
          description: "",
          city: "",
          venue: "",
          date: new Date().toISOString(),
        });
      }
  }, [selectedActivity])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
      // Creating a new activity
      const newActivity: Activity = {
        ...formData,
        id: selectedActivity ? selectedActivity.id : uuid(), // Generate unique ID
        date: new Date().toISOString(), // Set current date
      }

      await onCreateUpdateActivity(newActivity);
      
    } 
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label htmlFor="title" className="w-full block">
            Title
          </label>
          <input
            name="title"
            className="w-full block"
            type="text"
            onChange={handleInputChange}
            value={formData.title}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="w-full block">
            Category
          </label>
          <input
            name="category"
            className="w-full block"
            type="text"
            onChange={handleInputChange}
            value={formData.category}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="w-full block">
            Description
          </label>
          <input
            name="description"
            type="text"
            className="w-full block"
            onChange={handleInputChange}
            value={formData.description}
            required
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="w-full block">
            City
          </label>
          <input
            name="city"
            className="w-full block"
            type="text"
            onChange={handleInputChange}
            value={formData.city}
            required
          />
        </div>

        {/* Venue */}
        <div>
          <label htmlFor="venue" className="w-full block">
            Venue
          </label>
          <input
            name="venue"
            type="text"
            className="w-full block"
            onChange={handleInputChange}
            value={formData.venue}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white p-2"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="bg-red-500 text-white p-2" type="submit">
            {selectedActivity ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );

}
export default ActivityForm;
