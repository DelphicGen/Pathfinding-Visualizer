import React, { useState, useEffect, useCallback } from 'react'
import Node from './Node/Node'
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijsktra';
import Tools from './UI/Tools';

function PathfindingVisualizer() {
    const [grid, setGrid] = useState(null)
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [speed, setSpeed] = useState(10)
    const [startNodePosition, setStartNodePosition] = useState({
        row: 5,
        col: 10
    })
    const [finishNodePosition, setFinishNodePosition] = useState({
        row: 7,
        col: 32
    })
    const [dragAndDrop, setDragAndDrop] = useState({
        isDragging: false,
        draggedNode: null,
    })

    // <-------------------- Grid and Node --------------------->
    const createNode = useCallback((row, col) => {
        return {
            col,
            row,
            isStart: row === startNodePosition.row && col === startNodePosition.col,
            isFinish: row === finishNodePosition.row && col === finishNodePosition.col,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
        }
    }, [finishNodePosition.col, finishNodePosition.row, startNodePosition.col, startNodePosition.row])

    const generateInitialGrid = useCallback(() => {
        let tempGrid = [];
        let tempRow = [];

        for(let i = 0; i < 15; i++) {

            tempRow = []
            for(let j = 0; j < 40; j++) {
                if(grid && grid[i][j].isWall) tempRow.push(grid[i][j]);
                else tempRow.push(createNode(i, j));
            }
            tempGrid.push(tempRow)

        }

        return tempGrid
    }, [createNode])

    const getNewGridWithWallToggled = (grid, row, col) => {
        const newGrid = [...grid]
        newGrid[row][col].isWall = !newGrid[row][col].isWall
        return newGrid
    } 

    const resetGrid = () => {
        const initialGrid = generateInitialGrid()
        setGrid(initialGrid)  

        const tempGrid = [...grid]

        for (let i = 0; i < tempGrid.length; i++) {
            for(let j = 0; j < tempGrid[i].length; j++) {
                document.getElementById(`node-${i}-${j}`).className =`mb-1 mr-1 cursor-pointer node bg-white`;
            }
        }
    }

    useEffect(() => {
        const initialGrid = generateInitialGrid()
        setGrid(initialGrid)
        
        window.addEventListener('mouseup', onMouseUpHandler)
        return () => window.removeEventListener('mouseup', onMouseUpHandler);
    }, [generateInitialGrid])

    // <-------------------- Event Listener --------------------->
    const onMouseDownHandler = (row, col) => {
        console.log(dragAndDrop)
        // if(dragAndDrop.isDragging || grid[row][col].isStart || grid[row][col].isFinish) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col)
        setIsMouseDown(true)
        setGrid(newGrid)
    }

    const onMouseUpHandler = () => {
        setIsMouseDown(false)
    }

    const onMouseEnterHandler = (row, col) => {
        // if(!isMouseDown || dragAndDrop.isDragging) return;
        if(!isMouseDown) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col)
        setGrid(newGrid)
    }

    const onDragStart = (node) => {
        // if(isMouseDown) return;
        setDragAndDrop(prevState => ({
            ...prevState,
            isDragging: true,
            draggedNode: node
        }))
    }

    const onDragOver = e => {
        e.preventDefault()
    }

    const onDrop = (node) => {
        if(!dragAndDrop.isDragging) return;
        if(dragAndDrop.draggedNode.isStart) {
            setStartNodePosition(prevState => ({
                ...prevState,
                row: node.row,
                col: node.col
            }))
        } else {
            setFinishNodePosition(prevState => ({
                ...prevState,
                row: node.row,
                col: node.col
            }))
        }
        setDragAndDrop(prevState => ({
            ...prevState,
            isDragging: false
        }))
    }

    // <-------------------- Algorithms --------------------->
    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'mb-1 mr-1 cursor-pointer node node-visited';
          }, speed * i);
        }
        setTimeout(() => {
            animateShortestPath(nodesInShortestPathOrder);
        }, speed * visitedNodesInOrder.length);
        return;
    }

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              `mb-1 mr-1 cursor-pointer node node-shortest-path`;
          }, 50 * i);
        }
    }

    const visualizeDijkstra = () => {
        const startNode = grid[startNodePosition.row][startNodePosition.col];
        const finishNode = grid[finishNodePosition.row][finishNodePosition.col];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    return (
        <div>
            <Tools 
                visualize={visualizeDijkstra}
                resetGrid={resetGrid}
                speed={speed}
                setSpeed={setSpeed}
            />
            <div style={{backgroundImage: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'}} className="mx-auto w-fit-content pt-1 pl-1">
                {
                    grid?.map((row, idx) => {
                        return (
                            <div key={idx} className="flex">
                                {
                                    row.map((node, i) => {
                                        return (
                                            node.isStart || node.isFinish ? 
                                            <Node node={node} key={i} onDragStart={onDragStart} onDrop={onDrop} /> : 
                                            <Node node={node} key={i} onMouseDownHandler={onMouseDownHandler} onMouseEnterHandler={onMouseEnterHandler} onDragOver={onDragOver} onDrop={onDrop} />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
    
}
    

export default PathfindingVisualizer
