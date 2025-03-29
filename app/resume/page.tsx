"use client";

import React, { useRef, useState } from "react";
import ReactToPdf from "react-to-pdf";

export default function ResumePage() {
  // 1) Create a ref for the PDF capture
  const pdfRef = useRef<HTMLDivElement>(null);

  // 2) Some example state fields
  const [name, setName] = useState("Jake Ryan");
  const [email, setEmail] = useState("jake@su.edu");
  const [phone, setPhone] = useState("123-456-7890");
  const [github, setGithub] = useState("github.com/jake");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/jake");

  return (
    <div className="p-8 space-y-6">
      {/* Form fields */}
      <div>
        <label className="block font-semibold">Name</label>
        <input
          className="border p-1 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">Email</label>
        <input
          className="border p-1 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">Phone</label>
        <input
          className="border p-1 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">GitHub</label>
        <input
          className="border p-1 w-full"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">LinkedIn</label>
        <input
          className="border p-1 w-full"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
      </div>

      {/* Resume Preview -- attach the ref here */}
      <div
        ref={pdfRef}
        className="border p-4 w-[8.5in] min-h-[11in] text-[11pt] font-serif"
      >
        <h1 className="text-3xl font-bold text-center">{name}</h1>
        <p className="text-center">
          {email} | {phone} | {github} | {linkedin}
        </p>
        <hr className="my-4" />

        <section>
          <h2 className="uppercase font-bold text-sm border-b">Education</h2>
          <p className="mt-2">Your education details go here.</p>
        </section>

        <section className="mt-4">
          <h2 className="uppercase font-bold text-sm border-b">Experience</h2>
          <p className="mt-2">Your experience details go here.</p>
        </section>
      </div>

      {/* Download PDF button */}
      <button
        onClick={async () => {
          const jsPDF = (await import("jspdf")).default;
          const html2canvas = (await import("html2canvas")).default;

          if (pdfRef.current) {
            const canvas = await html2canvas(pdfRef.current);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("portrait", "pt", "letter");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("resume.pdf");
          }
        }}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Download PDF
      </button>
    </div>
  );
}
