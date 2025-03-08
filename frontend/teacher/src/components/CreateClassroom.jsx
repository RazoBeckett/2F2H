import React, { useState, useEffect } from "react";
import { PlusCircle, X, BookOpen, School, Check, Users, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateClassroom = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [classroom, setClassroom] = useState({ 
    name: "", 
    subject: "", 
    grade: "",
    section: "" 
  });

  const [classrooms, setClassrooms] = useState(() => {
    const storedClassrooms = JSON.parse(localStorage.getItem("classrooms")) || [];
    const defaultClassrooms = [
      { id: 1, name: "SY IT C", subject: "UCSD" },
      { id: 2, name: "SY IT C", subject: "DSA" }
    ];
    return storedClassrooms.length > 0 ? storedClassrooms : defaultClassrooms;
  });

  useEffect(() => {
    localStorage.setItem("classrooms", JSON.stringify(classrooms));
  }, [classrooms]);

  const handleSaveClassroom = () => {
    if (classroom.name && classroom.subject) {
      const newClassroom = { id: Date.now(), ...classroom };
      const updatedClassrooms = [...classrooms, newClassroom];

      setClassrooms(updatedClassrooms);
      localStorage.setItem("classrooms", JSON.stringify(updatedClassrooms));

      setClassroom({ name: "", subject: "", grade: "", section: "" });
      setShowForm(false);
    } else {
      alert("Please fill in all required fields!");
    }
  };

  return (
    <div className="mt-24 ml-70 p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border border-gray-100">
      {!showForm ? (
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <School size={36} className="text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-3">Create New Classroom</h2>
            <p className="text-gray-600 text-lg">
              Set up a virtual learning space for your students with all the tools you need.
            </p>
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-2xl hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
          >
            <PlusCircle size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-semibold text-lg">Get Started</span>
          </button>
        </div>
      ) : (
        <div className="animate-fadeIn max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Create Your Classroom</h3>
              <p className="text-gray-600 mt-1">Fill in the details to set up your virtual classroom</p>
            </div>
            <button
              onClick={() => setShowForm(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-5">
              <div className="relative group">
                <School size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Classroom Name *"
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                  value={classroom.name}
                  onChange={(e) => setClassroom({ ...classroom, name: e.target.value })}
                />
              </div>

              <div className="relative group">
                <BookOpen size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Subject *"
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                  value={classroom.subject}
                  onChange={(e) => setClassroom({ ...classroom, subject: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 px-8 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold text-lg shadow-sm hover:shadow-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClassroom}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-xl hover:from-green-600 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-green-500/25 flex items-center justify-center gap-3 font-semibold text-lg"
            >
              <Check size={24} />
              Create Classroom
            </button>
          </div>
        </div>
      )}

      {/* Display Created Classrooms */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Classrooms</h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {classrooms.map((cls) => (
            <div 
              key={cls.id} 
              className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 flex justify-between items-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{cls.name}</h4>
                <p className="text-gray-500">{cls.subject}</p>
              </div>
              <button
                onClick={() => navigate('/manage-classrooms')}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-100 transition-colors"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateClassroom;
