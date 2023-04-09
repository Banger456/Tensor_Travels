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

const contService = {
  setContestDates,
  getContestDates,
}
export default contService;
  

