import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { uploadDocument } from '../api';
import { getToken } from '../utils/token';

function UploadPage() {
  const { projectId } = useParams();
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert('Choose a file first');
    const token = getToken();
    const res = await uploadDocument(token, projectId, file);
    if (res.filename) {
      alert('Upload successful');
    } else {
      alert('Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadPage;
