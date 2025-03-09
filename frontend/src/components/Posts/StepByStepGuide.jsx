import React, { useEffect, useState } from 'react';
import { PlusCircle, X, Upload, FileText, Image } from 'lucide-react';
import axios from 'axios';

export default function StepByStepGuide() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [steps, setSteps] = useState([]);
  const [status, setStatus] = useState('approved');
  const BackendServername = import.meta.env.VITE_BACKENDSERVERNAME;

  const handleAddStep = () => {
    setSteps([...steps, { stepTitle: '', stepDescription: '', stepMedia: null }]);
  };

  const handleRemoveStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    if (field === 'stepMedia' && value instanceof File) {
      newSteps[index][field] = value;
    } else if (typeof value === 'string') {
      newSteps[index][field] = value;
    }
    setSteps(newSteps);
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', JSON.stringify(tags));
    formData.append('status', status);
    formData.append('steps', JSON.stringify(steps));
    
    if (thumbnailImage) {
      formData.append('thumbnailImage', thumbnailImage);
    }

    steps.forEach((step) => {
      if (step.stepMedia) {
        formData.append('stepMedia', step.stepMedia);
      }
    });

    try {
      const response = await axios.post(`${BackendServername}/stepbystepguide/addguide`, formData, {
        withCredentials: true
      });

      if (response.status == 201) {
        alert('Guide created successfully!');
      } else {
        alert('Failed to create guide');
      }
    } catch (error) {
      console.error('Error creating guide:', error);
      alert('Error creating guide');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6]">
            <h1 className="text-3xl font-bold text-white">Create Step-by-Step Guide</h1>
            <p className="mt-2 text-blue-100">Share your knowledge with detailed steps</p>
          </div>
        
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Title & Description Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guide Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Enter a descriptive title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Provide a detailed description of your guide"
                  required
                />
              </div>
            </div>

            {/* Thumbnail Upload Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Thumbnail Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors duration-200">
                <div className="space-y-2 text-center">
                  <Image className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnailImage(e.target.files?.[0] || null)}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Tags Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Tags</label>
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 transition-transform hover:scale-105"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 inline-flex items-center hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add tag and press Enter"
                  className="flex-1 min-w-[200px] bg-transparent border-none focus:ring-0 text-sm"
                />
              </div>
            </div>

            {/* Steps Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Guide Steps</h2>
                <button
                  type="button"
                  onClick={handleAddStep}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:from-[#1E40AF] hover:to-[#2563EB] transition-all duration-200 transform hover:scale-105"
                >
                  <PlusCircle className="mr-2" size={18} />
                  Add Step
                </button>
              </div>

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Step {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Step Title</label>
                        <input
                          type="text"
                          value={step.stepTitle}
                          onChange={(e) => handleStepChange(index, 'stepTitle', e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="Enter step title"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Step Description</label>
                        <textarea
                          value={step.stepDescription}
                          onChange={(e) => handleStepChange(index, 'stepDescription', e.target.value)}
                          rows={3}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="Describe this step"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Media (Optional)</label>
                        <div className="flex items-center justify-center px-6 py-4 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors duration-200">
                          <div className="text-center">
                            <FileText className="mx-auto h-8 w-8 text-gray-400" />
                            <label className="mt-2 cursor-pointer">
                              <span className="text-sm text-blue-600 hover:text-blue-500">Upload media</span>
                              <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) => handleStepChange(index, 'stepMedia', e.target.files?.[0] || null)}
                                className="sr-only"
                              />
                            </label>
                            <p className="mt-1 text-xs text-gray-500">Images or videos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-lg hover:from-[#1E40AF] hover:to-[#2563EB] transition-all duration-200 transform hover:scale-105 font-medium text-lg shadow-lg"
              >
                Create Guide
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}