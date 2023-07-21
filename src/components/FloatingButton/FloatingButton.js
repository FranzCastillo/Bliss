import React from 'react'
import './FloatingButton.scss'
import { AiFillSetting } from "react-icons/ai";
import {useNavigate } from 'react-router-dom';
function FloatingButton() {
    const navigate = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault();
        navigate("/config-product")
    }
    return (
        <div className='floating-button' onClick={handleSubmit}>
            <div className='button'>
                <AiFillSetting className='settings-icon'/>
            </div>
        </div>
    )
}

export default FloatingButton