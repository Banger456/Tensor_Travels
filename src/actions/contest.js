import {
    SET_CONTEST_DATES,
  } from "./types";
  
  import ContestService from "../services/contest.service";
  
  export const setContestDates = (startDate, endDate) => (dispatch) => {
    return ContestService.setContestDates(startDate, endDate).then(
      (data) => {
        dispatch({
          type: SET_CONTEST_DATES,
          payload: { startDate, endDate },
        });
  
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };
  
  export const notifyWinners = (winners) => async (dispatch) => {
    try {
      await ContestService.notifyWinners(winners);
    } catch (error) {
      console.error("Error notifying winners:", error);
    }
  };
  