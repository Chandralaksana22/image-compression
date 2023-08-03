// File: ImageCompressorApp.js
import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const ImageCompressorApp = () => {
  const [originalImages, setOriginalImages] = useState([]);
  const [compressedImages, setCompressedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newWidth, setNewWidth] = useState(800);
  const [newHeight, setNewHeight] = useState(600);

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const originalImageUrls = [];
    const compressedImageUrls = [];

    setIsLoading(true);

    // Convert FileList object to an array
    const filesArray = Array.from(files);

    for (const file of filesArray) {
      originalImageUrls.push(URL.createObjectURL(file));

      try {
        const options = {
          maxSizeMB: 1, // Max file size for compression in MB
          maxWidthOrHeight: Math.max(newWidth, newHeight), // Max width or height for compression in pixels
          useWebWorker: true, // Use web worker to speed up compression process
        };

        const compressedFile = await imageCompression(file, options);
        compressedImageUrls.push(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }

    setOriginalImages(originalImageUrls);
    setCompressedImages(compressedImageUrls);
    setIsLoading(false);
  };

  const handleDownload = (compressedImage) => () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = compressedImage;
    downloadLink.download = "compressed_image.jpg";
    downloadLink.click();
  };

  return (
    <div className="bg-base-200">
      <div className="hero bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Image Compressor</h1>
            <p className="py-6">
              Dengan Image Compressor Hanya Sekali Klik, Masalah Gambar Anda
              Teratasi
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-2 md:px-10 bg-base-200">
      {isLoading && <span className="loading loading-infinity loading-lg"></span>}
      <div className="grid grid-cols-2 lg:grid-cols-4 p-2 gap-4">
            {originalImages.map((originalImage, index) => (
                <div key={index}>
                {compressedImages[index] && (
                    <div>
                    <h2 className="mx-auto mb-2">Compressed Image {index + 1}</h2>
                    <img
                        className="h-[10rem] w-[10rem] object-cover"
                        src={compressedImages[index]}
                        alt={`Compressed ${index + 1}`}
                    />
                    <button className="btn btn-success mt-5 btn-sm" onClick={handleDownload(compressedImages[index])}>
                        Download
                    </button>
                    </div>
                )}
                </div>
            ))}
        </div>
      </div>
      <div className="container mx-auto p-2 md:p-10 bg-base-200">
        <div className="form-control w-full max-w-xs mb-5">
          <label htmlFor="newWidth" className="label">
            <span className="label-text">Ukuran Lebar (px)</span>
          </label>
          <input
            type="number"
            value={newWidth}
            onChange={(e) => setNewWidth(e.target.value)}
            placeholder="800px"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs mb-5">
          <label htmlFor="newHeight" className="label">
            <span className="label-text">Ukuran Tinggi (px)</span>
          </label>
          <input
            type="number"
            value={newHeight}
            onChange={(e) => setNewHeight(e.target.value)}
            placeholder="800px"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPEG,</p>
          </div>
          <input id="dropzone-file"  type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange} className="hidden" />
        </label>
      </div>
      </div>
    </div>
  );
};

export default ImageCompressorApp;
