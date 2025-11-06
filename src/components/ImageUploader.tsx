import { useState, type ChangeEvent, type DragEvent } from "react";

interface ImageUploaderProps {
  onImageLoad: (img: HTMLImageElement) => void;
}

export default function ImageUploader({ onImageLoad }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("请上传图片文件！");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => onImageLoad(img);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-colors cursor-pointer select-none
        ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-gray-800"
            : "border-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600"
        }`}
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 mb-3 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 014-4h1l1-2a4 4 0 017 0l1 2h1a4 4 0 014 4v2a4 4 0 01-4 4H7a4 4 0 01-4-4v-2z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v6m0 0l-2-2m2 2l2-2" />
        </svg>
        <p className="font-medium">
          点击选择图片或将文件拖拽到此处
        </p>
        <p className="text-sm text-gray-400 mt-1">支持 JPG、PNG、WEBP 等格式</p>
      </div>

      {isDragging && (
        <div className="absolute inset-0 rounded-2xl border-4 border-blue-400 border-opacity-40 animate-pulse pointer-events-none"></div>
      )}
    </div>
  );
}
