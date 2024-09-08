// Interface for User Sign-Up Request
export interface CompanyRegisterRequest {
    name: string;
}

export interface CompanyResponse {
    id: string;
    name: string;
    createDate: Date;
}

export interface CreateCompanyResponse {
    id: string;
}