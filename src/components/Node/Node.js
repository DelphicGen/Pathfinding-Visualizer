import React from 'react'
import './Node.css'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import GradeIcon from '@material-ui/icons/Grade';

function Node({ node, onMouseDownHandler, onMouseEnterHandler, onDragStart, onDragOver, onDrop }) {

    const nodeColor = 
        node.isWall && !node.isFinish && !node.isStart ?
        'bg-black' :
        'bg-white'

    return (
        <div 
            id={`node-${node.row}-${node.col}`}
            className={`mb-1 mr-1 cursor-pointer node ${nodeColor}`} 
            style={{width: '25px', height: '25px'}}
            onMouseDown={() => onMouseDownHandler(node.row, node.col)}
            onMouseEnter={() => onMouseEnterHandler(node.row, node.col)}
            onDrop={() => onDrop(node)} 
        >
            {
                node.isStart && 
                <div
                    draggable
                    onDragStart={() => onDragStart(node)} 
                >
                    <KeyboardArrowRightIcon />
                </div>
            }
            {
                node.isFinish && 
                <div
                    draggable
                    onDragStart={() => onDragStart(node)} 
                >
                <GradeIcon />
                </div>
            }
        </div>
    )
}

export default Node
