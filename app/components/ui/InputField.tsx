import React from "react";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const InputField: React.FC<Props> = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block font-semibold">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded"
    />
  </div>
);
