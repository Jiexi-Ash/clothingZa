"use client";
import { ImageIcon, Loader } from "lucide-react";
import React, { useState, useTransition } from "react";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";

interface UplaodProductImageProps {
  showPreview?: boolean;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  handleUpload?: () => void;
  isPending?: boolean;
}

function UplaodProductImage({
  setImage,
  showPreview = false,
  isPending,
  handleUpload,
}: UplaodProductImageProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // check if file is an image
    if (file.type.split("/")[0] !== "image") {
      alert("Please upload an image.");
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    setImage(file);
  };

  const handleImage = () => {
    return <ImageIcon className="h-5 w-5 text-white" />;
  };
  return (
    <>
      <div className="flex flex-col">
        <div
          className={`relative h-[300px] w-full  items-center  justify-center bg-gray-200 ${
            showPreview ? "hidden" : "flex"
          }`}
        >
          {imagePreview ? (
            <Image src={imagePreview} className="object-cover" alt="" fill />
          ) : (
            handleImage()
          )}
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            className="max-w-fit rounded-none text-xs shadow-none"
            onClick={handleClick}
          >
            Choose Image
          </Button>

          {imagePreview && showPreview ? (
            <Button
              onClick={handleUpload}
              className="max-w-fit rounded-none text-xs shadow-none"
            >
              {isPending ? <Loader /> : "Upload Image"}
            </Button>
          ) : null}
        </div>
      </div>
      <form>
        <input
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          type="file"
          onChange={handleChange}
        />
      </form>
    </>
  );
}

export default UplaodProductImage;
