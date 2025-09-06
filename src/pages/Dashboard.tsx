import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import FileGallery from '../components/FileGallery';
import { apiService } from '../utils/api';
import { User, Files, Upload, Eye } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const fetchFiles = async () => {
    if (!showFiles) return;
    
    setLoading(true);
    try {
      const response = await apiService.getFiles();
      setFiles(response.files || []);
    } catch (error) {
      console.error('Failed to fetch files:', error);
      // For demo, use mock data
      setFiles([
        {
          id: '1',
          name: 'sunset-beach.jpg',
          type: 'image/jpeg',
          size: 2048576,
          url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=500',
          uploadedAt: '2024-01-15T10:30:00Z',
        },
        {
          id: '2',
          name: 'mountain-view.jpg',
          type: 'image/jpeg',
          size: 3145728,
          url: 'https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=500',
          uploadedAt: '2024-01-14T15:45:00Z',
        },
        {
          id: '3',
          name: 'city-night.jpg',
          type: 'image/jpeg',
          size: 1572864,
          url: 'https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg?auto=compress&cs=tinysrgb&w=500',
          uploadedAt: '2024-01-13T20:15:00Z',
        },
        {
          id: '4',
          name: 'forest-path.jpg',
          type: 'image/jpeg',
          size: 2621440,
          url: 'https://images.pexels.com/photos/355018/pexels-photo-355018.jpeg?auto=compress&cs=tinysrgb&w=500',
          uploadedAt: '2024-01-12T08:20:00Z',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showFiles) {
      fetchFiles();
    }
  }, [showFiles]);

  const handleFileUpload = async (uploadedFiles: File[]) => {
    try {
      // For demo purposes, we'll simulate file upload
      const newFiles: FileItem[] = uploadedFiles.map((file, index) => ({
        id: Date.now() + index.toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString(),
      }));
      
      setFiles(prev => [...newFiles, ...prev]);
      setShowFiles(true);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const stats = [
    { label: 'Total Files', value: files.length.toString(), icon: Files },
    { label: 'Storage Used', value: `${(files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(1)} MB`, icon: Upload },
    { label: 'Last Upload', value: files.length > 0 ? new Date(files[0].uploadedAt).toLocaleDateString() : 'None', icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your photos and videos with ease
          </p>
        </div>

        {/* User Profile Card */}
        <div className="mb-8 animate-slide-up">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-soft border border-white/20">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-glow">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user?.name}</h2>
                <div className="space-y-1">
                  <p className="text-gray-600 flex items-center">
                    <span className="w-16 inline-block font-medium">Email:</span> {user?.email}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="w-16 inline-block font-medium">Phone:</span> {user?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-soft border border-white/20 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
          <button
            onClick={() => setShowFiles(!showFiles)}
            disabled={loading}
            className="flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-glow transition-all duration-300 disabled:opacity-50"
          >
            <Eye className="w-5 h-5" />
            <span>{loading ? 'Loading...' : (showFiles ? 'Hide Files' : 'Show My Files')}</span>
          </button>
          
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center justify-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-white/20 text-gray-700 font-medium rounded-xl hover:bg-white hover:shadow-soft transition-all duration-300"
          >
            <Upload className="w-5 h-5" />
            <span>{showUpload ? 'Hide Upload' : 'Upload Files'}</span>
          </button>
        </div>

        {/* File Upload */}
        {showUpload && (
          <div className="mb-8 animate-fade-in">
            <FileUpload onUpload={handleFileUpload} />
          </div>
        )}

        {/* File Gallery */}
        {showFiles && (
          <div className="animate-fade-in">
            <FileGallery files={files} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;