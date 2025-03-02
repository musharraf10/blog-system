import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaTimesCircle, FaSpinner } from 'react-icons/fa';
import Select from 'react-select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createPostAPI } from '../../APIServices/posts/postsAPI';
import AlertMessage from '../Alert/AlertMessage';
import { fetchCategoriesAPI } from '../../APIServices/category/categoryAPI';

const CreatePost = () => {
  const [description, setDescription] = useState('');
  const [imageError, setImageErr] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // Post mutation
  const postMutation = useMutation({
    mutationKey: ['create-post'],
    mutationFn: createPostAPI,
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      description: '',
      image: '',
      category: '',
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required'),
      image: Yup.string().required('Image is required'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('description', description);
      formData.append('image', values.image);
      formData.append('category', values.category);
      postMutation.mutate(formData);
    },
  });

  // Fetch categories
  const { data } = useQuery({
    queryKey: ['category-lists'],
    queryFn: fetchCategoriesAPI,
  });

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file.size > 1048576) {
      setImageErr('File size exceeds 1MB');
      return;
    }
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
      setImageErr('Invalid file type. Only JPEG, JPG, and PNG are allowed.');
      return;
    }
    formik.setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
    setImageErr('');
  };

  // Remove image
  const removeImage = () => {
    formik.setFieldValue('image', null);
    setImagePreview(null);
  };

  // Mutation states
  const isLoading = postMutation.isPending;
  const isError = postMutation.isError;
  const isSuccess = postMutation.isSuccess;
  const errorMsg = postMutation?.error?.response?.data?.message;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create a New Post
        </h2>

        {/* Alert Messages */}
        {isLoading && (
          <AlertMessage
            type="loading"
            message={
              <div className="flex items-center gap-2">
                <FaSpinner className="animate-spin" /> Loading, please wait...
              </div>
            }
          />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Post created successfully!" />
        )}
        {isError && <AlertMessage type="error" message={errorMsg} />}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <ReactQuill
              value={formik.values.description}
              onChange={(value) => {
                setDescription(value);
                formik.setFieldValue('description', value);
              }}
              placeholder="Write your post content here..."
              className="h-48 mb-2"
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link', 'image'],
                  ['clean'],
                ],
              }}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Category Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <Select
              name="category"
              options={data?.categories?.map((category) => ({
                value: category._id,
                label: category.categoryName,
              }))}
              onChange={(option) =>
                formik.setFieldValue('category', option.value)
              }
              value={data?.categories?.find(
                (option) => option.value === formik.values.category,
              )}
              placeholder="Select a category"
              className="mt-1"
            />
            {formik.touched.category && formik.errors.category && (
              <p className="text-sm text-red-600 mt-1">
                {formik.errors.category}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              id="images"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="images"
              className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Choose a file
            </label>
            <p className="text-sm text-gray-500 mt-2">
              JPEG, JPG, or PNG (Max 1MB)
            </p>
            {imageError && (
              <p className="text-sm text-red-600 mt-2">{imageError}</p>
            )}
            {imagePreview && (
              <div className="mt-4 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition-colors"
                >
                  <FaTimesCircle className="text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" /> Creating Post...
              </div>
            ) : (
              'Create Post'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreatePost;