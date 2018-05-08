import axios from "axios";
import {
  FETCH_VOTE,
  FETCH_VOTE_FAILED,
  UPDATE_ARREARS,
  FETCH_VOTE_DETAILS
} from "./types";

export const fetchVote = () => async dispatch => {
  const res = await axios.get("http://vote.qbsmanagement.com.au/example.json");
  if (res) {
    dispatch({ type: FETCH_VOTE, payload: res.data });
    console.log("vote", res);
  } else {
    dispatch({
      type: FETCH_VOTE_FAILED,
      payload: {
        success: false,
        message: "Unable to connect"
      }
    });
  }
};

export const updateArrears = (voteId, amount, date) => async dispatch => {
  // dispatch({ type: UPDATE_UPLOADING, value: true });

  setTimeout(() => {
    const res = {
      success: true,
      message: null
    }; //Successful call
    if (res.success) {
      console.log(voteId, amount, date);
      dispatch({
        type: UPDATE_ARREARS,
        payload: {
          voteId,
          amount,
          date
        }
      });
    }
  }, 300);
};

// export const fetchVote = () => async dispatch => {
//   const res = await axios.get("http://vote.qbsmanagement.com.au/example.json");
//   if (res) {
//     dispatch({ type: FETCH_VOTE, payload: res.data });
//     console.log("vote", res);
//   } else {
//     dispatch({
//       type: FETCH_VOTE_FAILED,
//       payload: {
//         success: false,
//         message: "Unable to connect"
//       }
//     });
//   }
// };

export const fetchVoteDetails = voteId => async dispatch => {
  dispatch({ type: FETCH_VOTE_DETAILS });
  const res = await axios.get("http://vote.qbsmanagement.com.au/example.json");
  var data = res.data.motion;
  var index = data.findIndex(vote => vote.Id == voteId.toString());
  var mapData = data[index];

  dispatch({ type: FETCH_VOTE_DETAILS, payload: mapData });
};
