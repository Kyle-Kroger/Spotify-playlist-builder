interface Artists {
  name: string;
  href: string;
}

export interface TrackType {
  id: string;
  uri: string;
  name: string;
  duration: string;
  images: any;
  artists: Artists[];
  firstArtist: string;
  albumId: string;
  albumName: string;
}

export interface TagType {
  name: string;
  textColor: string;
  bgColor: string;
  tracks?: string[];
  playlistId: string | string[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
