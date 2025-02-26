import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiUpload, FiUser, FiPhone, FiGlobe, FiDollarSign, FiUsers } from 'react-icons/fi';

const validationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[0-9+\-() ]+$/, 'Invalid phone number')
    .required('Phone number is required'),
  channelName: Yup.string()
    .min(3, 'Channel name must be at least 3 characters')
    .required('Channel name is required'),
  category: Yup.string().required('Category is required'),
  website: Yup.string()
    .url('Must be a valid URL')
    .required('Website/Portfolio is required'),
  socialLinks: Yup.string().required('Social media links are required'),
  monetizationStatus: Yup.string().required('Monetization status is required'),
  collaborations: Yup.string(),
  govID: Yup.mixed().required('Government ID is required'),
});

export default function BecomeCreator() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      phone: '',
      channelName: '',
      category: '',
      website: '',
      socialLinks: '',
      monetizationStatus: '',
      collaborations: '',
      govID: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        console.log('Form submitted:', values);
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
        alert('Application submitted successfully!');
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue('govID', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Become a Creator</h1>
          <p className="text-lg text-gray-600">
            Join our community of creators and start sharing your content with the world
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="bg-white shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone Number */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  {...formik.getFieldProps('phone')}
                  className={`pl-10 w-full rounded-lg border ${
                    formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
              )}
            </div>

            {/* Channel Name */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="channelName">
                Channel Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="channelName"
                  {...formik.getFieldProps('channelName')}
                  className={`pl-10 w-full rounded-lg border ${
                    formik.touched.channelName && formik.errors.channelName ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Your Channel Name"
                />
              </div>
              {formik.touched.channelName && formik.errors.channelName && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.channelName}</p>
              )}
            </div>
          </div>

          {/* Government ID Upload */}
          <div className="mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Government ID</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                {previewImage ? (
                  <div className="relative">
                    <img src={previewImage} alt="ID Preview" className="mx-auto h-32 w-auto object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        formik.setFieldValue('govID', null);
                      }}
                      className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <>
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="govID"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input id="govID" name="govID" type="file" accept="image/*,.pdf" className="sr-only" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </>
                )}
              </div>
            </div>
            {formik.touched.govID && formik.errors.govID && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.govID}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 bg-blue-600 text-white rounded-md">
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
