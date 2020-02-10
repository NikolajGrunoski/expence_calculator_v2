import React from 'react'
import '../table/Alert.css'

const signOut = (props) => {
    return (
        <div className="main-alert">
                <div className="footer">
                    </div>
                           <div className="alert-box">
                <p className="p-header">You are signing out</p>
                <p>You are about to sign out. Are you sure ?</p>           
            <div className="alert-buttons">
                <button className="cancel-button" id="close" onClick={props.hide}
                >CANCEL</button>
                <button className="delete-button"  onClick={props.signOutAccepted}
                >SIGN OUT</button>
            </div>
        </div>
        </div>
    )
}

export default signOut;