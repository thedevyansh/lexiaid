import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ttfApi from '../services/ttf';

const initialState = {
  prompts: [],
  modelResponses: [],
  status: 'idle',
};

export const get = createAsyncThunk('ttf/get', async (_, thunkAPI) => {
  const response = await ttfApi.get_ttf();
  return response.data;
});

export const generateTtf = createAsyncThunk(
  'ttf/generateTtf',
  async request => {
    const response = await ttfApi.generate_ttf(request);
    return response.data;
  }
);

export const uploadPdfAndGenerateTtf = createAsyncThunk(
  'ttf/uploadPdfAndGenerateTtf',
  async request => {
    const response = await ttfApi.generate_ttf_from_pdf(request);
    return response.data;
  }
);

export const ttfSlice = createSlice({
  name: 'ttf',
  initialState,
  reducers: {
    addUserPrompt: (state, { payload }) => {
      state.prompts.push(payload);
    },
    changeStatusToFetched: state => {
      state.status = 'fetched';
    },
    addModelResponseOfPdf: (state, { payload }) => {
      state.modelResponses.push({
        sentences: payload['sentences'],
        images: payload['images'],
      });
    },
  },
  extraReducers: {
    [get.pending]: state => {
      state.status = 'loading';
    },
    [get.fulfilled]: (state, { payload }) => {
      const ip_prompts = [];
      const model_responses = [];

      payload.forEach(prompt_and_response => {
        ip_prompts.push(prompt_and_response['ip_text']);
        model_responses.push({
          sentences: prompt_and_response['sentences'],
          images: prompt_and_response['images'],
        });
      });

      state.status = 'success';
      state.prompts = ip_prompts;
      state.modelResponses = model_responses;
    },
    [get.rejected]: state => {
      state.status = 'failed';
    },
    [generateTtf.fulfilled]: (state, { payload }) => {
      state.modelResponses.push({
        sentences: payload['sentences'],
        images: payload['images'],
      });
    },
  },
});

export const { addUserPrompt, changeStatusToFetched, addModelResponseOfPdf } =
  ttfSlice.actions;

export default ttfSlice.reducer;
