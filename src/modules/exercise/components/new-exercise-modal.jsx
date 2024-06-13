import { Modal, Box, TextField, Button } from "@mui/material";

/**
 * This component renders the add exercise modal.
 *
 * @param {function open()} - A function to open the add exercise modal.
 * @param {function handleClose()} - A function that handles closing the add exercise modal.
 * @param {function handleCreateExercise()} - A function that handles creating a exercise.
 * @param {state} newExercise - The new exercise.
 * @param {state} setNewExercise - Sets the new exercise.
 * @returns {ReactNode} A React element that renders the add new exercise modal.
 */
export default function EditExerciseModal({
  open,
  handleClose,
  handleCreateExercise,
  newExercise,
  setNewExercise,
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
            handleCreateExercise();
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Exercise"
            name="exercise-name"
            autoFocus
            value={newExercise.exerciseName}
            onChange={(e) =>
              setNewExercise((prev) => ({
                ...prev,
                exerciseName: e.target.value,
              }))
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="sets"
            label="Number of sets"
            type="number"
            value={newExercise.sets}
            onChange={(e) =>
              setNewExercise((exercise) => ({
                ...exercise,
                sets: e.target.value,
              }))
            }
          />
          <Button type="submit" fullWidth variant="contained">
            Add Exercise
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
