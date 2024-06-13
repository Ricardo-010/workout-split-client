import ActionTypes from "../../shared/types/actionTypes";

/**
 * A reducer function that manages the state of workouts.
 *
 * This function handles initializing, creating, updating, and deleting workouts.
 *
 * @param {Array<Object>} workouts - The current state of the workouts.
 * @param {Object} action - The action containing the type and the data needed to update the workouts state.
 * @returns {Array<Object>} The updated state of the workouts.
 */
export default function workoutSplitReducer(workouts, action) {
  switch (action.type) {
    case ActionTypes.INITIALIZE_WORKOUTS:
      return action.workouts;
    case ActionTypes.CREATE_WORKOUT:
      return [
        ...workouts,
        {
          recid: action.recId,
          userrecid: action.userRecId,
          workoutname: action.workoutName,
        },
      ];
    case ActionTypes.UPDATE_WORKOUT:
      return workouts.map((workout) =>
        workout.recid === action.workoutId
          ? { ...workout, workoutname: action.workoutName }
          : workout
      );
    case ActionTypes.DELETE_WORKOUT:
      return workouts.filter((workout) => workout.recid !== action.workoutId);
    default:
      return workouts;
  }
}
