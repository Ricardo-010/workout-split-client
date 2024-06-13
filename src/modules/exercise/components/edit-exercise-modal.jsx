import { Modal, Box, TextField, Button } from "@mui/material";

/**
 * This component renders the edit exercise modal.
 *
 * @param {function open()} - A function to open the edit exercise modal.
 * @param {function handleClose()} - A function that handles closing the edit exercise modal.
 * @param {state} exerciseId - The exercise's id.
 * @param {state} newExerciseName - The new exercise name.
 * @param {state} newSets - The new exercise sets.
 * @param {state} setNewExercise - Sets the new exercise name and sets.
 * @param {function handleEditExercise()} - A function that handles editing a exercise.
 * @param {function handleDeleteExercise()} - A function that handles deleting a exercise.
 * @returns {ReactNode} A React element that renders the edit exercise modal.
 */
export default function AddExerciseModal({
  open,
  handleClose,
  exerciseId,
  newExerciseName,
  newSets,
  setNewExercise,
  handleEditExercise,
  handleDeleteExercise,
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
            console.log("######", newSets);
            handleEditExercise(exerciseId, newExerciseName, newSets);
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Exercise"
            name="exercise-name"
            autoFocus
            value={newExerciseName}
            onChange={(e) =>
              setNewExercise((prev) => ({
                ...prev,
                newExerciseName: e.target.value,
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
            value={newSets}
            onChange={(e) =>
              setNewExercise((prev) => ({
                ...prev,
                newSets: e.target.value,
              }))
            }
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              name="update-exercise"
              sx={{ flexGrow: 1, mr: 1 }}
            >
              Update
            </Button>
            <Button
              type="button"
              variant="contained"
              color="warning"
              name="delete-exercise"
              sx={{ flexGrow: 1, ml: 1 }}
              onClick={(e) => {
                e.preventDefault();
                handleDeleteExercise(exerciseId);
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
