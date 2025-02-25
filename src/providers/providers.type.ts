export interface IJobProviderOne {
  jobId: string;
  title: string;
  details: {
    location: string;
    type: string;
    salaryRange: string;
  };
  company: {
    name: string;
    industry: string;
  };
  skills: string[];
  postedDate: string;
}

export interface IJobProviderTwo {
  position: string;
  location: {
    city: string;
    state: string;
    remote: boolean;
  };
  compensation: {
    min: number;
    max: number;
    currency: string;
  };
  employer: {
    companyName: string;
    website: string;
  };
  requirements: {
    experience: number;
    technologies: string[];
  };
  postedDate: string;
}

export interface IJobTransformed {
  skills: string[];
  job: {
    provider: string;
    code: string;
    title: string;
    type: string;
    experience?: number;
    remotely?: boolean;
    posted_at: string;
  };
  company?: {
    name: string;
    industry?: string;
    website?: string;
  };
  location?: {
    city: string;
    state: string;
  };
  salary?: {
    min: number | null;
    max: number | null;
    currency: string | null;
  };
}

export interface ProviderContract {
  handler(): Promise<void>;

  fetcher(): Promise<any>;

  parser(job: any, jobId?: string): IJobTransformed;
}
