import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { ReviewData } from '../../types/state';
import { fetchReviewsAction, postReviewsAction } from '../api-action';

const initialState: ReviewData = {
  reviews: [],
  isFormBlocked: false,
};

export const reviewData = createSlice({
  name: NameSpace.ReviewData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isFormBlocked = false;
      })
      .addCase(postReviewsAction.pending, (state, action) => {
        state.isFormBlocked = true;
      })
      .addCase(postReviewsAction.rejected, (state, action) => {
        state.isFormBlocked = false;
      });
  }
});


