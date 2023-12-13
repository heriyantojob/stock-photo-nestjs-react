import { useState } from 'react';
import Image from 'next/image';

const ProfileUploadFoto = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div>
        <Image src="/path/to/image.jpg" alt="Image description" width={400} height={300} />
      </div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ProfileUploadFoto;