import { Modal, Box, TextField, Button } from "@mui/material";

/**
 * This component renders the add exercise modal.
 *
 * @param {function open()} - A function to open the add workout modal.
 * @param {function handleClose()} - A function that handles closing the add workout modal.
 * @param {state} newWorkoutName - The new workout name.
 * @param {state} setNewWorkoutName - Sets the new workout name.
 * @param {function handleCreateWorkout()} - A function that handles creating a workout.
 * @returns {ReactNode} A React element that renders the add new workout modal.
 */
export default function AddWorkoutModal({
  open,
  handleClose,
  newWorkoutName,
  setNewWorkoutName,
  handleCreateWorkout,
}) {
  return (
    <Modal open={open} onClose={handleClose} sx={{ m: 2 }}>
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
            handleCreateWorkout();
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
          <Button type="submit" fullWidth variant="contained">
            Add Workout
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
