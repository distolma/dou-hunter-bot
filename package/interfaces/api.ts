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

export interface HtmlData {
  id: number;
  title: string;
  company: string;
  cities: string[];
  description: string;
  hot: boolean;
  url?: string;
}