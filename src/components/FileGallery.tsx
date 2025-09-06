import React, { useState } from 'react';
import { Download, Eye, Trash2, Calendar, File as FileSize, Image, Video, File } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

interface FileGalleryProps {
  files: FileItem[];
  loading: boolean;
}

const FileGallery: React.FC<FileGalleryProps> = ({ files, loading }) => {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    return File;
  };

  const isImage = (type: string) => type.startsWith('image/');
  const isVideo = (type: string) => type.startsWith('video/');

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-soft border border-white/20">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-soft border border-white/20">
        <div className="text-center py-12">
          <div className="p-4 bg-gray-100 rounded-2xl w-fit mx-auto mb-4">
            <File className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Files Found</h3>
          <p className="text-gray-600">Upload some files to see them here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-soft border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Files</h2>
        <div className="text-sm text-gray-600">
          {files.length} file{files.length !== 1 ? 's' : ''} • {formatFileSize(files.reduce((acc, file) => acc + file.size, 0))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {files.map((file, index) => {
          const FileIcon = getFileIcon(file.type);
          return (
            <div
              key={file.id}
              className="file-item bg-white rounded-2xl p-4 shadow-soft border border-gray-100 hover:shadow-glow transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* File Preview */}
              <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gray-50 relative group">
                {isImage(file.type) ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : isVideo(file.type) ? (
                  <video
                    src={file.url}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <button
                      onClick={() => setSelectedFile(file)}
                      className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-300"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <a
                      href={file.url}
                      download={file.name}
                      className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-300"
                    >
                      <Download className="w-4 h-4 text-gray-600" />
                    </a>
                  </div>
                </div>
              </div>

              {/* File Info */}
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800 truncate text-sm">
                  {file.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <FileSize className="w-3 h-3" />
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* File Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-4xl max-h-full overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 truncate">
                {selectedFile.name}
              </h3>
              <button
                onClick={() => setSelectedFile(null)}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                <Trash2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="mb-4">
              {isImage(selectedFile.type) ? (
                <img
                  src={selectedFile.url}
                  alt={selectedFile.name}
                  className="max-w-full max-h-96 rounded-xl"
                />
              ) : isVideo(selectedFile.type) ? (
                <video
                  src={selectedFile.url}
                  controls
                  className="max-w-full max-h-96 rounded-xl"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                  <File className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Size:</span> {formatFileSize(selectedFile.size)}
              </div>
              <div>
                <span className="font-medium">Type:</span> {selectedFile.type}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Uploaded:</span> {formatDate(selectedFile.uploadedAt)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileGallery;