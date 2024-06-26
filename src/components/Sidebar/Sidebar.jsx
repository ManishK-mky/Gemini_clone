import React, { useContext, useState } from 'react'
import {assets} from '../../assets/assets'
import './Sidebar.css'
import { Context } from '../../context/Context';

function Sidebar() {

    // making the functionality of collapsing sidebar

    const [extended , setExtended] = useState(false);
    const {onSent , previousPrompts , setRecentPrompts} = useContext(Context)

    function buttonClicked(){
        if(extended === true){
            setExtended(false)
        }else{
            setExtended(true)
        }
    }

  return (
    <div className="sidebar">
        <div className="top">
            <img className="menu" src={assets.menu_icon} onClick={buttonClicked} alt=""  />
            <div className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {extended?<p>New Chat</p>:null}
            </div>
            {
                extended ? <div className="recent">
                    <p className='recent-title'>Recent</p>
                        { previousPrompts.map((item , index) => {
                            return (
                                <div className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0,18)}..</p>
                                </div>
                            )
                        })}
                    </div> : null
            }
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extended?<p>Hello</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extended?<p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extended ? <p>Settings</p>: null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar
