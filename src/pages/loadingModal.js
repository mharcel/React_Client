import React from "react";

export default function LoadingModal({isLoading, description="Loading..."}) {    
    
    return(
        <div style={{ display: isLoading ? 'flex' : 'none' }} className='modal'>
            <div className='modal-content'>
                <div className='loader'></div>
                <div className='modal-text'>{description}</div>
            </div>
        </div>
    )
}
