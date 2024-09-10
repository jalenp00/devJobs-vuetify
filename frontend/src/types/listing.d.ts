// -----COMPANY USER-----
// create listing
export type CreateListing = {
    companyUserId: string | undefined,
    companyId: string | undefined,
    title: string;
    location: string;
    salary: number;
    description: string;
    techStack: string;
    yearsNeeded: number;
    contract: boolean;
    remote: boolean;
    hybrid: boolean;
    daysInOffice: number | undefined;
    daysExpire: number | undefined;
    numAppExpire: number | undefined;
};
export type CompanyListingResponse = {
    id: string
    companyUserId: string
    company: string
    title: string
    location: string
    salary: string
    description: string
    techStack: string
    yearsNeeded: number
    datePosted: datetime
    contract: boolean
    remote: boolean | undefined
    hybrid: boolean | undefined
    daysInOffice: number | undefined
    numApplicants: number | undefined
    daysExpire: number | undefined
    numAppExpire: number | undefined

}

//-----BOTH USER TYPES-----
export type CompanyListingDashboard = {
    id: string 
    companyUserId: string
    company: string
    title: string
    location: string
    salary: string
    techStack: string
    yearsNeeded: number
    datePosted: datetime
    contract: boolean
    remote: boolean | undefined
    hybrid: boolean | undefined
}
export type UserListingResponse = {

}