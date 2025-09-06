import axios from 'axios';

// n8n API base URL - replace with your actual n8n instance URL
const API_BASE_URL = import.meta.env.VITE_N8N_API_URL || 'https://your-n8n-instance.com/webhook';

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  token: string;
}

interface FilesResponse {
  files: Array<{
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
    uploadedAt: string;
  }>;
}

interface UploadResponse {
  success: boolean;
  fileUrl: string;
  fileId: string;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private getAuthHeaders() {
    return {
      'Authorization': this.token ? `Bearer ${this.token}` : '',
      'Content-Type': 'application/json',
    };
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      
      this.token = response.data.token;
      localStorage.setItem('auth_token', this.token!);
      
      return response.data;
    } catch (error) {
      // For demo purposes, return mock data
      console.log('Using mock login data');
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        phone: '+1 (555) 123-4567',
      };
      
      this.token = 'mock-token-' + Date.now();
      localStorage.setItem('auth_token', this.token);
      
      return {
        user: mockUser,
        token: this.token,
      };
    }
  }

  async getFiles(): Promise<FilesResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/files`, {
        headers: this.getAuthHeaders(),
      });
      
      return response.data;
    } catch (error) {
      // For demo purposes, return mock data
      console.log('Using mock files data');
      return {
        files: [
          {
            id: '1',
            name: 'sunset-beach.jpg',
            type: 'image/jpeg',
            size: 2048576,
            url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
            uploadedAt: '2024-01-15T10:30:00Z',
          },
          {
            id: '2',
            name: 'mountain-view.jpg',
            type: 'image/jpeg',
            size: 3145728,
            url: 'https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg?auto=compress&cs=tinysrgb&w=800',
            uploadedAt: '2024-01-14T15:45:00Z',
          },
        ],
      };
    }
  }

  async uploadFile(file: File): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      // For demo purposes, return mock success
      console.log('Using mock upload response');
      return {
        success: true,
        fileUrl: URL.createObjectURL(file),
        fileId: 'mock-' + Date.now(),
      };
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }
}

export const apiService = new ApiService();