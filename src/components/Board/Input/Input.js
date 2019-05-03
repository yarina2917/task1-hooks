import React from 'react';

const inputTag = ({text, styles, editText, deleteTag}) => (
    <div className='el' style={styles}>
        <input
            type="text"
            defaultValue={text}
            onChange={(e) => editText(e.target.value)}/>
        <button onClick={deleteTag}>X</button>
    </div>
);

export default inputTag;