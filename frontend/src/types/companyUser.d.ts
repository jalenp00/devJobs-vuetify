// Interface for User Sign-Up Request
export interface CompanyUserRegiserRequest {
    companyId: string| undefined;
    name: string;
    email: string;
    password: string;
}
  
// Interface for User Login Request
export interface CompanyUserLoginRequest {
    email: string;
    password: string;
}

// Interface for User Sign-Up Response
export interface CompanyUserResponse {
    companyId: string;
    name: string;
    email: string;
    id: string;
    createDate: Date;
}