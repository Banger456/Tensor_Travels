import axios from "axios";

const API_URL = "http://localhost:8080/api/contest/";

const setContestDates = (startDate, endDate) => {
  return axios.post(API_URL + "set-contest-dates", {
    startDate,
    endDate,
  });
};

const getContestDates = () => {
  return axios.get(API_URL + "get-contest-dates");
};

const notifyWinners = (winners) => {
  return axios.post(API_URL + "notify-winners", { winners });
};

const contService = {
  setContestDates,
  getContestDates,
  notifyWinners,
}
export default contService;
  

