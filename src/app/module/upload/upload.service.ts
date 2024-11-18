/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import axios from 'axios';

const initUpload = async (file: FormData) => {
  try {
    const apiUrl = `https://api.imgbb.com/1/upload?key=${process.env.VITE_IMGBB_API_KEY}`;
    
    
    const res = await axios.post(apiUrl, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 60000 // Set a timeout (e.g., 60 seconds) if necessary
    });

    console.log(res.data, 'Response after upload');

    if (res.data && res.data.success) {
      return res.data;
    } else {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Upload failed');
    }
  } catch (error: any) {
    console.error('Upload Error:', error.response?.data || error.message || 'Unknown error');

    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || 'An error occurred during the upload process!',
    );
  }
}

export const uploadServices = {
  initUpload,
};
