import { useState } from "react";
import { Activity } from "../../../app/models/activity";
import axios from "axios";

const ActivityForm = ({
  onCancel,
  selectedActivity,
}: {
  onCancel: () => void;
  selectedActivity: Activity | null;
}) => {
  const [formData, setFormData] = useState({
    id: selectedActivity?.id || "",
    title: selectedActivity?.title || "",
    category: selectedActivity?.category || "",
    description: selectedActivity?.description || "",
    date: selectedActivity?.date || "",
    city: selectedActivity?.city || "",
    venue: selectedActivity?.venue || "",

  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault();
    
    if (!formData?.id){
        axios.post<Activity>('http://localhost:5000/api/activities', formData);
        console.log('created new activity', formData);
        
    } else {
        axios.put<Activity>(`http://localhost:5000/api/activities/${formData.id}`, formData);
        console.log('updated activity', formData);
        

    }
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="w-full block">
            Title
          </label>
          <input
            name="title"
            className="w-full block "
            type="text"
            onChange={handleInputChange}
            value={formData.title}
          />
        </div>
        <div>
          <label className="w-full block">
            Category
          </label>
          <input
            name="category"
            className="w-full block "
            type="text"
            onChange={handleInputChange}
            value={formData.category}
          />
        </div>

        <div>
          <label htmlFor="description" className="w-full block">
            Description
          </label>
          <input
            name="description"
            type="text"
            className="w-full block "
            onChange={handleInputChange}
            value={formData.description}
          />
        </div>

        <div>
          <label htmlFor="date" className="w-full block">
            Date
          </label>
          <input
            name="date"
            type="text"
            className="w-full block "
            onChange={handleInputChange}
            value={formData.date}
          />
        </div>

        <div>
          <label htmlFor="city" className="w-full block">
            City
          </label>
          <input
            name="city"
            className="w-full block "
            type="text"
            onChange={handleInputChange}
            value={formData.city}
          />
        </div>

        <div>
          <label htmlFor="venue" className="w-full block">
            Venue
          </label>
          <input
            name="venue"
            type="text"
            className="w-full block "
            onChange={handleInputChange}
            value={formData.venue}
          />
        </div>

        

        <div className="flex justify-between">
          <button className="bg-gray-500 text-white p-2" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="bg-red-500 text-white p-2" type="submit">{selectedActivity? <>Update</>: <>Create</>}</button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
