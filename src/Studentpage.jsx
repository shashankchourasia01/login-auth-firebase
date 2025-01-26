import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { database, ref, push, set, onValue, update } from "./firebase";
import { signOut } from "firebase/auth";
import { auth } from "./firebase"; // Import Firebase authentication for sign out
import { useNavigate } from "react-router-dom"; // Import for navigation


const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "view", "edit", or "add"
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    guardianName: "",
    guardianContact: "",
    enrollmentDate: "",
  });

  const navigate = useNavigate(); // Use for navigating to other pages


  // Fetch students from Firebase Realtime Database
  useEffect(() => {
    const studentRef = ref(database, "students/");
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setStudents(studentList);
      } else {
        setStudents([]);
      }
    });
  }, []);




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalType === "edit" && selectedStudent) {
      // Update student in Firebase
      update(ref(database, `students/${selectedStudent.id}`), formData)
        .then(() => {
          console.log("Student updated successfully!");
        })
        .catch((error) => console.error("Error updating student:", error));
    } else if (modalType === "add") {
      // Add new student to Firebase
      const newStudentRef = push(ref(database, "students/"));
      set(newStudentRef, formData)
        .then(() => {
          console.log("Student added successfully!");
        })
        .catch((error) => console.error("Error adding student:", error));
    }
    setShowModal(false);
    setSelectedStudent(null);
    setFormData({
      name: "",
      class: "",
      section: "",
      rollNumber: "",
      age: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      guardianName: "",
      guardianContact: "",
      enrollmentDate: "",
    });
  };

  const handleView = (student) => {
    setModalType("view");
    setSelectedStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setModalType("edit");
    setSelectedStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully!");
        navigate("/login"); // Redirect to login page after logout
      })
      .catch((error) => console.error("Error logging out:", error));
  };


  const modalStyles = {
    display: showModal ? "block" : "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    borderRadius: "10px",
    width: "80%",
    maxWidth: "600px",
    overflowY: "auto",
    maxHeight: "90vh",
  };

  const overlayStyles = {
    display: showModal ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  };

  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thTdStyles = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
  };

  const headerStyles = {
    backgroundColor: "#f4f4f4",
    fontWeight: "bold",
  };

  const buttonStyles = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const iconStyles = {
    margin: "0 5px",
    cursor: "pointer",
  };

  return (

    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", backgroundColor: "#f4f4f4", padding: "20px" }}>
        <h3>Admin</h3>
        <ul style={{ listStyleType: "none", padding: 0 , marginTop:20 }}>
          <li style={{ marginBottom: "10px" }}>
            <button onClick={() => navigate("/student")} style={buttonStyles}>
              Student Page
            </button>
          </li>
          <li>
            <button onClick={handleLogout} style={buttonStyles}>
              Logout
            </button>
          </li>
        </ul>
      </div>


    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Student List</h1>
      <button
        style={buttonStyles}
        onClick={() => {
          setModalType("add");
          setFormData({
            name: "",
            class: "",
            section: "",
            rollNumber: "",
            age: "",
            gender: "",
            email: "",
            phone: "",
            address: "",
            guardianName: "",
            guardianContact: "",
            enrollmentDate: "",
          });
          setShowModal(true);
        }}
      >
        Add Student
      </button>
      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={{ ...thTdStyles, ...headerStyles }}>ID</th>
              <th style={{ ...thTdStyles, ...headerStyles }}>Name</th>
              <th style={{ ...thTdStyles, ...headerStyles }}>Class</th>
              <th style={{ ...thTdStyles, ...headerStyles }}>Section</th>
              <th style={{ ...thTdStyles, ...headerStyles }}>Roll Number</th>
              <th style={{ ...thTdStyles, ...headerStyles }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={thTdStyles}>{student.id}</td>
                <td style={thTdStyles}>{student.name}</td>
                <td style={thTdStyles}>{student.class}</td>
                <td style={thTdStyles}>{student.section}</td>
                <td style={thTdStyles}>{student.rollNumber}</td>
                <td style={thTdStyles}>
                  <FiEye
                    style={{ ...iconStyles, color: "#28a745" }}
                    title="View"
                    onClick={() => handleView(student)}
                  />
                  <FiEdit
                    style={{ ...iconStyles, color: "#ffc107" }}
                    title="Edit"
                    onClick={() => handleEdit(student)}
                  />
                  <FiTrash2
                    style={{ ...iconStyles, color: "#dc3545" }}
                    title="Delete"
                    onClick={() => handleDelete(student.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div style={overlayStyles} onClick={() => setShowModal(false)}></div>
      <div style={modalStyles}>
        <h2>{modalType === "edit" ? "Edit Student" : modalType === "view" ? "View Student" : "Add Student"}</h2>
        {modalType === "view" ? (
          <div>
            {Object.entries(formData).map(([key, value]) => (
              <p key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </p>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {Object.keys(formData).map((field) => (
                <div key={field}>
                  <label htmlFor={field} style={{ display: "block", marginBottom: "5px" }}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              style={{
                ...buttonStyles,
                marginTop: "20px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default StudentPage;
