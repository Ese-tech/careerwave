import React, { useRef } from 'react';

interface UploadCVProps {
  onUpload: (file: File) => void;
}

export const UploadCV: React.FC<UploadCVProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <label className="mb-2 font-semibold">Lebenslauf hochladen (PDF):</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-2"
      />
    </div>
  );
};
