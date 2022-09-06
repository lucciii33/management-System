import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Modal from 'react-modal';
import Datetime from 'react-datetime';


Modal.setAppElement('#app');


export const ModalCalendar = ({ isOpen, onClose, onEventAdded }) => {

    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    function onSubmit(event) {
        event.preventDefault();
        onEventAdded({
            title,
            start,
            end,
        })
        onClose();
    }

    return (

        <>
            <Modal isOpen={isOpen} onRequestClose={onClose} >

                <form onSubmit={onSubmit}>
                    <input placeholder="title" value={title} onChange={event => setTitle(event.target.value)}></input>
                    <div>
                        <label>Start</label>
                        <Datetime value={start} onChange={date => setStart(date)} />
                    </div>
                    <div>
                        <label>end</label>
                        <Datetime value={end} onChange={date => setEnd(date)} />
                    </div>

                    <button>Add Event</button>
                </form>
            </Modal>

        </>
    );
};