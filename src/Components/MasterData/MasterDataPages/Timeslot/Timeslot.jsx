import React, { useState, useEffect } from "react";
import axios from "axios";

const TimeSlotManager = () => {
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({
    slotType: "",
    day: "",
    startTime: "",
    endTime: "",
    lecture: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState(null); // To track which slot is being edited
  const [loading, setLoading] = useState(true);

  // Fetch all time slots
  const fetchSlots = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/v1/college/timeslot',
        {
            withCredentials: true,
        });
      setSlots(response.data.slot);
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };





  

  // Handle form submission (for creating and updating slots)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSlotId) {
        // Update the slot if we're editing
        await axios.patch(`http://localhost:8000/api/v1/college/timeslot/${editingSlotId}`, formData,{
            withCredentials: true,
        });

        alert("Slot updated successfully!");
      } else {
        // Create new slot if we're adding
        await axios.post("http://localhost:8000/api/v1/college/timeslot", formData, {
            withCredentials: true,
        });
        
        alert("Slot created successfully!");
      }
      setFormData({
        slotType: "",
        day: "",
        startTime: "",
        endTime: "",
        lecture: "",
      });
      setIsFormOpen(false);
      setEditingSlotId(null); // Reset editing slot ID
      fetchSlots();
    } catch (error) {
      console.error("Error creating or updating slot:", error);
      alert("Failed to create or update slot.");
    }
  };

  // Handle slot deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/college/timeslot/${id}`, {
        withCredentials: true,
    });
      alert("Slot deleted successfully!");
      fetchSlots();
    } catch (error) {
      console.error("Error deleting slot:", error);
      alert("Failed to delete slot.");
    }
  };

  // Open the form with the existing slot data for editing
  const handleEdit = (slot) => {
    setFormData({
      slotType: slot.slotType,
      day: slot.day,
      startTime: slot.startTime,
      endTime: slot.endTime,
      lecture: slot.lecture._id, // Assuming lecture object contains _id
    });
    setEditingSlotId(slot._id); // Set the slot being edited
    setIsFormOpen(true); // Open the form modal
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Time Slot Manager
      </h1>

      {/* Create Slot Button */}
      <div className="text-center mb-4">
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Slot
        </button>
      </div>

      {/* Time Slots Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-gray-600">Loading slots...</p>
        ) : slots.length === 0 ? (
          <p className="text-gray-600">No time slots available.</p>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Slot Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Start Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  End Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, index) => (
                <tr
                  key={slot._id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {slot.slotType}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{slot.day}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {slot.startTime}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {slot.endTime}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleEdit(slot)}
                      className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {editingSlotId ? "Edit Slot" : "Create Slot"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Slot Type
                </label>
                <select
                  name="slotType"
                  value={formData.slotType}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded p-2"
                  required
                >
                  <option value="" disabled>
                    Select Slot Type
                  </option>
                  <option value="Break">Break</option>
                  <option value="Lecture">Lecture</option>
                  <option value="Practical">Practical</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Day</label>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded p-2"
                  required
                >
                  <option value="" disabled>
                    Select Day
                  </option>
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                    (day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Lecture ID</label>
                <input
                  type="text"
                  name="lecture"
                  value={formData.lecture}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded p-2"
                  required
                />
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editingSlotId ? "Update Slot" : "Create Slot"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotManager;
































// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TimeSlotManager = () => {
//   const [slots, setSlots] = useState([]);
//   const [lectures, setLectures] = useState([]);  // To store the available lectures
//   const [formData, setFormData] = useState({
//     slotType: "",
//     day: "",
//     startTime: "",
//     endTime: "",
//     lecture: "",
//   });
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [editingSlotId, setEditingSlotId] = useState(null); // To track which slot is being edited
//   const [loading, setLoading] = useState(true);

//   // Fetch all time slots
//   const fetchSlots = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8000/api/v1/college/timeslot", {
//         withCredentials: true,
//       });
//       setSlots(response.data.slot);
//     } catch (error) {
//       console.error("Error fetching slots:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch all lectures for the lecture dropdown
//   const fetchLectures = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/v1/college/all-lecture", {
//         withCredentials: true,
//       });
//       setLectures(response.data.lectures); // Assuming response contains an array of lectures
//     } catch (error) {
//       console.error("Error fetching lectures:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSlots();
//     fetchLectures();
//   }, []);

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission (for creating and updating slots)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingSlotId) {
//         // Update the slot if we're editing
//         await axios.patch(`http://localhost:8000/api/v1/college/timeslot/${editingSlotId}`, formData, {
//           withCredentials: true,
//         });

//         alert("Slot updated successfully!");
//       } else {
//         // Create new slot if we're adding
//         await axios.post("http://localhost:8000/api/v1/college/timeslot", formData, {
//           withCredentials: true,
//         });

//         alert("Slot created successfully!");
//       }
//       setFormData({
//         slotType: "",
//         day: "",
//         startTime: "",
//         endTime: "",
//         lecture: "",
//       });
//       setIsFormOpen(false);
//       setEditingSlotId(null); // Reset editing slot ID
//       fetchSlots();
//     } catch (error) {
//       console.error("Error creating or updating slot:", error);
//       alert("Failed to create or update slot.");
//     }
//   };

//   // Handle slot deletion
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/v1/college/timeslot/${id}`, {
//         withCredentials: true,
//       });
//       alert("Slot deleted successfully!");
//       fetchSlots();
//     } catch (error) {
//       console.error("Error deleting slot:", error);
//       alert("Failed to delete slot.");
//     }
//   };

//   // Open the form with the existing slot data for editing
//   const handleEdit = (slot) => {
//     setFormData({
//       slotType: slot.slotType,
//       day: slot.day,
//       startTime: slot.startTime,
//       endTime: slot.endTime,
//       lecture: slot.lecture._id, // Assuming lecture object contains _id
//     });
//     setEditingSlotId(slot._id); // Set the slot being edited
//     setIsFormOpen(true); // Open the form modal
//   };

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
//         Time Slot Manager
//       </h1>

//       {/* Create Slot Button */}
//       <div className="text-center mb-4">
//         <button
//           onClick={() => setIsFormOpen(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Create Slot
//         </button>
//       </div>

//       {/* Time Slots Table */}
//       <div className="overflow-x-auto">
//         {loading ? (
//           <p className="text-gray-600">Loading slots...</p>
//         ) : slots.length === 0 ? (
//           <p className="text-gray-600">No time slots available.</p>
//         ) : (
//           <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
//                   Slot Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
//                   Day
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
//                   Start Time
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
//                   End Time
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {slots.map((slot, index) => (
//                 <tr
//                   key={slot._id}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   <td className="px-6 py-4 text-sm text-gray-800">{slot.slotType}</td>
//                   <td className="px-6 py-4 text-sm text-gray-800">{slot.day}</td>
//                   <td className="px-6 py-4 text-sm text-gray-800">{slot.startTime}</td>
//                   <td className="px-6 py-4 text-sm text-gray-800">{slot.endTime}</td>
//                   <td className="px-6 py-4 text-sm">
//                     <button
//                       onClick={() => handleEdit(slot)}
//                       className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(slot._id)}
//                       className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Form Modal */}
//       {isFormOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
//             <h2 className="text-xl font-bold mb-4 text-gray-800">
//               {editingSlotId ? "Edit Slot" : "Create Slot"}
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-1">Slot Type</label>
//                 <select
//                   name="slotType"
//                   value={formData.slotType}
//                   onChange={handleChange}
//                   className="w-full border-gray-300 rounded p-2"
//                   required
//                 >
//                   <option value="" disabled>Select Slot Type</option>
//                   <option value="Theory">Theory</option>
//                   <option value="Practical">Practical</option>
//                   <option value="Guest Lecture">Guest Lecture</option>
//                 </select>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-1">Day</label>
//                 <select
//                   name="day"
//                   value={formData.day}
//                   onChange={handleChange}
//                   className="w-full border-gray-300 rounded p-2"
//                   required
//                 >
//                   <option value="" disabled>Select Day</option>
//                   {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
//                     (day) => (
//                       <option key={day} value={day}>
//                         {day}
//                       </option>
//                     )
//                   )}
//                 </select>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-1">Start Time</label>
//                 <input
//                   type="time"
//                   name="startTime"
//                   value={formData.startTime}
//                   onChange={handleChange}
//                   className="w-full border-gray-300 rounded p-2"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-1">End Time</label>
//                 <input
//                   type="time"
//                   name="endTime"
//                   value={formData.endTime}
//                   onChange={handleChange}
//                   className="w-full border-gray-300 rounded p-2"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-1">Lecture</label>
//                 <select
//                   name="lecture"
//                   value={formData.lecture}
//                   onChange={handleChange}
//                   className="w-full border-gray-300 rounded p-2"
//                   required
//                 >
//                   <option value="" disabled>Select Lecture</option>
//                   {lectures.map((lecture) => (
//                     <option key={lecture._id} value={lecture._id}>
//                       {lecture.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="text-center">
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   {editingSlotId ? "Update Slot" : "Create Slot"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsFormOpen(false)}
//                   className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 ml-4"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimeSlotManager;

