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

export interface IJobProviderOneTransformed {
  skills: string[];
  job: {
    code: string;
    title: string;
    type: string;
    posted_at: string;
  };
  company?: {
    name: string;
    industry: string;
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
