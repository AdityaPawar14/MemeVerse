import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, Smile, Tag, Globe, AlertCircle, CheckCircle, Loader, Sparkles } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addUploadedMeme } from '../store/slices/memesSlice';

const UploadPage = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('funny');
  const [tags, setTags] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [caption, setCaption] = useState('');
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);

  const funnyCaptions = [
    "When you realize it's Monday tomorrow...",
    "Me trying to adult like...",
    "When you see your crush but act cool.",
    "POV: You're the last slice of pizza.",
    "When you hear your favorite song come on.",
    "Me pretending to understand the conversation.",
    "When you finally get the Wi-Fi password.",
    "When you realize you left the oven on.",
    "When you try to sneak snacks into the movie theater.",
    "When you see your ex with someone else.",
  ];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5 * 1024 * 1024,
    onDrop: acceptedFiles => handleFile(acceptedFiles[0]),
    multiple: false
  });

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Unsupported file format. Please upload an image.');
      return;
    }

    setError('');
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleGenerateCaption = async () => {
    if (!file) {
      setError('Please upload an image first.');
      return;
    }

    setIsGeneratingCaption(true);
    setError('');

    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const randomCaption = funnyCaptions[Math.floor(Math.random() * funnyCaptions.length)];
      setCaption(randomCaption);
    } catch (err) {
      setError('Failed to generate caption. Please try again.');
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title) {
      setError('Please fill all required fields');
      return;
    }

    setIsUploading(true);
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newMeme = {
        id: Date.now().toString(),
        name: title,
        url: preview,
        uploadDate: new Date().toISOString(),
        uploadedBy: 'You',
        category,
        tags,
        caption
      };

      dispatch(addUploadedMeme(newMeme));
      setError('');
      setFile(null);
      setPreview('');
      setTitle('');
      setCategory('funny');
      setTags([]);
      setCaption('');
      alert('Meme uploaded successfully!');
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
          <Upload className="h-8 w-8 mr-2 text-indigo-600 dark:text-indigo-400" />
          Share Your Creativity
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload your meme and share it with the global community
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-2 gap-8"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 
               'border-gray-300 dark:border-gray-700 hover:border-indigo-500'}`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <div className="flex justify-center">
                <Image className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {isDragActive ? 'Drop it here!' : 'Drag & Drop or Browse Files'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Supported formats: JPEG, PNG, GIF (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center p-4 text-sm text-red-700 bg-red-100 dark:bg-red-900/20 dark:text-red-400 rounded-lg"
              role="alert"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </motion.div>
          )}

          {preview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative group"
            >
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg shadow-sm"
              />
              <button
                onClick={() => {
                  setFile(null);
                  setPreview('');
                }}
                className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
                aria-label="Remove image"
              >
                <span className="text-gray-900 dark:text-white">×</span>
              </button>
            </motion.div>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Meme Title *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                  placeholder="Enter a catchy title..."
                  aria-label="Meme title"
                />
                <Smile className="h-5 w-5 text-gray-400 dark:text-gray-500 absolute right-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Caption
              </label>
              <div className="relative">
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                  placeholder="Add a caption for your meme..."
                  aria-label="Meme caption"
                />
                <button
                  type="button"
                  onClick={handleGenerateCaption}
                  disabled={isGeneratingCaption || !file}
                  className="absolute right-3 bottom-3 p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
                  aria-label="Generate caption"
                >
                  {isGeneratingCaption ? (
                    <Loader className="h-5 w-5 animate-spin text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 appearance-none"
                  aria-label="Select category"
                >
                  <option value="funny">Funny</option>
                  <option value="gaming">Gaming</option>
                  <option value="animals">Animals</option>
                  <option value="movies">Movies</option>
                  <option value="tv-shows">TV Shows</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-3.5">
                  <Tag className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (Optional)
              </label>
              <input
                type="text"
                value={tags.join(', ')}
                onChange={(e) => setTags(e.target.value.split(/,\s?/))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800"
                placeholder="Add comma-separated tags (e.g., funny, cats, weekend)"
                aria-label="Add tags"
              />
            </div>

            {preview && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preview</h3>
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Meme Preview"
                    className="w-full h-64 object-cover rounded-lg shadow-sm"
                  />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Title:</span> {title}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Caption:</span> {caption}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Category:</span> {category}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Tags:</span> {tags.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <button
                type="submit"
                disabled={isUploading}
                className="w-full flex justify-center items-center px-6 py-3.5 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Upload meme"
              >
                {isUploading ? (
                  <>
                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Meme
                  </>
                )}
              </button>
            </div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg space-y-4"
          >
            <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Upload Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Use high-quality images (min 600px width)</li>
              <li>• Keep text concise and readable</li>
              <li>• Respect copyright and intellectual property</li>
              <li>• Avoid offensive or sensitive content</li>
            </ul>
          </motion.div>

          <div className="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400">
            <Globe className="h-5 w-5" />
            <span>Supported Languages: English, Español, Français, 中文, العربية</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UploadPage;
