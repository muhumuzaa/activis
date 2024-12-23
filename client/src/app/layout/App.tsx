import axios from "axios";

import { useEffect, useState } from "react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

// function App() {
//   const [activities, setActivities] = useState<Activity[]>([]);

//   useEffect(() => {
//     axios.get<Activity[]>("http://localhost:5000/api/activities")
//       .then((response) => {
//         console.log(response);

//         setActivities(response.data);
//       });
//   }, []);

//   return (
//     <>
//       <NavBar />
//       <div className="max-w-screen-xl mx-auto flex h-screen">
//         <Routes>
//           <Route path="/" element={<ActivityDashboard activities={activities} />}/>

//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;



const App = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities').then((response) => {
      console.log(response);
      setActivities(response.data);
    });
  }, [])
  return (
    <div>
      <NavBar />
      <ActivityDashboard activities ={activities}/>
    </div>
  )
}

export default App
