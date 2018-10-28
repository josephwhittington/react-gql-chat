import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const customStyles = {
    loading: {
        display: "block",
        margin: "0 auto"
    }
};

const Loading = props => {
    const { classes } = props;
    return (
        <CircularProgress
            className={classes.progress}
            style={customStyles.loading}
        />
    );
};

export default Loading;
