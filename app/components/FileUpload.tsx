"use client";
import React, {  useState } from "react";
import {  IKUpload } from "imagekitio-next";
import {Loader2} from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";


interface FileUploadProps {
  onSuccess: (response: IKUploadResponse) => void;
  onError: (error: Error) => void;
  onUploadProgress: (progress: number) => void;
  onUploadStart: () => void;
  fileType: "image" | "video" | "audio" | "document" ;
}

// const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
// const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;



export default function FileUpload({
  onSuccess,
  onUploadProgress,
  fileType = "image",
}: FileUploadProps) {

  const [isUploading, setIsUploading] = useState(false);
  const [error,setError] = useState<string | null>(null);


  const onError = (err:{message:string}) => {
    console.log("Error", err);
    setError(err.message);
    setIsUploading(false);
  };

  const handleSuccess = (res:IKUploadResponse) => {
    console.log("Success", res);
    onSuccess(res);
    setIsUploading(false);
    setError(null);
  };

  const handleUploadProgress = (evt : ProgressEvent) => {
    if(evt.lengthComputable && onUploadProgress){
      onUploadProgress(Math.round((evt.loaded * 100) / evt.total));
    }
    console.log("Progress");
    setIsUploading(true);
    setError(null);
  };

  const handleUploadStart = () => {
    console.log("Start");
    setIsUploading(true);
    setError(null);
  };

  const validateFile = (file:File) => {
    if(fileType === "video"){
      if(!file.type.startsWith("video/")){
        setError("Invalid file type");
        return false;
    }
      if (file.size > 100 * 1024 * 1024) {
        setError("File size must be less than 100MB");
        return false;
      }
  }else{
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if(!validTypes.includes(file.type)){
      setError("please upload a valid image");
      return false;
  }
  if(file.size > 5 * 1024 * 1024){
    setError("File size must be less than 5MB");
    return false;
  }
  };

  return false;
  }

  return (
    <div className="space-y-4">
   
        <IKUpload
          fileName={fileType === "image" ? "image.jpg" : "video.mp4"}
          // tags={["sample-tag1", "sample-tag2"]}
          // customCoordinates={"10,10,10,10"}
          // isPrivateFile={false}
          // useUniqueFileName={true}
          // responseFields={["tags"]}
          // validateFile={validateFile}
          // folder={"/sample-folder"}
          // {/* extensions={[
          //   {
          //     name: "remove-bg",
          //     options: {
          //       add_shadow: true,
          //     },
          //   },
          // ]} */}
          // webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
          // overwriteFile={true}
          // overwriteAITags={true}
          // overwriteTags={true}
          // overwriteCustomMetadata={true}
          // {/* customMetadata={{
          //   "brand": "Nike",
          //   "color": "red",
          // }} */}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleUploadProgress}
          onUploadStart={handleUploadStart}
          accept={fileType === "image" ? "image/*" : "video/*"}
          className=" file-input file-input-bordered file-input-primary w-full max-w-xs"
          validateFile={validateFile}
          useUniqueFileName={true}
          folder={fileType === "image" ? "/images" : "/videos"}
          // transformation={{
          //   pre: "l-text,i-Imagekit,fs-50,l-end",
          //   post: [
          //     {
          //       type: "transformation",
          //       value: "w-100",
          //     },
          //   ],
          // }}
          // style={{ display: 'none' }} // hide the default input and use the custom upload button
          // ref={ikUploadRefTest}
        />
        {
          isUploading && (
            <div className="progress progress-primary w-56">
              {/* <progress className="progress-primary" value={} max="100"></progress> */}
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Uploading...</span>
            </div>
          )
        }
        {
          error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )
        }
        {/* <p>Custom Upload Button</p>
        {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.click()}>Upload</button>}
        <p>Abort upload request</p>
        {ikUploadRefTest && <button onClick={() => ikUploadRefTest.current.abort()}>Abort request</button>} */}
     
      {/* ...other SDK components added previously */}
    </div>
  );
}