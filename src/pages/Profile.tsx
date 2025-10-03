import React, { useState, ChangeEvent } from "react";

type UserData = {
  name: string;
  email: string;
  companyName: string;
  companySize: string;
  role: string;
};

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: "John Doe",
    email: "john.doe@example.com",
    companyName: "Acme Corporation",
    companySize: "50-200 employees",
    role: "Product Manager",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData>(userData);

  // CSV Files stored as array
  const [csvFiles, setCsvFiles] = useState<string[]>(["uploaded_data.csv"]);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save changes
  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  // Handle CSV upload
  const handleCsvUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((f) => f.name);
      setCsvFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // Remove CSV
  const handleRemoveCsv = (index: number) => {
    setCsvFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {userData.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{userData.role}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            Personal Information
          </h2>
          <div className="space-y-4">
            {(["name", "email", "role"] as (keyof UserData)[]).map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 capitalize">
                  {field === "name" ? "Full Name" : field}
                </label>
                {isEditing ? (
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-gray-100 font-medium">
                    {userData[field]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            Company Information
          </h2>
          <div className="space-y-4">
            {(["companyName", "companySize"] as (keyof UserData)[]).map(
              (field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 capitalize">
                    {field === "companyName" ? "Company Name" : "Company Size"}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    />
                  ) : (
                    <p className="text-gray-800 dark:text-gray-100 font-medium">
                      {userData[field]}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Uploaded Files */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            Uploaded Files
          </h2>
          <div className="space-y-3">
            {csvFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-gray-800 dark:text-gray-100 font-medium">
                      {file}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      CSV File
                    </p>
                  </div>
                </div>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveCsv(index)}
                    className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="mt-4">
              <input
                type="file"
                accept=".csv"
                multiple
                onChange={handleCsvUpload}
                className="block text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-700"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg shadow"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
