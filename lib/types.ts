interface Artists {
  name: string;
  href: string;
}

export interface ITrack {
  id: string;
  uri: string;
  name: string;
  duration: string;
  images: any;
  artists: Artists[];
  firstArtist: string;
  albumId: string;
  albumName: string;
  tagArray: string[];
}

export interface ITag {
  name: string;
  textColor: string;
  bgColor: string;
  tracks?: string[];
  playlistId: string | string[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITrackTag {
  id: string;
  name: string;
  textColor: string;
  bgColor: string;
}
