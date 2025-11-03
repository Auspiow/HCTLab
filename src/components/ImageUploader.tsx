import React from "react";

interface ImageUploaderProps {
  onImageLoad: (img: HTMLImageElement) => void;
}

export default function ImageUploader({ onImageLoad }: ImageUploaderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => onImageLoad(img);
  };

  return (
    <div className="p-4 text-center border-2 border-dashed rounded-2xl cursor-pointer bg-gray-50">
      <input type="file" accept="image/*" onChange={handleChange} />
      <p className="text-gray-500 mt-2">上传一张图片以提取主色 🌈</p>
    </div>
  );
}
