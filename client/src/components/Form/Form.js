import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import { createPlace, updatePlace } from "../../actions/placeActions";

const Form = ({ currentId, setCurrentId }) => {
  const [placeData, setPlaceData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const place = useSelector((state) =>
    currentId
      ? state.places.places.find((place) => place._id === currentId)
      : null
  );

  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const { title, message, tags } = placeData;

  useEffect(() => {
    if (place) {
      setPlaceData(place);
    }
  }, [place]);

  const clear = () => {
    setCurrentId(null);
    setPlaceData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePlace(currentId, { ...placeData, name: user?.profileInfo?.name })
      );
    } else {
      dispatch(
        createPlace({ ...placeData, name: user?.profileInfo?.name }, history)
      );
    }
    clear();
  };

  if (!user?.profileInfo?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In and create a cute place and then like other's cute
          places
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Create"} a Cute Place
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          value={title}
          onChange={(e) =>
            setPlaceData({ ...placeData, title: e.target.value })
          }
          fullWidth
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          value={message}
          onChange={(e) =>
            setPlaceData({ ...placeData, message: e.target.value })
          }
          fullWidth
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma-separated)"
          value={tags}
          onChange={(e) =>
            setPlaceData({ ...placeData, tags: e.target.value.split(",") })
          }
          fullWidth
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPlaceData({ ...placeData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
