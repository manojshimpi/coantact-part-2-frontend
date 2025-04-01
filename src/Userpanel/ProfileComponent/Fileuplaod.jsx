import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { uploadFileTesting } from '../../store/userSlice/userActions';

function FileUpload() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null); // Store the selected file
  const [imagePreview, setImagePreview] = useState(null); // Store image preview URL

  // Validation schema for file upload
  const validationSchema = Yup.object({
    file: Yup.mixed()
      .required('File is required')
      .test('fileSize', 'File is too large', (value) => !value || value.size <= 5242880) // max 5MB
      .test('fileFormat', 'Unsupported file format', (value) => !value || ['image/jpeg', 'image/png'].includes(value.type)),
  });

  const handleFileChange = (event, setFieldValue) => {
    const uploadedFile = event.currentTarget.files[0];
    if (uploadedFile) {
      setFile(uploadedFile); // Store the selected file in the state
      setFieldValue('file', uploadedFile); // Set the file to Formik's field value

      // If the uploaded file is an image, generate a preview
      if (uploadedFile && uploadedFile.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result); // Set image preview
        };
        reader.readAsDataURL(uploadedFile);
      } else {
        setImagePreview(null); // Clear the preview if not an image
      }
    }
  };

  const handleSubmit = async (values) => {
    // Simulate an API call or handle the form submission logic here
    console.log('Form Data', values.file); // This will log the file from Formik state
    dispatch(uploadFileTesting(values.file)); // Pass only the file to the action
  };

  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(null);
  };

  return (
    <div className="tab-pane fade fileupload pt-3" id="fileupload">
      <Formik
        initialValues={{ file: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            {/* Profile Image Upload */}
            <div className="row mb-3">
              <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
              <div className="col-md-8 col-lg-9">
                {/* Display the preview of the selected image */}
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="img-fluid" style={{ maxHeight: '100px', objectFit: 'contain' }} />
                ) : (
                  <img src="../assets/img/profile-img.jpg" alt="Profile" className="img-fluid" style={{ maxHeight: '100px', objectFit: 'contain' }} />
                )}

                <div className="pt-2">
                  {/* Upload Button */}
                  <label htmlFor="file" className="btn btn-primary btn-sm" title="Upload new profile image">
                    <i className="bi bi-upload"></i>
                    <input
                      type="file"
                      name="file"
                      className="d-none"
                      onChange={(event) => handleFileChange(event, setFieldValue)}
                      id="file"
                      accept=".jpg,.jpeg,.png"
                    />
                  </label>

                  {/* Remove Button */}
                  {file && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm ms-2"
                      title="Remove my profile image"
                      onClick={handleRemoveImage}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Upload</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FileUpload;
