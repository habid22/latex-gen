// components/ui/DownloadButton.tsx
import React from "react";

interface DownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  targetRef, 
  fileName 
}) => {
  const handleDownload = () => {
    if (!targetRef.current) return;
    
    // Your PDF generation logic using targetRef.current
    console.log("Generating PDF from:", targetRef.current);
  };

  return (
    <button 
      onClick={handleDownload}
      className="bg-blue-500 text-white p-2 rounded mt-4"
    >
      Download PDF
    </button>
  );
};

export default DownloadButton;