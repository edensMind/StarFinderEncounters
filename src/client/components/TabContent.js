import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    fontColor: {
      color: '#ccc',
    },
    title: {
        fontSize: '35px',
      },
  }));

export default function TabContent(props) {
    const classes = useStyles();
    return (
    <>
        <Fragment>
            <CardHeader  
            classes = {{
                title: `${classes.title} ${classes.fontColor}`
            }}
            title={props.title} />

            <div className={classes.fontColor}>
                {props.content}
            </div>
        </Fragment>
    </>
    );
}