import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Professor = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Would you like to delete?");
    if (confirm) {
      try {
        const res = await axios.delete(`http://localhost:8000/api/v1/college/professor/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);  
        setData((prevData) => prevData.filter((prof) => prof._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/college/professor",
          {
            withCredentials: true,
          }
        );
        console.log(response.data.professor);
        setData(response.data.professor);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(fetchData, 1000);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center bg-slate-200 min-h-screen p-4">
      {/* Header Section */}
      <div className="flex flex-row items-center justify-between bg-white p-4 rounded shadow w-full sm:w-3/4">
        <h1 className="text-2xl font-medium">Professors</h1>
        <Link
          to="/Create"
          className="btn bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
        >
          Add +
        </Link>
      </div>

      {/* Table Section */}
      <div className="w-full sm:w-3/4 mt-4 shadow rounded bg-white p-4 overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone No.</th>
              <th className="px-4 py-2">Designation</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i} className="border-b">
                <td className="px-4 py-2">{d.name}</td>
                <td className="px-4 py-2">{d.emailId}</td>
                <td className="px-4 py-2">{d.phoneNumber}</td>
                <td className="px-4 py-2">{d.designation}</td>
                <td className="px-4 py-2">
                  <button className="btn bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600 mr-2">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(d._id)}
                    className="btn bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
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

export default Professor;
