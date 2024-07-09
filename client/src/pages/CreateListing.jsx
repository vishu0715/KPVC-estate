import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { app } from '../firebase';

export default function CreateListing() {
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    videoUrls: [],
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const imageFilesList = [];
    const videoFilesList = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (file.type.startsWith('image/')) {
        imageFilesList.push(file);
      } else if (file.type.startsWith('video/')) {
        videoFilesList.push(file);
      }
    }

    setImageFiles(imageFilesList);
    setVideoFiles(videoFilesList);
  };

  const handleFileUpload = async () => {
    if ((imageFiles.length + formData.imageUrls.length + videoFiles.length + formData.videoUrls.length) > 6) {
      setUploadError('Please upload up to 6 files only');
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      const imageUploadPromises = imageFiles.map(storeFile);
      const videoUploadPromises = videoFiles.map(storeFile);

      const imageUrls = await Promise.all(imageUploadPromises);
      const videoUrls = await Promise.all(videoUploadPromises);

      setFormData({
        imageUrls: [...formData.imageUrls, ...imageUrls],
        videoUrls: [...formData.videoUrls, ...videoUrls],
      });

      setImageFiles([]);
      setVideoFiles([]);
    } catch (error) {
      console.error('Failed to upload files', error);
      setUploadError('Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const storeFile = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  const handleRemoveFile = (type, index) => {
    if (type === 'image') {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
      });
    } else if (type === 'video') {
      setFormData({
        ...formData,
        videoUrls: formData.videoUrls.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type="text"
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
          />
          <textarea
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            maxLength='200'
            minLength='10'
            required
          />
          <input
            type="text"
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
          />
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='sale' className='w-5' />
              <span>Sell</span>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='rent' className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='parking' className='w-5' />
              <span>Parking spot</span>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
            <div className='flex items-center gap-2'>
              <input type='checkbox' id='offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                className='p-3 border border-gray-300 rounded-lg'
                required
              />
              <p>Bedrooms</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                className='p-3 border border-gray-300 rounded-lg'
                required
              />
              <p>Bathrooms</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='1'
                max='10'
                className='p-3 border border-gray-300 rounded-lg'
                required
              />
              <div className='flex flex-col items-center'>
                <p>Regular Price</p>
                <span className='text-xs'>($/month)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountedPrice'
                min='1'
                max='10'
                className='p-3 border border-gray-300 rounded-lg'
                required
              />
              <div className='flex flex-col items-center'>
                <p>Discounted Price</p>
                <span className='text-xs'>($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <p className='font-semibold'>
            Files:
            <span className='font-normal text-gray-600 ml-2'>
              Upload images and videos (max 6)
            </span>
          </p>
          <div className='flex gap-4 items-center'>
            <input
              onChange={handleFileChange}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='files'
              accept='image/*, video/*'
              multiple
            />
            <button
              type='button'
              disabled={uploading}
              onClick={handleFileUpload}
              className='p-3 text-green-700 border border-green-700 rounded uppercase text-sm hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-500'>{uploadError}</p>
          {/* Display uploaded images */}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className='flex justify-between p-3 border items-center'>
                <img src={url} alt='listing image' className='w-20 h-20 object-contain rounded-lg' />
                <button
                  type='button'
                  onClick={() => handleRemoveFile('image', index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75 disabled:opacity-80'
                >
                  Delete
                </button>
              </div>
            ))}
          {/* Display uploaded videos */}
          {formData.videoUrls.length > 0 &&
            formData.videoUrls.map((url, index) => (
              <div key={url} className='flex justify-between p-3 border items-center'>
                <video src={url} controls className='w-20 h-20 object-contain rounded-lg'></video>
                <button
                  type='button'
                  onClick={() => handleRemoveFile('video', index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75 disabled:opacity-80'
                >
                  Delete
                </button>
              </div>
            ))}
          <button className='p-3 bg-blue-600 text-white rounded-lg uppercase mt-4 hover:opacity-95 disabled:opacity-80'>
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}

