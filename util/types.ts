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
  region: object;
  zipCode: string;
  user_id?: number;
  streetAddress: string;
  streetNumber: string;
};

export type Specialization = {
  id: number;
  specializationName: string;
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

export type SpecializationType = {
  value: number;
  label: string;
};

export type RegionType = {
  value: number;
  label: string;
};

export type ApplicationError = { message: string };
