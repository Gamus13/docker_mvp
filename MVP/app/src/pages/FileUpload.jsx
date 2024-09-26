// FileUpload.jsx
import { useState } from 'react';

const FileUpload = ({ onFileSubmit }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onFileSubmit(file);
      setFile(null); // Réinitialiser le champ après soumission
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="text-lg font-medium">Télécharger un fichier :</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
