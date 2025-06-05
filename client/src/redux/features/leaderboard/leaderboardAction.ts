// redux/features/leaderboard/leaderboardAction.ts
import { AppDispatch } from "@/redux/store";
import { leaderboardApi } from "@/lib/api/user";
import {
  fetchLeaderboardStart,
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
} from "./leaderboardSlice";

export const fetchLeaderboard = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchLeaderboardStart());
    const res = await leaderboardApi();
    dispatch(fetchLeaderboardSuccess(res.leaderboard));
  } catch (err) {
    const error = err as { response?: { data?: { message?: string } } };
    const msg = error.response?.data?.message || "Failed to fetch leaderboard";
    dispatch(fetchLeaderboardFailure(msg));
  }
};
