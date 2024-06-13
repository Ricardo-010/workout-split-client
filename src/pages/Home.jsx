import { useReducer, useState, useEffect } from "react";
import { Box, Grid, CircularProgress } from "@mui/material";
import Workouts from "../modules/workout/components/workouts-component";
import Exercises from "../modules/exercise/components/exercises-component";
import AddExerciseModal from "../modules/exercise/components/new-exercise-modal";
import EditExerciseModal from "../modules/exercise/components/edit-exercise-modal";
import AddWorkoutModal from "../modules/workout/components/new-workout-modal";
import EditWorkoutModal from "../modules/workout/components/edit-workout-modal";
import workoutsReducer from "../modules/workout/state/workout-reducer";
import exercisesReducer from "../modules/exercise/state/exercise-reducer";
import ActionTypes from "../modules/shared/types/actionTypes";
import {
  fetchWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  createExercise,
  updateExercise,
  deleteExercise,
} from "../modules/shared/services/workoutService";
import Header from "../modules/header/components/header-component";

/**
 * This component renders the home page which displays the workouts and exercises for a user.
 *
 * @returns {ReactNode} A React element that renders the home page.
 */
export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [workouts, workoutDispatch] = useReducer(workoutsReducer, []);
  const [exercises, exerciseDispatch] = useReducer(exercisesReducer, []);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [addWorkoutModalState, setAddWorkoutModalState] = useState({
    open: false,
    newWorkoutName: "",
  });

  const [editWorkoutModalState, setEditWorkoutModalState] = useState({
    open: false,
    workoutId: "",
    newWorkoutName: "",
  });

  const [addExerciseModalState, setAddExerciseModalState] = useState({
    open: false,
    exerciseName: "",
    sets: "",
  });

  const [editExerciseModalState, setEditExerciseModalState] = useState({
    open: false,
    exerciseId: "",
    newExerciseName: "",
    newSets: 0,
  });

  // An effect to get the workouts when the home page is loaded.
  useEffect(() => {
    /**
     * Gets the users workouts and execises.
     *
     * Sets the state of thew rokouts and exercises appropriatley.
     * @async
     */
    async function getWorkouts() {
      try {
        const response = await fetchWorkouts();
        workoutDispatch({
          type: ActionTypes.INITIALIZE_WORKOUTS,
          workouts: response.data.usersWorkouts,
        });
        exerciseDispatch({
          type: ActionTypes.INITIALIZE_EXERCISES,
          exercises: response.data.usersExercises,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching workouts", err);
        setLoading(false);
      }
    }

    getWorkouts();
  }, []);

  /**
   * Handles opening the add workout modal by updating the open state.
   */
  const handleOpenAddWorkoutModal = () =>
    setAddWorkoutModalState((prevState) => ({
      ...prevState,
      open: true,
    }));

  /**
   * Handles opening the edit workout modal by updating the open state and setting the
   * workoutId and newWorkoutName.
   *
   * @param {string} workoutId - The workout record id.
   * @param {string} workoutName - The workout name.
   */
  const handleOpenEditWorkoutModal = (workoutId, workoutName) =>
    setEditWorkoutModalState({
      open: true,
      workoutId,
      newWorkoutName: workoutName,
    });

  /**
   * Handles closing the add workout modal by updating the open state and setting the
   * newWorkoutName to empty.
   */
  const handleCloseAddWorkoutModal = () =>
    setAddWorkoutModalState({
      open: false,
      newWorkoutName: "",
    });

  /**
   * Handles closing the edit workout modal by updating the open state and setting the
   * workoutId and the newWorkoutName to empty.
   */
  const handleCloseEditWorkoutModal = () =>
    setEditWorkoutModalState({
      open: false,
      workoutId: "",
      newWorkoutName: "",
    });

  /**
   * Handles opening the add exercise modal by updating the open state and setting the
   * exerciseName and the sets to empty.
   */
  const handleOpenAddExerciseModal = () =>
    setAddExerciseModalState({
      open: true,
      exerciseName: "",
      sets: "",
    });

  /**
   * Handles closing the add exercise modal by updating the open state and setting the
   * exerciseName and the sets to empty.
   */
  const handleCloseAddExerciseModal = () =>
    setAddExerciseModalState({
      open: false,
      exerciseName: "",
      sets: "",
    });

  /**
   * Handles opening the edit exercise modal by updating the open state and setting the
   * exerciseId, the newExerciseName, and the newSets.
   *
   * @param {string} exerciseId - The exercise record id.
   * @param {string} workoutName - The exercise name.
   * @param {string} sets - The sets.
   */
  const handleOpenEditExerciseModal = (exerciseId, exerciseName, sets) =>
    setEditExerciseModalState({
      open: true,
      exerciseId,
      newExerciseName: exerciseName,
      newSets: parseInt(sets),
    });

  /**
   * Handles closing the edit exercise modal by updating the open state and setting the
   * exerciseId, the newExerciseName, and the newSets to their default values.
   * @async
   */
  const handleCloseEditExerciseModal = () =>
    setEditExerciseModalState({
      open: false,
      exerciseId: "",
      newExerciseName: "",
      newSets: 0,
    });

  /**
   * Handles creating a workout by calling the create workout function in the workout service.
   *
   * Once a response is recieved with the workout the state is updated with the new workout and the add workout
   * modal is then closed.
   *
   * If an error occurs the state will not be updated and a error will be logged.
   * @async
   */
  const handleCreateWorkout = async () => {
    try {
      const response = await createWorkout(addWorkoutModalState.newWorkoutName);
      workoutDispatch({
        type: ActionTypes.CREATE_WORKOUT,
        recId: response.data.workout.recId,
        userRecId: response.data.workout.userRecId,
        workoutName: response.data.workout.workoutName,
      });
      handleCloseAddWorkoutModal();
    } catch (err) {
      console.error("Error creating workout", err);
    }
  };

  /**
   * Handles editing a workout by calling the update workout function in the workout service.
   *
   * Once a response is recieved the state is updated with the updated workout and the edit workout
   * modal is then closed.
   *
   * If an error occurs the state will not be updated and a error will be logged.
   * @async
   * @param {string} workoutId - The workout record id.
   * @param {string} workoutName - The workout name.
   */
  const handleEditWorkout = async (workoutId, workoutName) => {
    try {
      await updateWorkout(workoutId, workoutName);
      workoutDispatch({
        type: ActionTypes.UPDATE_WORKOUT,
        workoutId,
        workoutName,
      });
      handleCloseEditWorkoutModal();
    } catch (err) {
      console.error("Error updating workout", err);
    }
  };

  /**
   * Handles deleting a workout by calling the delete workout function in the workout service.
   *
   * Once a response is recieved the state is updated to remove the deleted workout and the edit workout
   * modal is then closed.
   *
   * If an error occurs the state will not be updated and a error will be logged.
   * @async
   * @param {string} workoutId - The workout record id.
   */
  const handleDeleteWorkout = async (workoutId) => {
    try {
      await deleteWorkout(workoutId);
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
      workoutDispatch({
        type: ActionTypes.DELETE_WORKOUT,
        workoutId,
      });
      handleCloseEditWorkoutModal();
    } catch (err) {
      console.error("Error deleting workout", err);
    }
  };

  /**
   * Handles creating a exercise by calling the create exercise function in the workout service.
   *
   * Once a response is recieved with the exercise the state is updated with the new exercise and the add exercise
   * modal is then closed.
   *
   * If an error occurs the state will not be updated and a error will be logged.
   * @async
   */
  const handleCreateExercise = async () => {
    try {
      const response = await createExercise(
        workouts[selectedIndex].recid,
        addExerciseModalState.exerciseName,
        `${addExerciseModalState.sets} ${
          addExerciseModalState.sets === "1" ? "Set" : "Sets"
        }`
      );
      exerciseDispatch({
        type: ActionTypes.CREATE_EXERCISE,
        recId: response.data.exercise.recId,
        userRecId: response.data.exercise.userRecId,
        workoutRecId: response.data.exercise.workoutRecId,
        exerciseName: response.data.exercise.exerciseName,
        sets: response.data.exercise.sets,
      });
      handleCloseAddExerciseModal();
    } catch (err) {
      console.error("Error creating exercise", err);
    }
  };

  /**
   * Handles editing a exercise by calling the update exercise function in the workout service.
   *
   * Once a response is recieved the state is updated with the updated exercise and the edit exercise
   * modal is then closed.
   *
   * If an error occurs the state will not be updated and a error will be logged.
   * @async
   * @param {string} exerciseId - The exercise record id.
   * @param {string} exerciseName - The exercise name.
   * @param {string} sets - The sets.
   */
  const handleEditExercise = async (exerciseId, exerciseName, sets) => {
    try {
      await updateExercise(
        exerciseId,
        exerciseName,
        `${sets} ${sets === "1" ? "Set" : "Sets"}`
      );
      exerciseDispatch({
        type: ActionTypes.UPDATE_EXERCISE,
        exerciseId: exerciseId,
        exerciseName: exerciseName,
        sets: `${sets} ${sets === "1" ? "Set" : "Sets"}`,
      });
      handleCloseEditExerciseModal();
    } catch (err) {
      console.error("Error updating exercise", err);
    }
  };

  /**
   * Handles deleting a exercise by calling the delete exercise function in the workout service.
   *
   * Once a response is recieved the state is updated to remove the deleted exercise and the edit exercise
   * modal is then closed.
   *
   * If an error occurs the state will not be updated and a error will be logged.
   * @async
   * @param {string} exerciseId - The exercise record id.
   */
  const handleDeleteExercise = async (exerciseId) => {
    try {
      await deleteExercise(exerciseId);
      exerciseDispatch({
        type: ActionTypes.DELETE_EXERCISE,
        exerciseId,
      });
      handleCloseEditExerciseModal();
    } catch (err) {
      console.error("Error deleting exercise", err);
    }
  };

  // When the effect is run to fetch the workouts and exercises a spinner is displayed.
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ maxWidth: "md", mx: "auto" }}>
        <Grid container spacing={2} position="relative">
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              boxShadow: "10px 0 10px -10px rgba(0,0,0,0.25)",
              borderRadius: 2,
              minHeight: {
                sm: "calc(100vh - 50px)",
              },
            }}
          >
            <Workouts
              workouts={workouts}
              exercises={exercises}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              handleOpenAddModal={handleOpenAddWorkoutModal}
              handleOpenEditModal={handleOpenEditWorkoutModal}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Exercises
              exercises={exercises}
              workoutId={workouts?.[selectedIndex]?.recid}
              handleOpenAddModal={handleOpenAddExerciseModal}
              handleOpenEditModal={handleOpenEditExerciseModal}
              handleDeleteExercise={handleDeleteExercise}
            />
          </Grid>
        </Grid>
        <AddWorkoutModal
          open={addWorkoutModalState.open}
          handleClose={handleCloseAddWorkoutModal}
          newWorkoutName={addWorkoutModalState.newWorkoutName}
          setNewWorkoutName={setAddWorkoutModalState}
          handleCreateWorkout={handleCreateWorkout}
        />
        <EditWorkoutModal
          open={editWorkoutModalState.open}
          handleClose={handleCloseEditWorkoutModal}
          workoutId={editWorkoutModalState.workoutId}
          newWorkoutName={editWorkoutModalState.newWorkoutName}
          setNewWorkoutName={setEditWorkoutModalState}
          handleEditWorkout={handleEditWorkout}
          handleDeleteWorkout={handleDeleteWorkout}
        />
        <AddExerciseModal
          open={addExerciseModalState.open}
          handleClose={handleCloseAddExerciseModal}
          handleCreateExercise={handleCreateExercise}
          newExercise={addExerciseModalState}
          setNewExercise={setAddExerciseModalState}
        />
        <EditExerciseModal
          open={editExerciseModalState.open}
          handleClose={handleCloseEditExerciseModal}
          exerciseId={editExerciseModalState.exerciseId}
          newExerciseName={editExerciseModalState.newExerciseName}
          newSets={editExerciseModalState.newSets}
          setNewExercise={setEditExerciseModalState}
          handleEditExercise={handleEditExercise}
          handleDeleteExercise={handleDeleteExercise}
        />
      </Box>
    </>
  );
}
