export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type Therapist = {
  id?: number;
  companyName: string;
  costPerHour: string;
  websiteUrl: string;
  videoUrl: string;
  region: string;
  zipCode: string;
  user_id?: number;
  streetAddress: string;
  streetNumber: string;
  specializations: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Session = {
  id: number;
  token: string;
  expiry: Date;
  userId: number;
};

export type ApplicationError = { message: string };
