import React from 'react';
import Input from "../Input/Input";
import Text from "../Text/Text";

const createTags = ({arr, boardCoord, editText, deleteTag, editTag, handleMouseMove}) => (
    arr.map((el, index) => {
        const styles = {
            top: `${el.y - boardCoord.top}px`,
            left: `${el.x - boardCoord.left}px`,
            zIndex: `${el.zIndex}`
        };
        if (el.edit) {
            return <Input
                text={el.text}
                key={index}
                styles={styles}
                editText={(newText) => editText(index, newText)}
                deleteTag={() => deleteTag(index)}/>
        } else {
            return <Text
                text={el.text}
                key={index}
                styles={styles}
                editTag={() => editTag(index)}
                handleMouseMove={(e) => handleMouseMove(e, index)}/>
        }
    }
));

export default createTags;