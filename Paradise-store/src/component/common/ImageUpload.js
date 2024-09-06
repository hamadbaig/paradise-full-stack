"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { UploadButton } from '@uploadthing/react';
const ImageUpload = ()=> {
  const [imageUrl, setImageUrl]= useState("");
  return (
    <div>
      <UploadButton   endpoint='imageUploader'
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
         setImageUrl(res[0].url)   
           }}
      onUploadError={(error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
      />
      {imageUrl.length ?<div>
        <Image src={imageUrl} alt='uploaded pic' width={500} height={500}/>
      </div> : null}
    </div>
  )
}

export default ImageUpload;