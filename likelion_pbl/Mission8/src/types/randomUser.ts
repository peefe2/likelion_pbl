export interface RandomUserName {
  title: string;
  first: string;
  last: string;
}

export interface RandomUserLocation {
  country: string;
  city: string;
}

export interface RandomUserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface RandomUserResult {
  name: RandomUserName;
  location: RandomUserLocation;
  email: string;
  phone: string;
  picture: RandomUserPicture;
}

export interface RandomUserApiResponse {
  results: RandomUserResult[];
}
