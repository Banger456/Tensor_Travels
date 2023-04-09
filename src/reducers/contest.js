import { SET_CONTEST_DATES } from "../actions/types";

const initialState = {
  startDate: null,
  endDate: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CONTEST_DATES:
      return {
        ...state,
        startDate: payload.startDate,
        endDate: payload.endDate,
      };
    default:
      return state;
  }
}
