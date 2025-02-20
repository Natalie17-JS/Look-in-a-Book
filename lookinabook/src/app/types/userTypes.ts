export interface User {
    id: string;
    username: string;
    email: string;
    bio?: string;    
    avatar?: string;  
    role:  "USER" | "ADMIN";     
    isVerified: boolean; 
    createdAt: string; 
    updatedAt: string;
    points: number;
    lastActive: string;
    isOnline: boolean;
  }
// Типизация данных формы
export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: string;
  bio?: string;
}
// Тип для данных, возвращаемых с сервера
export interface RegisterUserData {
  registerUser: {
    id: string;
    username: string;
    email: string;
    bio?: string;     // Опционально, если пользователь не ввел
    avatar?: string;  // Опционально, если не загрузил фото
    role: string;     // Например, "USER"
    isVerified: boolean; // Подтвердил email или нет
    createdAt: string; // Дата регистрации
  };
}
// Типизация данных формы
export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignInUserData {
  loginUser: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}