"use client";
import React from 'react';
import { useState } from "react";
import {  pdfjs } from "react-pdf";
// import { Button } from "./ui/button";
import {Input} from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

pdfjs.GlobalWorkerOptions.workerSrc = 
//   "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js";
// "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js"
// 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.9.155/pdf.worker.min.mjs'
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs'

type FileUploadProps = {
  onFileUpload?: (text: string) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [textData, setTextData] = useState<string>("");

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
        setTextData(text);
        if (onFileUpload) {
          onFileUpload(text);
        }
      }
    };
  };

  return (
    <div className="flex flex-col gap-4">
        <h2 className="self-center" >Please Upload Candidate&apos;s Resume</h2>
      <Input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="text-white text-center flex justify-center"
      />
      {file && <p className="text-sm text-gray-400">Uploaded: {file.name}</p>}
      {textData && (
        <div className="p-2 text-sm text-gray-300 border border-gray-500 rounded">
          <h3 className="font-bold">Extracted Text:</h3>
          <p className="max-h-40 overflow-auto">{textData}</p>
        </div>
      )}
                           <div className="flex justify-evenly" >
                      {/* <span className="mt-1" >JOB ROLE:</span> */}
             <div className="flex justify-end" >
                     <Select  >
               <SelectTrigger className="w-[300px]">
                 <SelectValue placeholder="Job Role" />
               </SelectTrigger>
               <SelectContent className="bg-slate-500 text-black">
                 <SelectItem value="light">Full Stack Developer</SelectItem>
                 <SelectItem value="dark">Backend Developer</SelectItem>
                 <SelectItem value="system">Frontend Developer</SelectItem>
               </SelectContent>
             </Select>
             </div>
    </div>
    </div>
  );
};

export default FileUpload;
