import { ReviewData } from '../../types/state';
import { makeFakeReviews } from '../../utils/mocks';
import { fetchReviewsAction, postReviewsAction } from '../api-action';
import { reviewData } from './review-data';

const initialState: ReviewData = {
  reviews: [],
  isFormBlocked: false,
};

const reviews = makeFakeReviews();

describe('Reducer: film-data', () => {
  let state: ReviewData;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  describe('fetchReviewsAction test', () => {
    it('should set reviews  if fetchReviewsAction fulfilled', () => {
      expect(reviewData.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: reviews}))
        .toEqual({...initialState, reviews: reviews});
    });
  });

  describe('postReviewsAction test', () => {
    it('should set reviews from post response and set isFormBlocked false if postReviewsAction fulfilled', () => {
      expect(reviewData.reducer(state, {type: postReviewsAction.fulfilled.type, payload: reviews}))
        .toEqual({...initialState, reviews: reviews, isFormBlocked: false});
    });
    it('should set isFormBlocked false if postReviewsAction pending', () => {
      expect(reviewData.reducer(state, {type: postReviewsAction.pending.type}))
        .toEqual({...initialState, isFormBlocked: true});
    });
    it('should set isFormBlocked false if postReviewsAction rejected', () => {
      expect(reviewData.reducer(state, {type: postReviewsAction.rejected.type}))
        .toEqual({...initialState, isFormBlocked: false});
    });
  });
});
