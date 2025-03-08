import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus, X } from "lucide-react";

const teacherNames = [
  "Amit Sharma", "Priya Patel", "Rahul Verma", "Neha Singh", "Vikram Joshi",
  "Suman Das", "Rohit Mehta", "Swati Kulkarni", "Anjali Rao", "Pankaj Gupta"
];

const subjectNames = [
  "Mathematics", "Software Engineering", "Computer Network", "Probability & Statistics",
  "Computer Graphics", "Computer Science", "Data Centric AI", "Data Ethics",
  "Web Technology", "Client Side Scripting"
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const Classroom = () => {
  const storedClasses = JSON.parse(sessionStorage.getItem("joinedClasses")) || [
    {
      code: "DSA101",
      name: "Data Structures and Algorithms",
      subject: "Data Structures and Algorithms",
      teacher: "Manisha Gade",
      profile: "https://i.pravatar.cc/50?u=manisha",
      hasMaterials: true,
      materials: [
      <iframe
      src="/QSP.pdf"
      className="w-full h-96 border rounded-lg shadow-md"
      title="Reference Material"
      >
      </iframe>
        
      ],
    },
  ];

  const [joinedClasses, setJoinedClasses] = useState(storedClasses);
  const [showJoinClass, setShowJoinClass] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeTab, setActiveTab] = useState("Stream");

  useEffect(() => {
    sessionStorage.setItem("joinedClasses", JSON.stringify(joinedClasses));
  }, [joinedClasses]);

  const handleJoinClass = (classCode) => {
    if (!classCode.trim()) return;
    const subject = getRandomItem(subjectNames);
    const newClass = {
      code: classCode,
      name: subject,
      subject: subject,
      teacher: getRandomItem(teacherNames),
      profile: `https://i.pravatar.cc/50?u=${classCode}`,
      hasMaterials: false,
      materials: [],
    };

    setJoinedClasses([...joinedClasses, newClass]);
    setShowJoinClass(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        {showJoinClass && (
          <ArrowLeft
            size={28}
            className="cursor-pointer text-gray-700 hover:text-gray-900"
            onClick={() => setShowJoinClass(false)}
          />
        )}
        My Classrooms
      </h1>
      <p className="text-gray-600">Manage your classrooms efficiently.</p>

      {showJoinClass ? (
        <JoinClassroom onJoin={handleJoinClass} />
      ) : (
        <>
          <button
            className="mt-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
            onClick={() => setShowJoinClass(true)}
          >
            <Plus size={20} className="mr-2" />
            Join Another Classroom
          </button>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedClasses.map((classroom, index) => (
              <ClassroomCard key={index} classroom={classroom} onClick={() => setSelectedClass(classroom)} />
            ))}
          </div>
        </>
      )}

      {selectedClass && (
        <ClassroomModal
          classroom={selectedClass}
          onClose={() => setSelectedClass(null)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
};

const ClassroomModal = ({ classroom, onClose, activeTab, setActiveTab }) => {
  // Ensure the materials array is present and contains a PDF
  const pdfFile = classroom.hasMaterials && classroom.materials.length > 0
    ? classroom.materials.find((material) => material.file.endsWith(".pdf"))
    : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 ms-[200px]">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{classroom.name}</h2>
          <X className="cursor-pointer text-gray-700 hover:text-gray-900" onClick={onClose} />
        </div>

        <div className="mt-4 flex space-x-4 border-b pb-2">
          {["Stream", "Classwork", "People"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${activeTab === tab ? "border-b-2 border-blue-500 font-bold" : "text-gray-600"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stream Tab - Display PDF if Available */}
        {activeTab === "Stream" && (
          <div className="mt-4">
            {pdfFile ? (
              <div className="mt-4">
                <h3 className="font-semibold">Class Reference Material</h3>
                <iframe
                  src={process.env.PUBLIC_URL + pdfFile.file} // ✅ Corrected Path
                  className="w-full h-96 border rounded-lg shadow-md"
                  title="Reference Material"
                ></iframe>
              </div>
            ) : (
              <p className="text-gray-500 italic">No reference material available.</p>
            )}
          </div>
        )}

        {/* Classwork Tab - Display All Materials */}
        {activeTab === "Classwork" && (
          <div className="mt-4">
            <h3 className="font-semibold">Class Materials</h3>
            {classroom.hasMaterials && classroom.materials.length > 0 ? (
              <ul className="list-disc pl-5">
                {classroom.materials.map((material, index) => (
                  <li key={index}>
                    <a
                      href={process.env.PUBLIC_URL + material.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {material.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No materials uploaded yet.</p>
            )}
          </div>
        )}

        {/* People Tab */}
        {activeTab === "People" && <p className="mt-4 font-medium">Instructor: {classroom.teacher}</p>}
      </div>
    </div>
  );
};


const ClassroomCard = ({ classroom, onClick }) => (
  <div onClick={onClick} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">{classroom.name}</h2>
      <img src={classroom.profile} alt="Teacher" className="w-10 h-10 rounded-full border-2 border-white shadow-lg" />
    </div>
    <div className="p-4">
      <p className="text-gray-700 font-medium">{classroom.subject}</p>
      <p className="text-gray-500">{classroom.teacher}</p>
    </div>
  </div>
);

const JoinClassroom = ({ onJoin }) => {
  const [classCode, setClassCode] = useState("");
  return (
    <div className="p-5 flex flex-col sm:flex-row gap-3 items-center bg-gray-100 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Enter Class Code"
        value={classCode}
        onChange={(e) => setClassCode(e.target.value)}
        className="border p-2 rounded w-full sm:flex-1"
      />
      <button onClick={() => onJoin(classCode)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
        Join Class
      </button>
    </div>
  );
};

export default Classroom;
