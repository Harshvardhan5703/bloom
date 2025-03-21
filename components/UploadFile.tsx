"use client";
import React, { useState } from 'react';
import { pdfjs } from "react-pdf";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useResumeContext } from "@/context/ResumeContext";

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [localTextData, setLocalTextData] = useState<string>("");
  const [localJobRole, setLocalJobRole] = useState<string>("");
  
  const { 
    setResumeText, 
    setJobRole, 
    setIsLoading, 
    setQuestions 
  } = useResumeContext();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      extractText(uploadedFile);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const extractText = async (file: File) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      if (reader.result) {
        const pdf = await pdfjs.getDocument({ data: reader.result }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item: any) => item.str).join(" ") + "\n";
        }
        setLocalTextData(text);
        setResumeText(text);
      }
    };
  };

  const handleJobRoleChange = (value: string) => {
    setLocalJobRole(value);
    setJobRole(value);
  };

  const handleSubmit = async () => {
    if (!localTextData || !localJobRole) {
      alert("Please upload a resume and select a job role.");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: localTextData,
          jobRole: localJobRole
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="self-center">Please Upload Candidate&apos;s Resume</h2>
      <Input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="text-white text-center flex justify-center"
      />
      {file && <p className="text-sm text-gray-400">Uploaded: {file.name}</p>}
      {localTextData && (
        <div className="p-2 text-sm text-gray-300 border border-gray-500 rounded">
          <h3 className="font-bold">Extracted Text:</h3>
          <p className="max-h-40 overflow-auto">{localTextData}</p>
        </div>
      )}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex justify-center">
          <Select onValueChange={handleJobRoleChange}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select Job Role" />
            </SelectTrigger>
            <SelectContent className="bg-slate-500 text-black">
              <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
              <SelectItem value="Backend Developer">Backend Developer</SelectItem>
              <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={handleSubmit} 
          className="w-full mt-4"
          disabled={!localTextData || !localJobRole}
        >
          Generate Interview Questions
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;