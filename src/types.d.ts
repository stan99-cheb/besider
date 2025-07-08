interface MenuItem {
  id: string | number;
  name: string;
};

interface Post {
  id: string;
  title: string;
  link: string;
  image: string;
  date: string;
  source: string;
}

interface Data {
  copyright: string;
  response: { docs: NYTDoc[], meta: { hits: number } };
};

interface NYTMultimedia {
  rank: number;
  subtype: string;
  caption: string | null;
  credit: string | null;
  type: string;
  url: string;
  height: number;
  width: number;
  subType?: string;
  crop_name?: string;
  legacy?: {
    xlarge?: string;
    xlargewidth?: number;
    xlargeheight?: number;
  };
};

interface NYTHeadline {
  sub: string | null;
};

interface NYTByline {
  organization: string | null;
};

interface NYTDoc {
  abstract: string;
  web_url: string;
  snippet?: string;
  lead_paragraph: string;
  print_section?: string;
  print_page?: string;
  source: string;
  multimedia: NYTMultimedia[];
  headline: NYTHeadline;
  keywords: NYTKeyword[];
  pub_date: string;
  document_type: string;
  news_desk?: string;
  section_name: string;
  subsection_name?: string;
  byline: NYTByline;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
};