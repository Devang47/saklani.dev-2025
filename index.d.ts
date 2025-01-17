export interface QueryResponse {
  upworkLink: string;
  twitterLink: string;
  titleH1: string;
  subtitleH2: string;
  description: string;
  about: string;
  githubLink: string;
  gmailLink: string;
  resumeLink: string;
  linkedinLink: string;
  seo: Seo;
  projects: IProject[];
  jobExperiences: JobExperience[];
  blogs: Blog[];
}

export interface Seo {
  description: string;
  twitterCard: string;
  title: string;
  image: Image;
}

export interface Image {
  alt: any;
  url: string;
}

export interface IProject {
  link: string;
  techUsed: string;
  title: string;
  description: string;
  id: string;
  image: Image;
}

export interface JobExperience {
  id: string;
  link: string;
  role: string;
  startingAndEndingYear: string;
  techUsed: string;
  title: string;
  description: string;
}

export interface Blog {
  id: string;
  image: Image;
  link: string;
  title: string;
  year: string;
}
