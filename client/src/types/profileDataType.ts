export interface ProfileData {
    name?: string;
    gender?: 'Male' | 'Female' | 'Other' | 'Select';
    location?: string;
    birthday?: string; // Use string to represent date in ISO format (e.g., "2023-05-07")
    summary?: string;
    website?: string;
    github?: string;
    linkedin?: string;
    profileImg?: string;
  }
  