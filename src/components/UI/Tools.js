import React from 'react'
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Logo from './Logo';
import { Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
        background: '#fff',
        fontWeight: 'bold',
        transition: '.1s all ease-in-out',
        '&:hover': {
            backgroundColor: '#fff',
            transform: 'scale(1.05)'
        }
    },
    margin: {
        margin: theme.spacing(1)
    },
    select: {
        color: '#fff',
        borderColor: '#fff',
        '&:before': {
            borderColor: '#fff',
        },
        '&:after': {
            borderColor: '#fff',
        }
    },
    icon: {
        fill: '#fff'
    }
}));

function Tools({ visualize, resetGrid, speed, setSpeed }) {
    const classes = useStyles();
    return (
        <div className="bg-gray-700 text-white py-5 px-3 mb-10 flex items-center">
            <Logo text="Findingpath Visualizer" className="mr-5" />

            <Select
                labelId="speed-label"
                id="speed"
                value={speed}
                onChange={e => setSpeed(e.target.value)}
                className={`${classes.select} ${classes.margin}`} 
                inputProps={{
                    classes: {
                        icon: classes.icon,
                    },
                }}
            >
                <MenuItem value={50}>Slow</MenuItem>
                <MenuItem value={30}>Medium</MenuItem>
                <MenuItem value={10}>Fast</MenuItem>
            </Select>

            <Button 
                className={`${classes.button} ${classes.margin}`} 
                onClick={resetGrid}
                endIcon={<RotateLeftIcon />}
            >
                Reset Grid
            </Button>

            <Button 
                className={`${classes.button} ${classes.margin}`}
                onClick={visualize}
                endIcon={<PlayArrowIcon />}
            >
                Visualize
            </Button>

        </div>
    )
}

export default Tools
