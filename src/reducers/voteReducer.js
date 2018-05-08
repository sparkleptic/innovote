import {
  FETCH_VOTE,
  FETCH_VOTE_FAILED,
  UPDATE_ARREARS,
  FETCH_VOTE_DETAILS
} from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_VOTE:
      return {
        voteList: action.payload
      };

    case FETCH_VOTE_FAILED:
      return {
        success: false,
        message: action.payload.message
      };

    case UPDATE_ARREARS:
      //Approve Order
      //Change Status of selected Order to ApprovalStatus === "Approved"
      const updatedArrears = state.voteList.owners.map(item => {
        console.log(state);
        if (item.Id === action.payload.voteId) {
          item.YearToDateBalance = action.payload.amount;
          item.PaidToDate = action.payload.date;
          return item;
        }
        return item;
      });
      return {
        voteList: {
          Owners: updatedArrears
        }
      };

    case FETCH_VOTE_DETAILS:
      console.log(action.payload);
      return {
        voteDetails: action.payload
      };

    default:
      return state;
  }
}
