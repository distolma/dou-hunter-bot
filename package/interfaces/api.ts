export interface DouRSS {
  rss: {
    channel: {
      description: string;
      item: Vacancy[];
      language: string;
      lastBuildDate: string;
      link: string;
      title: string;
    };
  };
};

export interface Vacancy {
  description: string;
  guid: string;
  link: string;
  pubDate: string;
  title: string;
}