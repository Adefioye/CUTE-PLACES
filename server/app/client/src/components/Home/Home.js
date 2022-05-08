import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import Places from "../Places/Places";
import Form from "../Form/Form";
import { getPlacesBySearch } from "../../actions/placeActions";
import Pagination from "../Pagination/Pagination";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  // const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const classes = useStyles();

  const searchPlace = () => {
    if (search.trim() || tags.length) {
      dispatch(getPlacesBySearch({ search, tags: tags.join(",") }));
      history.push(`/places/search?searchQuery=${search}&tags=${tags}`);
    } else {
      history.push("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchPlace();
    }
  };

  const handleAddTag = (tag) => setTags([...tags, tag]);

  const handleDeleteTag = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Places setCurrentId={setCurrentId} currentId={currentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search cute places"
                fullWidth
                value={search}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAddTag}
                onDelete={handleDeleteTag}
                label="Search Tags"
                variant="outlined"
              />
              <Typography variant="body2" color="secondary">
                *** Please press ENTER key to add tags
              </Typography>
              <Button
                style={{ marginTop: "0.5em" }}
                variant="contained"
                onClick={searchPlace}
                className={classes.searchButton}
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6} className={classes.pagination}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
