export interface HomeModel {
  swiper: SwiperModel[];
  favoriteCollections: FavoriteCollection[];
  favoriteProducts: FavoriteProduct[];
  instagram: InstagramModel;
}

export interface SwiperModel {
  image: string;
}

export interface FavoriteCollection {
  image: string;
  title: string;
  description: string;
  action: FavoriteCollectionAction;
}

export interface FavoriteCollectionAction {
  title: string;
  url: string;
}

export interface FavoriteProduct {
  image: string;
  title: string;
  price: number;
  url: string;
}

export interface InstagramModel {
  username: string;
}
