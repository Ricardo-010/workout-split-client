import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import ControlPointRoundedIcon from "@mui/icons-material/ControlPointRounded";
import EditIcon from "@mui/icons-material/Edit";

/**
 * This component renders the exercises.
 *
 * @param {Object} exercises - The users exercies.
 * @param {string} workoutId - The users workout id.
 * @param {function handleOpenAddModal()} - A function to open the add exercise modal.
 * @param {function handleOpenEditModal()} - A function that handles editing a exercise.
 * @returns {ReactNode} A React element that renders the exercises a user has for a workout.
 */
export default function Exercises({
  exercises,
  workoutId,
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
            flexGrow: 0,
            display: { xs: "flex" },
          }}
        >
          Exercises
        </Typography>
        {workoutId && (

        <IconButton
          edge="end"
          sx={{ ml: 1 }}
          color="primary"
          name="create-exercise"
          onClick={handleOpenAddModal}
        >
          <ControlPointRoundedIcon />
        </IconButton>
        )}
      </Box>
      <List>
        {exercises &&
          exercises
            .filter((exercise) => {
              return exercise.workoutrecid === workoutId;
            })
            .map((exercise, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={exercise.exercisename}
                  secondary={exercise.sets}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    color="secondary"
                    name="edit-exercise"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEditModal(
                        exercise.recid,
                        exercise.exercisename,
                        exercise.sets
                      );
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
      </List>
    </>
  );
}
