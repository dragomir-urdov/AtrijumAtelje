export interface HeaderModel {
  start: HeaderItem[];
  end: HeaderItem[];
}

export interface HeaderItem {
  title: string;
  url: string;
  items?: SubHeaderItem[];
}

export interface SubHeaderItem {
  title: string;
  image: string;
  url: string;
}
