import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * This component renders the workouts.
 *
 * @param {Object} workouts - The users workouts.
 * @param {Object} exercises - The users exercies.
 * @param {state} selectedIndex - The index of the selected workout.
 * @param {state} setSelectedIndex - Sets the index of the selected workout.
 * @param {function handleOpenAddModal()} - A function to open the add workout modal.
 * @param {function handleOpenEditModal()} - A function to open the edit workout modal.
 * @param {function handleDeleteWorkout()} - A function that handles deleting a workout.
 * @returns {ReactNode} A React element that renders the workouts a user has.
 */
export default function Workouts({
  workouts,
  exercises,
  selectedIndex,
  setSelectedIndex,
  handleOpenAddModal,
  handleOpenEditModal,
}) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "8px 16px",
        }}
      >
        <Typography
          variant="h5"
          color="primary"
          sx={{
            fontWeight: "bold",
            flexGrow: 0,
            display: { xs: "flex" },
          }}
        >
          Current Split
        </Typography>
        <IconButton
          edge="end"
          sx={{ ml: 1 }}
          color="primary"
          name="create-workout"
          onClick={handleOpenAddModal}
        >
          <ControlPointRoundedIcon />
        </IconButton>
      </Box>

      <List sx={{ borderTop: "2px solid lightblue" }}>
        {workouts &&
          workouts.map((workout, index) => {
            const exerciseCount = exercises.filter(
              (exercise) => exercise.workoutrecid === workout.recid
            ).length;
            return (
              <ListItemButton
                key={index}
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              >
                <ListItemIcon>
                  <Box
                    sx={(theme) => ({
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: theme.palette.grey[300],
                      color: theme.palette.text.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    })}
                  >
                    {index + 1}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={workout.workoutname}
                  secondary={`${exerciseCount} ${
                    exerciseCount === 1 ? "exercise" : "exercises"
                  }`}
                />
                {selectedIndex === index && (
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      color="secondary"
                      name="edit-workout"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditModal(workout.recid, workout.workoutname);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItemButton>
            );
          })}
      </List>
    </>
  );
}
