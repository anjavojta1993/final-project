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
  addressNumber: string;
  addressStreet: string;
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
  value: string;
  label: string;
};

export type ZipCodeType = {
  value: string;
  label: string;
};

export type TherapistSpecializationType = {
  specializationId: number;
  therapistId: number;
};

export type FilteredTherapists = {
  therapistId: number;
  specializationId: number;
};

export type FilteredTherapistsSpecNames = {
  therapistId: number;
  specializationId: number;
  specializationName: string;
};

export type FilteredTherapistsWithScore = {
  id: number;
  score: number;
};

export type TherapistRegionZipCode = {
  id: number;
  region: string;
  zipCode: string;
};

export type Favorite = {
  therapistId: number,
  userId: number,
}

export type ApplicationError = { message: string };
