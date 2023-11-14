import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography } from "@mui/material";
import StyledButton from "../styledComponents/styledButton";
import { Link } from "react-router-dom";

function StyledBlog(props) {
  const { _id, title, image, paragraph } = props.blog;
  return (
    <Grid
      container
      sx={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Grid key={_id} item xs={12} sm={3} md={3} lg={3} xl={3}>
        <Grid>
          <Typography
            variant="h6"
            sx={{
              color: "white",
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid>
          <img
            src={image}
            height="100px"
            width="150px"
            alt="blog"
            style={{ borderRadius: "5px" }}
          />
        </Grid>
      </Grid>
      <Grid
        key={`second${_id}`}
        container
        xs={12}
        sm={9}
        md={9}
        lg={9}
        xl={9}
        // justifyContent="center"
        alignItems="center"
        px="2rem"
        textAlign="left"
      >
        <Typography variant="p" sx={{ color: "white", height: "fit-content" }}>
          {paragraph.slice(0, 300) + "..."}
        </Typography>
      </Grid>
      <Grid
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        container
        alignItems="start"
        justifyContent="end"
        mr="1rem"
      >
        <StyledButton sx={{ marginTop: "0" }} bcolor={"white"}>
          <Link
            to={`/readBlogMore/${_id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            Read more
          </Link>
        </StyledButton>
      </Grid>
    </Grid>
  );
}

export default StyledBlog;
