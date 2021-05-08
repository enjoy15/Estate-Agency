import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
function Appointment(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsFormOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const sendSMS = (id) => {
    async function doSMS() {
      let payload = {
        customerName: document.getElementById("customer-" + id).value,
        msg: document.getElementById("msg-" + id).value,
        tel: document.getElementById("tel-" + id).value,
        email: document.getElementById("email-" + id).value,
        date: document.getElementById("date-" + id).value,
        time: document.getElementById("time-" + id).value,
        housekey: id,
      };
      console.log(payload);
      let response = await fetch("http://localhost:3001/sms", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();
    }
    doSMS();
  };
  if (isOpen) {
    return (
      <div>
        <label>Preferred date:</label>
        <DatePicker
          id={`date-${props.id}`}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />

        <br />
        <label>Customer name:</label>
        <input id={`customer-${props.id}`} type="text"></input>
        <br />
        <label>Preferred time:</label>
        <input id={`time-${props.id}`} type="text"></input>
        <br />
        <label>Contact email:</label>
        <input id={`email-${props.id}`} type="text"></input>
        <br />
        <label>Contact phone:</label>
        <input id={`tel-${props.id}`} type="text"></input>
        <br />
        <label>Notes/comments:</label>
        <br />
        <textarea id={`msg-${props.id}`} rows="5" cols="40"></textarea>
        <br />
        <button
          onClick={() => {
            setIsFormOpen(false);
            setIsBooked(true);
            sendSMS(props.id);
          }}
        >
          Submit
        </button>
      </div>
    );
  }
  return (
    <button onClick={() => setIsFormOpen(true)}>
      {isBooked ? "Booked" : "Request viewing"}
    </button>
  );
}
export default Appointment;
