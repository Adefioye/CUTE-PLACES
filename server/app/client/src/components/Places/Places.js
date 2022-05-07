import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import Place from "./Place/Place";
import useStyles from "./styles";

const Places = ({ setCurrentId }) => {
  const classes = useStyles();
  const { places, isLoading } = useSelector((state) => state.places);

  if (!isLoading && !places?.length) {
    return "NO POSTS!";
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {places.map((place) => (
        <Grid key={place._id} item xs={12} sm={12} md={4}>
          <Place place={place} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Places;
