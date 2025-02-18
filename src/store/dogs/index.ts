import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/api/axios";
import {
  Response,
  dogType,
  dogsState,
  locationType,
  searchDogsIDActionResponse,
} from "@/types/store";
import { RootState } from "..";
import { signInAction } from "../auth";

const initialState: dogsState = {
  breeds: [],
  dogsID: [],
  loading: false,
  total: 0,
  dogs: [],
};

export const getBreedsAction = createAsyncThunk<
  any,
  void,
  { state: RootState }
>("get/breeds", async (_, thunkAPI) => {
  try {
    const response = await api.get<Response<string[]>>("/dogs/breeds");
    return response.data;
  } catch (error: any) {
    const user = thunkAPI.getState().auth;
    if (error.response?.status === 401) {
      await thunkAPI.dispatch(
        signInAction({ name: user.name, email: user.email })
      );
      const authState = thunkAPI.getState().auth.loginState;
      if (authState) {
        return await thunkAPI.dispatch(getBreedsAction());
      }
    }
    throw error;
  }
});
export const searchDogsIDAction = createAsyncThunk<
  Response<searchDogsIDActionResponse>,
  {
    breeds?: string[];
    ageMin?: number;
    ageMax?: number;
    size: number;
    from: number;
    sort?: string;
  },
  { state: RootState }
>(
  "get/dogsID",
  async (params: {
    breeds?: string[];
    ageMin?: number;
    ageMax?: number;
    size: number;
    from: number;
    sort?: string;
  }) => {
    const response = await api.get<Response<searchDogsIDActionResponse>>(
      "/dogs/search",
      { params: { ...params } }
    );
    return response.data;
  }
);

export const getDogsAction = createAsyncThunk<any, void, { state: RootState }>(
  "get/dogs",
  async (_, thunkAPI) => {
    const dogsID = thunkAPI.getState().dogs.dogsID;
    const dogResponse = await api.post("/dogs", dogsID);
    const favoriteDog = await api.post("/dogs/match", dogsID);
    const dogs = dogResponse.data;
    const fDogs = favoriteDog.data;
    const zip = dogs.map((dog: dogType) => dog.zip_code);
    const locationsResponse = await api.post("/locations", zip);
    const locations = locationsResponse.data;
    const data = dogs.map((dog: dogType) => ({
      ...dog,
      zip_code: locations.find(
        (location: locationType) => location?.zip_code === dog.zip_code
      ),
      adoption: fDogs.match === dog.id,
    }));
    return data;
  }
);

export const getLocationsAction = createAsyncThunk(
  "get/locations",
  async (params: {
    city?: string;
    country?: string;
    state?: string;
    size?: number;
  }) => {
    const response = await api.post("/locations/search", params);
    return response.data;
  }
);

const dogsReducer = createSlice({
  name: "dogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBreedsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBreedsAction.fulfilled, (state, action) => {
        state.breeds = state.breeds.concat(action.payload);
        state.loading = false;
      })
      .addCase(getBreedsAction.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(searchDogsIDAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchDogsIDAction.fulfilled, (state, action) => {
        state.loading = false;
        state.dogsID = action.payload.resultIds;
        state.total = action.payload.total;
      })
      .addCase(searchDogsIDAction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDogsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDogsAction.fulfilled, (state, action) => {
        state.dogs = action.payload;
        state.loading = false;
      })
      .addCase(getDogsAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectBreeds = (state: RootState) => state.dogs.breeds;
export const selectDogIDs = (state: RootState) => state.dogs.dogsID;
export const selectDogs = (state: RootState) => state.dogs;

export default dogsReducer.reducer;
