import { NameSpace } from '../../const';
import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';

export const getReviews = (state: State): Reviews => state[NameSpace.ReviewData].reviews;
