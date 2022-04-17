export interface Gallery {
  [album: string]: string[];
}

export interface GalleryModal {
  album: string;
  selectMultiple: boolean;
  selectedImages: SelectedImage[];
}

export type SelectedImage = [album: string, image: string];

export interface UploadImages {
  album: string;
  images: string[];
}

export interface UploadImageRes {
  album: string;
  images: ImageRes[];
}

export interface ImageRes {
  name: string;
  path: string;
}
