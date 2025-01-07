import { useEffect, useState } from "react";
import { Activity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

const ActivityForm = ({
  selectedActivity,
  onCancel,
  onCreateOrUpdate,
}: {
  selectedActivity: Activity | null;
  onCancel: () => void;
  onCreateOrUpdate: (newActivity: Activity) => Promise<void>;
}) => {
  const [formData, setFormData] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    description: "",
    venue: "",
    city: "",
    date: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (selectedActivity) {
      //if an activity exists, fill the form with its data
      setFormData(selectedActivity);
    } else {
      //reset form fields for creating
      setFormData({
        id: "",
        title: "",
        category: "",
        description: "",
        venue: "",
        city: "",
        date: ""
      });
    }
  }, [selectedActivity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let newActivity: Activity;
    if(selectedActivity){
        newActivity = {...formData, id: selectedActivity.id}
    }else{
        newActivity ={...formData, id: uuid(), date: new Date().toISOString()};
    }
       
    
    onCreateOrUpdate(newActivity);
    

  };

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
};

export default ActivityForm;
