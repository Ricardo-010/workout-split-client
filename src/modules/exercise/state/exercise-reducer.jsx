import ActionTypes from "../../shared/types/actionTypes";

/**
 * A reducer function that manages the state of exercises.
 *
 * This function handles initializing, creating, updating, and deleting exercises.
 *
 * @param {Array<Object>} exercises - The current state of the exercises.
 * @param {Object} action - The action containing the type and the data needed to update the exercises state.
 * @returns {Array<Object>} The updated state of the exercises.
 */
export default function exercisesReducer(exercises, action) {
  switch (action.type) {
    case ActionTypes.INITIALIZE_EXERCISES:
      return action.exercises;
    case ActionTypes.CREATE_EXERCISE:
      return [
        ...exercises,
        {
          recid: action.recId,
          userrecid: action.userRecId,
          workoutrecid: action.workoutRecId,
          exercisename: action.exerciseName,
          sets: action.sets,
        },
      ];
    case ActionTypes.UPDATE_EXERCISE:
      console.log(action);
      return exercises.map((exercise) =>
        exercise.recid === action.exerciseId
          ? {
              ...exercise,
              exercisename: action.exerciseName,
              sets: action.sets,
            }
          : exercise
      );
    case ActionTypes.DELETE_EXERCISE:
      return exercises.filter(
        (exercise) => exercise.recid !== action.exerciseId
      );
    default:
      return exercises;
  }
}
