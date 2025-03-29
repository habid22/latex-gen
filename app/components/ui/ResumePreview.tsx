// ResumePreview.tsx
"use client";

import React, { forwardRef } from "react";

interface Props {
  name: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

// 👇 use forwardRef to allow passing ref from parent
export const ResumePreview = forwardRef<HTMLDivElement, Props>(
  ({ name, email, phone, github, linkedin }, ref) => {
    return (
      <div ref={ref} className="p-6 text-[11pt] font-cmu w-[8.5in] min-h-[11in]">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p>{phone} | {email} | {github} | {linkedin}</p>
        </div>

        <section>
          <h2 className="font-bold uppercase text-sm border-b">Education</h2>
          <p className="mt-1">Your education section here...</p>
        </section>

        <section className="mt-4">
          <h2 className="font-bold uppercase text-sm border-b">Experience</h2>
          <p className="mt-1">Your experience section here...</p>
        </section>
      </div>
    );
  }
);

// Required for React to recognize display name with forwardRef
ResumePreview.displayName = "ResumePreview";
