import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ManageClassrooms = () => {
  const navigate = useNavigate();

  // Predefined Classrooms (Ensure they are unique)
  const predefinedClassrooms = [
    { id: 1, name: "SY IT C", subject: "UCSD" },
    { id: 2, name: "SY IT C", subject: "DSA" },
  ];

  // Load classrooms from local storage, ensuring predefined classrooms aren't duplicated
  const [classrooms, setClassrooms] = useState(() => {
    const savedClassrooms = JSON.parse(localStorage.getItem("classrooms")) || [];
    const uniqueSavedClassrooms = savedClassrooms.filter(
      (cls) =>
        !predefinedClassrooms.some(
          (predefined) =>
            predefined.name === cls.name && predefined.subject === cls.subject
        )
    );
    return [...predefinedClassrooms, ...uniqueSavedClassrooms];
  });

  const [editingClassroom, setEditingClassroom] = useState(null);
  const [newName, setNewName] = useState("");
  const [newSubject, setNewSubject] = useState("");

  // Update local storage whenever classrooms change (excluding predefined classrooms)
  useEffect(() => {
    localStorage.setItem(
      "classrooms",
      JSON.stringify(classrooms.filter((cls) => !predefinedClassrooms.includes(cls)))
    );
  }, [classrooms]);

  // Handle Delete
  const handleDelete = (id) => {
    setClassrooms(classrooms.filter((classroom) => classroom.id !== id));
  };

  // Handle Edit
  const handleEdit = (id) => {
    const classroom = classrooms.find((cls) => cls.id === id);
    setEditingClassroom(id);
    setNewName(classroom.name);
    setNewSubject(classroom.subject);
  };

  // Save Edited Classroom
  const handleSaveEdit = (id) => {
    setClassrooms(
      classrooms.map((cls) =>
        cls.id === id ? { ...cls, name: newName, subject: newSubject } : cls
      )
    );
    setEditingClassroom(null);
  };

  return (
    <div className="p-8 md:ml-64">
      {/* Header Section */}
      <div className="mb-8 mt-22">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Classrooms</h1>
        <p className="text-gray-600">Organize and manage your virtual learning spaces</p>
      </div>

      {classrooms.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg mb-2">No classrooms created yet</p>
          <p className="text-gray-500">Create your first classroom to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <div
              key={classroom.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {editingClassroom === classroom.id ? (
                <div className="p-6">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="block w-full px-4 py-3 mb-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Classroom Name"
                  />
                  <input
                    type="text"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="block w-full px-4 py-3 mb-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Subject"
                  />
                  <button
                    onClick={() => handleSaveEdit(classroom.id)}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {classroom.name}
                    </h2>
                    <p className="text-gray-600">{classroom.subject}</p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => navigate(`/classroom/${classroom.id}`)}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Open Classroom
                    </button>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(classroom.id)}
                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(classroom.id)}
                        className="flex-1 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageClassrooms;
