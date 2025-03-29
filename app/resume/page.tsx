"use client";

import React, { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import { TDocumentDefinitions, Content } from "pdfmake/interfaces";

export default function ResumePage() {
  const [name, setName] = useState("Jake Ryan");
  const [email, setEmail] = useState("jake@su.edu");
  const [phone, setPhone] = useState("123-456-7890");
  const [github, setGithub] = useState("github.com/jake");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/jake");

  const [education, setEducation] = useState([
    { school: "", location: "", degree: "", date: "" }
  ]);

  const [experience, setExperience] = useState([
    { title: "", company: "", location: "", date: "", bullets: [""] }
  ]);

  const [projects, setProjects] = useState([
    { name: "", tech: "", bullets: [""] }
  ]);

  const [skills, setSkills] = useState({
    Languages: "",
    Frameworks: "",
    Tools: "",
    Libraries: ""
  });

  const sectionHeader = (text: string): Content => ({ text, style: "header" });

  const twoColumn = (left: string, right: string, style = "normal"): Content => {
    return {
      columns: [
        { text: left, style: style },
        { text: right, style: style, alignment: "right" }
      ]
    };
  };

  const bulletList = (items: string[]): Content => {
    return {
      ul: items.filter(b => b.trim() !== ""),
      style: "bullet"
    };
  };

  const handleDownload = async () => {
    const [regular, bold, italic] = await Promise.all([
      loadFont("./fonts/cmunrm.ttf"),
      loadFont("./fonts/cmunbx.ttf"),
      loadFont("./fonts/cmunsl.ttf")
    ]);

    pdfMake.vfs = {
      "cmunrm.ttf": regular,
      "cmunbx.ttf": bold,
      "cmunsl.ttf": italic
    };

    pdfMake.fonts = {
      ComputerModern: {
        normal: "cmunrm.ttf",
        bold: "cmunbx.ttf",
        italics: "cmunsl.ttf",
        bolditalics: "cmunbx.ttf"
      }
    };

    const docDefinition: TDocumentDefinitions = {
      pageSize: "LETTER",
      pageMargins: [40, 40, 40, 40],
      content: [
        { text: name, style: "name" },
        { text: `${phone} | ${email} | ${linkedin} | ${github}`, style: "contact" },

        sectionHeader("Education"),
        ...education.flatMap((edu) => [
          twoColumn(edu.school, edu.location),
          twoColumn(edu.degree, edu.date, "normal")
        ]),

        sectionHeader("Experience"),
        ...experience.flatMap((exp) => [
          twoColumn(exp.title, exp.location, "bold"),
          twoColumn(exp.company, exp.date),
          bulletList(exp.bullets)
        ]),

        sectionHeader("Projects"),
        ...projects.flatMap((proj) => [
          { text: `${proj.name} | ${proj.tech}`, style: "bold" },
          bulletList(proj.bullets)
        ]),

        sectionHeader("Technical Skills"),
        ...Object.entries(skills).map(([category, items]) => ({
          text: `${category}: ${items}`,
          style: "normal",
          margin: [0, 0, 0, 4]
        }))
      ],
      styles: {
        name: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          marginBottom: 4,
          font: "ComputerModern"
        },
        contact: {
          fontSize: 10,
          alignment: "center",
          marginBottom: 16,
          font: "ComputerModern"
        },
        header: {
          fontSize: 12,
          bold: true,
          marginTop: 12,
          decoration: "underline",
          font: "ComputerModern"
        },
        normal: {
          fontSize: 10,
          font: "ComputerModern"
        },
        bold: {
          fontSize: 10,
          bold: true,
          font: "ComputerModern"
        },
        bullet: {
          fontSize: 10,
          marginLeft: 10,
          font: "ComputerModern"
        }
      },
      defaultStyle: {
        font: "ComputerModern",
        fontSize: 10
      }
    };

    pdfMake.createPdf(docDefinition).download("resume.pdf");
  };

  const loadFont = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer).toString("base64");
  };

  return (
    <div className="p-8 space-y-6">
      <div className="space-y-4">
        <input className="border p-2 w-full" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <input className="border p-2 w-full" placeholder="GitHub" value={github} onChange={(e) => setGithub(e.target.value)} />
        <input className="border p-2 w-full" placeholder="LinkedIn" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
      </div>

      <div>
        <h3 className="font-bold text-lg mt-6">Education</h3>
        {education.map((edu, i) => (
          <div key={i} className="space-y-2 mb-4">
            <input className="border p-2 w-full" placeholder="School" value={edu.school} onChange={(e) => { const copy = [...education]; copy[i].school = e.target.value; setEducation(copy); }} />
            <input className="border p-2 w-full" placeholder="Location" value={edu.location} onChange={(e) => { const copy = [...education]; copy[i].location = e.target.value; setEducation(copy); }} />
            <input className="border p-2 w-full" placeholder="Degree" value={edu.degree} onChange={(e) => { const copy = [...education]; copy[i].degree = e.target.value; setEducation(copy); }} />
            <input className="border p-2 w-full" placeholder="Date" value={edu.date} onChange={(e) => { const copy = [...education]; copy[i].date = e.target.value; setEducation(copy); }} />
          </div>
        ))}
        <button className="text-blue-600 underline text-sm" onClick={() => setEducation([...education, { school: "", location: "", degree: "", date: "" }])}>+ Add Education</button>
      </div>

      <div>
        <h3 className="font-bold text-lg mt-6">Experience</h3>
        {experience.map((exp, i) => (
          <div key={i} className="space-y-2 mb-4">
            <input className="border p-2 w-full" placeholder="Title" value={exp.title} onChange={(e) => { const copy = [...experience]; copy[i].title = e.target.value; setExperience(copy); }} />
            <input className="border p-2 w-full" placeholder="Company" value={exp.company} onChange={(e) => { const copy = [...experience]; copy[i].company = e.target.value; setExperience(copy); }} />
            <input className="border p-2 w-full" placeholder="Location" value={exp.location} onChange={(e) => { const copy = [...experience]; copy[i].location = e.target.value; setExperience(copy); }} />
            <input className="border p-2 w-full" placeholder="Date" value={exp.date} onChange={(e) => { const copy = [...experience]; copy[i].date = e.target.value; setExperience(copy); }} />
            {exp.bullets.map((b, j) => (
              <input key={j} className="border p-2 w-full" placeholder="Bullet" value={b} onChange={(e) => { const copy = [...experience]; copy[i].bullets[j] = e.target.value; setExperience(copy); }} />
            ))}
            <button className="text-blue-600 underline text-sm" onClick={() => { const copy = [...experience]; copy[i].bullets.push(""); setExperience(copy); }}>+ Add Bullet</button>
          </div>
        ))}
        <button className="text-blue-600 underline text-sm" onClick={() => setExperience([...experience, { title: "", company: "", location: "", date: "", bullets: [""] }])}>+ Add Experience</button>
      </div>

      <div>
        <h3 className="font-bold text-lg mt-6">Projects</h3>
        {projects.map((proj, i) => (
          <div key={i} className="space-y-2 mb-4">
            <input className="border p-2 w-full" placeholder="Project Name" value={proj.name} onChange={(e) => { const copy = [...projects]; copy[i].name = e.target.value; setProjects(copy); }} />
            <input className="border p-2 w-full" placeholder="Technologies" value={proj.tech} onChange={(e) => { const copy = [...projects]; copy[i].tech = e.target.value; setProjects(copy); }} />
            {proj.bullets.map((b, j) => (
              <input key={j} className="border p-2 w-full" placeholder="Bullet" value={b} onChange={(e) => { const copy = [...projects]; copy[i].bullets[j] = e.target.value; setProjects(copy); }} />
            ))}
            <button className="text-blue-600 underline text-sm" onClick={() => { const copy = [...projects]; copy[i].bullets.push(""); setProjects(copy); }}>+ Add Bullet</button>
          </div>
        ))}
        <button className="text-blue-600 underline text-sm" onClick={() => setProjects([...projects, { name: "", tech: "", bullets: [""] }])}>+ Add Project</button>
      </div>

      <div>
        <h3 className="font-bold text-lg mt-6">Technical Skills</h3>
        {Object.entries(skills).map(([category, value]) => (
          <input key={category} className="border p-2 w-full mb-2" placeholder={category} value={value} onChange={(e) => setSkills({ ...skills, [category]: e.target.value })} />
        ))}
      </div>

      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Download PDF
      </button>
    </div>
  );
}
