export interface Gallery {
  [album: string]: string[];
}

export interface GalleryModal {
  album?: string;
  selectMultiple?: boolean;
}
