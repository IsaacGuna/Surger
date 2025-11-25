import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profile?: DoctorProfile;
}

interface DoctorProfile {
  specialty: string;
  subspecialty: string;
  experienceYears: string;
  casesCompleted: string;
  successRate: string;
  certifications: string;
  currentWorkload: string;
  fatigueLevel: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: DoctorProfile) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'doctor@hospital.com',
    firstName: 'Dr. John',
    lastName: 'Smith',
    profile: {
      specialty: 'Cardiothoracic Surgery',
      subspecialty: 'Pediatric Cardiac Surgery',
      experienceYears: '15',
      casesCompleted: '1,250',
      successRate: '96.8',
      certifications: 'Board Certified in Thoracic Surgery, American Board of Surgery',
      currentWorkload: '12 surgeries/week',
      fatigueLevel: '3',
    }
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock data
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profile: DoctorProfile;
  }): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profile: userData.profile,
    };
    
    // Add to mock data (in real app, this would be saved to backend)
    mockUsers.push(newUser);
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (profile: DoctorProfile) => {
    if (user) {
      const updatedUser = { ...user, profile };
      setUser(updatedUser);
      
      // Update in mock data
      const userIndex = mockUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = updatedUser;
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateProfile,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
