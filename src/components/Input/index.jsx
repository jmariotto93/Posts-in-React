import React, { useRef } from 'react';

import './styles.css'
import SearchIcon from '@mui/icons-material/Search';

export const Input = ({value, onChange}) => {
    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();
    };
     return   (    
        <> 
            <input
                ref={inputRef}
                className='input-search'
                type="search"
                value={value}
                onChange={onChange}
                placeholder='Enter your search'
            /> 
            <SearchIcon className='search-icon' fontSize="small" onClick={focusInput}/>
        </>        
    )
}