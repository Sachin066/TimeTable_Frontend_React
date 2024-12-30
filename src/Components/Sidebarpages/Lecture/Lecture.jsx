import React, { useState, useEffect } from "react";
import "../Lecture/Lecture.css"; // Add the stylesheet
import axios from "axios";

const days = [
  "Time",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const times = [
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
];


const Lecture = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null); // Track which lecture is expanded

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/college/timeslot', 
            {
              withCredentials: true,
            }
          ); // Your TimeSlot API endpoint
          console.log(response.data.slot);
          
          setData(response.data.slot);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching data');
          setLoading(false);
        }
      };
      
      fetchData();
    }, 1000); // Simulate 1 second delay
  }, []);

  const handleToggle = (key) => {
    setExpanded(expanded === key ? null : key); // Toggle expansion
  };


  const renderAccordion = (time, day, rowIdx, colIdx) => {
  
    const lecture = data.find(
      (dt) => dt.startTime === time && dt.day === day
      // dt => console.log(dt)
    );
    // console.log("lecture >>>",lecture)
    
    const key = `${rowIdx}-${colIdx}`;

    return lecture ? (
      <div
        key={`accordion-${key}`}
        onClick={() => handleToggle(key)}
        className={`lecture-box ${expanded === key ? "expanded" : ""}`}
      >
        {/* Display the subject name */}
        <div className="subject-name">
          <strong>{lecture.lecture.subject.name}</strong>
        </div>

        {/* Conditionally display professor and room number when expanded */}
        {expanded === key && (
          <div className="lecture-details">
            <div>{`Professor: ${lecture.lecture.professor.name}`}</div>
            <div>{`Room: ${lecture.lecture.classroom.room_no}`}</div>
          </div>
        )}
      </div>
    ) : (
      <div key={`empty-${key}`} className="no-lecture">

        No Lecture
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
          <div>
            <button> edit </button>
          </div>
    <div className="timetable-grid">
      {/* First row with day names */}
      {days.map((day, idx) => (
        <div key={`day-${idx}`} className="header-cell">
          {day}
        </div>
      ))}

      {/* Timetable rows */}
      {times.map((time, rowIdx) => (
        <React.Fragment key={`row-${rowIdx}`}>
          {/* Time column */}
          <div key={`time-${rowIdx}`} className="time-cell">
            {time}
          </div>
          {/* Lecture columns with accordion-like dropdowns */}
          {days.slice(1).map((day, colIdx) => (
            <div key={`lecture-${rowIdx}-${colIdx}`} className="lecture-cell">
              {renderAccordion(time, day, rowIdx, colIdx)}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
    </div>
  );
};

export default Lecture;

