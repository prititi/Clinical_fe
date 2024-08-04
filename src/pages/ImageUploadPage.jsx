// src/components/ImageUploadPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Paper, Typography, CircularProgress, Alert } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { uploadImage, fetchImages } from "../features/imageUpload/imageUploadSlice";

const ImageUploadPage = () => {
  const dispatch = useDispatch();
  const { uploading, success, error, images, loading } = useSelector((state) => state.uploadImage);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      dispatch(uploadImage(acceptedFiles[0]));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: "image/*" });

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch, success]);

  return (
    <Container component="main" maxWidth="sm" className="mt-12">
      {/* <Paper elevation={3} className="p-8"> */}
      <Typography variant="h5" component="h1" gutterBottom className="text-center mb-6">
        Upload Image
      </Typography>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "dropzone-active" : ""}`}
        style={{
          border: "2px dashed #ccc",
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="body1">Drop the files here...</Typography>
        ) : (
          <Typography variant="body1">Drag & drop an image here, or click to select one</Typography>
        )}
      </div>
      {uploading && (
        <div className="mt-4 text-center">
          <CircularProgress />
        </div>
      )}
      {success && (
        <Alert severity="success" className="mt-4">
          Image uploaded successfully!
        </Alert>
      )}
      {error && (
        <Alert severity="error" className="mt-4">
          {error}
        </Alert>
      )}
      {/* </Paper> */}

      <div className="mt-16"></div>
      <Typography variant="h6" component="h2" className="mt-16 mb-4 text-center">
        Uploaded Images
      </Typography>
      {loading ? (
        <div className="mt-4 text-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 my-3 mt-8">
          {images?.images?.map((image, index) => (
            <img key={index} src={image} alt={index} className="w-full h-auto" />
          ))}
        </div>
      )}
    </Container>
  );
};

export default ImageUploadPage;
