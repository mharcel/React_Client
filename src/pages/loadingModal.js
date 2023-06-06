import React from "react";

export default function LoadingModal(isLoading) {
    return(
    <div style={{ display: isLoading ? 'flex' : 'none' }} className='modal'>
                <div className='modal-content'>
                    <div className='loader'></div>
                    <div className='modal-text'>Loading...</div>
                </div>
            </div>
    )
}
