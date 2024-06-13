import { Modal, Box, TextField, Button } from "@mui/material";

/**
 * This component renders the edit workout modal.
 *
 * @param {function open()} - A function to open the edit workout modal.
 * @param {function handleClose()} - A function that handles closing the edit workout modal.
 * @param {state} workoutId - The workout's id.
 * @param {state} newWorkoutName - The new workout name.
 * @param {state} setNewWorkoutName - Sets the new workout name.
 * @param {function handleEditWorkout()} - A function that handles editing a workout.
 * @param {function handleDeleteWorkout()} - A function that handles deleting a workout.
 * @returns {ReactNode} A React element that renders the edit workout modal.
 */
export default function EditWorkoutModal({
  open,
  handleClose,
  workoutId,
  newWorkoutName,
  setNewWorkoutName,
  handleEditWorkout,
  handleDeleteWorkout,
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleEditWorkout(workoutId, newWorkoutName);
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Workout"
            autoFocus
            name="workout-name"
            value={newWorkoutName}
            onChange={(event) =>
              setNewWorkoutName((prevState) => ({
                ...prevState,
                newWorkoutName: event.target.value,
              }))
            }
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              name="update-workout"
              sx={{ flexGrow: 1, mr: 1 }}
            >
              Update
            </Button>
            <Button
              type="button"
              variant="contained"
              color="warning"
              name="delete-workout"
              sx={{ flexGrow: 1, ml: 1 }}
              onClick={(e) => {
                e.preventDefault();
                handleDeleteWorkout(workoutId);
              }}
            >
              Delete
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
