import React, { useState, useEffect } from "react";
import axios from "axios";

const Classroom = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [formData, setFormData] = useState({ floor: "", room_no: "" });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all classrooms
  const fetchClassrooms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/college/all-classroom",
        {
          withCredentials: true,
        }
      );

      setClassrooms(response.data.classrooms);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit for Create and Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(
          `http://localhost:8000/api/v1/college/classroom/${currentId}`,
          formData,
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/v1/college/create-classroom",
          formData,

          {
            withCredentials: true,
          }
        );
      }
      setFormData({ floor: "", room_no: "" });
      setEditMode(false);
      setCurrentId(null);
      fetchClassrooms();
    } catch (error) {
      console.error("Error saving classroom:", error);
    }
  };

  // Edit a classroom
  const handleEdit = (classroom) => {
    setFormData({ floor: classroom.floor, room_no: classroom.room_no });
    setEditMode(true);
    setCurrentId(classroom._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/college/classroom/${id}`,
        {
          withCredentials: true,
        }
      );
      fetchClassrooms(); // Refresh the classroom list
    } catch (error) {
      console.error("Error deleting classroom:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Classroom Management
      </h1>

      {/* Form for Adding/Updating Classrooms */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="number"
          name="floor"
          placeholder="Floor"
          value={formData.floor}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="room_no"
          placeholder="Room Number"
          value={formData.room_no}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
        >
          {editMode ? "Update" : "Add"} Classroom
        </button>
      </form>

      {/* Display Classrooms */}
      <h2 className="text-xl font-semibold mt-8 text-center">Classrooms</h2>
      <ul className="space-y-4 mt-4 max-w-4xl mx-auto">
        {classrooms.map((classroom) => (
          <li
            key={classroom._id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <span>
              <strong>Floor:</strong> {classroom.floor},{" "}
              <strong>Room No:</strong> {classroom.room_no}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(classroom)}
                className="py-1 px-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(classroom._id)}
                className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Classroom;
