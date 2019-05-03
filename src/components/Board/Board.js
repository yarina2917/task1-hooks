import React, {useState, useEffect, useRef} from 'react';
import './Board.css';
import CreateTags from './CreateTags/CreateTags';

const board = () => {

    const [arr, setArr] = useState([]);
    const [boardCoord, setBoardCoord] = useState({});
    const [tagSize] = useState({width: 80, height: 25});
    const [currentEdit, setCurrentEdit] = useState(null);
    const [currentActive, setCurrentActive] = useState(null);
    const boardEl = useRef(null);

    useEffect(() => {
        const rect = boardEl.current.getBoundingClientRect();
        setBoardCoord({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom
        })
    }, []);

    const deleteTagHandler = (index) => {
        const newArr = [...arr];
        newArr.splice(index, 1);
        setArr(newArr);
        setCurrentEdit(null);
        setCurrentActive(null);
    };

    const checkBoardHandler = (e) => {
        if (e.target.parentNode.className !== 'el' && e.target.className !== 'el') {
            const newArr = [...arr];
            if (currentEdit !== null) {
                if (arr[currentEdit].text) {
                    newArr[currentEdit].edit = false;
                    setArr(newArr);
                    setCurrentEdit(null);
                    if (currentActive !== null) {
                        newArr[currentActive].zIndex = 1;
                        setCurrentActive(null);
                    }
                } else {
                    deleteTagHandler(currentEdit);
                }
            } else {
                let xCoord = e.clientX;
                let yCoord = e.clientY;
                if (xCoord + tagSize.width > boardCoord.right) {
                    xCoord = boardCoord.right - tagSize.width
                }
                if (yCoord + tagSize.height > boardCoord.bottom) {
                    yCoord = boardCoord.bottom - tagSize.height
                }
                if (currentActive !== null) {
                    newArr[currentActive].zIndex = 1;
                    setCurrentActive(null);
                }
                newArr.push({
                    text: 'test',
                    edit: true,
                    x: xCoord,
                    y: yCoord,
                    zIndex: 1
                });
                setArr(newArr);
                setCurrentEdit(newArr.length - 1);
            }
        }

    };

    const editTagHandler = (index) => {
        const newArr = [...arr];
        if (currentEdit != null) {
            newArr[currentEdit].edit = false;
        }
        if (currentActive !== null) {
            newArr[currentActive].zIndex = 1;
        }
        newArr[index].edit = true;
        newArr[index].zIndex = 100;
        setArr(newArr);
        setCurrentEdit(index);
        setCurrentActive(index);
    };

    const editTextHandler = (index, newText) => {
        const newArr = [...arr];
        newArr[index].text = newText;
        setArr(newArr);
    };

    const handleMouseMove = (e, index) => {
        const newArr = [...arr];
        let coordX = e.pageX - tagSize.width / 2;
        let coordY = e.pageY - tagSize.height / 2;
        if (coordX + tagSize.width > boardCoord.right) {
            coordX = boardCoord.right - tagSize.width
        }
        if (coordX < boardCoord.left) {
            coordX = boardCoord.left;
        }
        if (coordY + tagSize.height > boardCoord.bottom) {
            coordY = boardCoord.bottom - tagSize.height;
        }
        if (coordY < boardCoord.top) {
            coordY = boardCoord.top;
        }

        newArr[index].x = coordX;
        newArr[index].y = coordY;

        if (currentActive !== index && currentActive !== null) {
            newArr[currentActive].zIndex = 1;
            newArr[index].zIndex = 100;
        }
        newArr[index].zIndex = 100;
        setCurrentActive(index);

        setArr(newArr);
    };

    return (
        <div className='board'
             onClick={(e) => checkBoardHandler(e)}
             ref={boardEl}>
            <CreateTags
                arr={arr}
                boardCoord={boardCoord}
                editText={(index, newText) => editTextHandler(index, newText)}
                deleteTag={(index) => deleteTagHandler(index)}
                editTag={(index) => editTagHandler(index)}
                handleMouseMove={(e, index) => handleMouseMove(e, index)}
            />
        </div>
    )
};

export default board;