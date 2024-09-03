// Interface for User Sign-Up Request
export interface UserSignUpRequest {
    name: string;
    email: string;
    password: string;
}
  
// Interface for User Login Request
export interface UserLoginRequest {
    name: string;
    email: string;
    password: string;
}

// Interface for User Sign-Up Response
export interface UserResponse {
    name: string;
    email: string;
    id: string;
}