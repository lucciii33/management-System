import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Modal from 'react-modal';
import Datetime from 'react-datetime';


Modal.setAppElement('#app');


export const ModalCalendar = ({ isOpen, onClose, onEventAdded }) => {

    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    function onSubmit(e) {
        e.preventDefault();
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
                    <input placeholder="title" value={title} onChange={e => setTitle(e.target.value)}></input>
                    <div>
                        <label>Start</label>
                        <Datetime value={start} onChange={date => setStart(date)} />
                    </div>
                    <div>
                        <label>end</label>
                        <Datetime value={end} onChange={date => setEnd(date)} />
                    </div>

                    <button type="submit">Add Event</button>
                </form>
            </Modal>

        </>
    );
};