<!-- React Global State Manager
A TypeScript React global state management library with API request handling.
Installation
bash
npm install react-global-state-manager
Peer Dependencies
Make sure you have these installed in your project:
bash
npm install react antd
Usage
Basic Setup
tsx
import React from 'react';
import { GlobalProvider, useGlobalContext } from 'react-global-state-manager';

function App() {
  return (
    <GlobalProvider 
      apiUrl="https://your-api-url.com/api" 
      initialState={{ lang: 'en' }}
    >
      <YourComponent />
    </GlobalProvider>
  );
}

function YourComponent() {
  const { request, notification, setlogin } = useGlobalContext();

  const handleApiCall = async () => {
    try {
      const response = await request({
        url: '/users',
        method: 'GET',
        model: 'users'
      });
      
      if (response.status) {
        notification({
          type: 'success',
          message: 'Data loaded successfully'
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleApiCall}>Load Users</button>
    </div>
  );
}
API Reference
GlobalProvider Props
apiUrl?: string - Base API URL for requests
initialState?: Partial<GlobalState> - Initial state configuration
children: React.ReactNode - Child components
useGlobalContext Hook
Returns an object with:
request(params: RequestParams) - Make API requests
setlogin(login: UserInfo) - Set user login state
notification(params: NotificationParams) - Show notifications
setModel(params: SetModelParams) - Set model data
All state properties
Request Parameters
typescript
interface RequestParams {
  url: string;
  model?: string;
  body?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  clear?: boolean;
  isfile?: any;
  ismessage?: boolean;
  API?: string;
  nopagination?: boolean;
}
File Upload Example
tsx
const handleFileUpload = async (file: File) => {
  const formData = {
    file: file,
    description: 'My file'
  };

  const response = await request({
    url: '/upload',
    method: 'POST',
    body: formData,
    isfile: true,
    model: 'upload'
  });
};
Login Example
tsx
const handleLogin = async (credentials: { email: string; password: string }) => {
  const response = await request({
    url: '/auth/login',
    method: 'POST',
    body: credentials,
    model: 'auth'
  });

  if (response.status && response.token) {
    setlogin({
      token: response.token,
      user: response.user
    });
    
    // Token will be automatically stored in localStorage
    localStorage.setItem('token', response.token);
  }
};
Features
TypeScript support
Automatic request/response state management
Built-in loading states
Error handling
File upload support
Antd notification integration
localStorage token management
Automatic pagination parameter handling
License
MIT -->
