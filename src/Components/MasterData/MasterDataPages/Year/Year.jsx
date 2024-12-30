import React, { useState, useEffect } from "react";
import axios from "axios";

const Year = () => {
  const [years, setYears] = useState([]);
  const [formData, setFormData] = useState({ year: "" });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Fetch all years
  const fetchYears = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/college/year", {
        withCredentials: true,
      });
      setYears(response.data.years);
    } catch (error) {
      console.error("Error fetching years:", error);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(
          `http://localhost:8000/api/v1/college/year/${currentId}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post("http://localhost:8000/api/v1/college/create-year", formData, {
          withCredentials: true,
        });
      }
      setFormData({ year: "" });
      setEditMode(false);
      setCurrentId(null);
      fetchYears();
    } catch (error) {
      console.error("Error saving year:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/college/year/${id}`, {
        withCredentials: true,
      });
      fetchYears();
    } catch (error) {
      console.error("Error deleting year:", error);
    }
  };

  // Populate form for editing
  const handleEdit = (year) => {
    setFormData({ year: year.year });
    setEditMode(true);
    setCurrentId(year._id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Year Management</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="mb-4">
          <label
            htmlFor="year"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Year
          </label>
          <input
            type="text"
            id="year"
            value={formData.year}
            onChange={(e) => setFormData({ year: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter year (e.g., First Year)"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editMode ? "Update Year" : "Add Year"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setFormData({ year: "" });
                setCurrentId(null);
              }}
              className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Year List */}
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                Year
              </th>
              <th className="px-5 py-3 bg-gray-100 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {years.map((year) => (
              <tr key={year._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {year.year}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button
                    onClick={() => handleEdit(year)}
                    className="text-blue-500 hover:text-blue-700 font-bold py-1 px-3 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(year._id)}
                    className="text-red-500 hover:text-red-700 font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Year;
