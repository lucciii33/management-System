import React, { useState, useEffect, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import Modal from 'react-modal';
import Datetime from 'react-datetime';
import FullCalendar, { hasBgRendering } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { ModalCalendar } from "../component/modalCalendar"

Modal.setAppElement('#app');


export const NewCalendar = () => {
    const { store, actions } = useContext(Context);
    const [modalOpen, setOpenModal] = useState(false)
    const calendarRef = useRef(null)
    const onEventAdded = (event) => {
        let calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent(event);
        console.log(event)
    }
    return (

        <section className="m-4 mt-5">
            <button onClick={() => setOpenModal(true)}>Add New Event</button>
            <div>
            </div>
            <div style={{ position: 'relative', zIndex: 0 }}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                // eventAdd={event => handelEventAdd}
                />

            </div>

            <ModalCalendar isOpen={modalOpen} onClose={() => setOpenModal(false)} onEventAdded={(event) => onEventAdded(event)} />
        </section>
    );
};
