// src/features/imageUpload/imageUploadSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const uploadImage = createAsyncThunk("imageUpload/uploadImage", async (imageFile, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const response = await fetch("https://clinical-3ndq.onrender.com/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchImages = createAsyncThunk("imageUpload/fetchImages", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://clinical-3ndq.onrender.com/images");

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const imageUploadSlice = createSlice({
  name: "imageUpload",
  initialState: {
    uploading: false,
    success: false,
    error: null,
    images: [],
    loading: false,
  },
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.uploading = false;
        state.success = true;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
