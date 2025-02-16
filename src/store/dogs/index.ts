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

const initialState: dogsState = {
  breeds: [],
  dogsID: [],
  loading: false,
  total: 0,
  dogs: [],
  locations: { zipCodes: [], total: 0 },
};

export const getBreedsAction = createAsyncThunk("get/breeds", async () => {
  const response = await api.get("/dogs/breeds");
  return response.data;
});

export const searchDogsIDAction = createAsyncThunk(
  "get/dogsID",
  async (params: {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size: number;
    from: number;
    sort?: string;
  }) => {
    const response = await api.get<Response<searchDogsIDActionResponse>>(
      "/dogs/search",
      { params }
    );
    return response.data;
  }
);

export const getDogsAction = createAsyncThunk<any, void, { state: RootState }>(
  "get/dogs",
  async (_, thunkAPI) => {
    const dogsID = thunkAPI.getState().dogs.dogsID;
    const response = await api.post("/dogs", dogsID);
    const data = await Promise.all(
      response.data.map(async (dog: dogType) => {
        const zip_code = (await api.post("locations", [dog.zip_code])).data[0];
        return {
          ...dog,
          zip_code,
        };
      })
    );
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
        if (action.error.message?.includes("401")) console.log(1);
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
      })
      .addCase(getLocationsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLocationsAction.fulfilled, (state, action) => {
        state.loading = false;
        const locations =
          action.payload.results.length > 0
            ? action.payload.results.map(
                (location: locationType) => location.zip_code
              )
            : [];
        state.locations = { total: action.payload.total, zipCodes: locations };
      })
      .addCase(getLocationsAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectBreeds = (state: RootState) => state.dogs.breeds;
export const selectDogIDs = (state: RootState) => state.dogs.dogsID;
export const selectDogs = (state: RootState) => state.dogs;

export default dogsReducer.reducer;
