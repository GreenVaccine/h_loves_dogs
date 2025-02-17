export type dogsState = {
  breeds: string[];
  total: number;
  dogsID: string[];
  dogs: dogsType[];
  loading: boolean;
};

export type locationType = {
  city: string;
  county: string;
  latitude: number;
  longitude: number;
  state: string;
  zip_code: string;
};

export type dogType = {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string | null;
};

export type dogsType = {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: locationType;
};

export type authStateType = {
  loginState: boolean;
  name: string;
  email: string;
  loading: boolean;
};

export type Response<T> = {
  status: "Success";
} & T;

export type searchDogsIDActionResponse = {
  next: string;
  prev: string;
  resultIds: string[];
  total: number;
};

export type getDogsActionResponse = {
  data: dogType[];
};
