import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";
import { deletePlace, likePlace } from "../../../actions/placeActions";

const Place = ({ place, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [likes, setLikes] = useState(place?.likes);

  const userId = user?.profileInfo.googleId || user?.profileInfo?._id;
  const hasLikedPlace = place.likes.find((like) => like === userId);

  const handleLikePlace = (placeId) => {
    dispatch(likePlace(placeId));

    if (hasLikedPlace) {
      setLikes(place.likes.filter((id) => id !== userId));
    } else {
      setLikes([...place.likes, userId]);
    }
  };

  const openPlace = (e) => {
    e.stopPropagation();
    history.push(`/places/${place._id}`);
  };

  const Likes = () => {
    if (likes.length > 0) {
      return place.likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPlace}>
        <CardMedia
          className={classes.media}
          image={place.selectedFile}
          title={place.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{place.name}</Typography>
          <Typography variant="body2">
            {moment(place.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.profileInfo?.googleId === place.creator ||
          user?.profileInfo?._id === place.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(place._id);
              }}
            >
              <EditIcon fontSize="medium" />
              {/* <MoreHorizIcon fontSize="medium" /> */}
            </Button>
          </div>
        )}

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {place.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {place.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {place.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => handleLikePlace(place._id)}
          disabled={!user?.profileInfo}
        >
          <Likes />
        </Button>
        {(user?.profileInfo?.googleId === place.creator ||
          user?.profileInfo?._id === place.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePlace(place._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Place;
