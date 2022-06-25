import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Products/AddProduct/main.css";
import { useAlert } from "react-alert";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
function MailComponent() {
  const [ModleDelete, setModleDelete] = useState(true);
  const alert = useAlert()
  const toggleDelete = () => {
    setModleDelete(!ModleDelete);
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_7tvdb6a",
        "template_p6wgsus",
        form.current,
        "L2EIoHOnM3Ugkp_ED"
      )
      .then(
        (result) => {
          alert.success('Sent successfully!')
        },
        (error) => {
          alert.error('Error '+error)
        }
      );
    
  };

  return (
    <div>
      <Modal
        centered
        fullscreen="sm"
        size="md"
        isOpen={ModleDelete}
        toggle={() => toggleDelete()}
      >
        <ModalHeader><h4>Send Email</h4></ModalHeader>
        <ModalBody>
          <form ref={form} onSubmit={sendEmail}>
            <div className="container">
              <div className="row">
                <div className="col-md-12 py-3">
                  <label>Name</label>
                  <input
                    className="input1"
                    placeholder="name"
                    type="text"
                    name="user_name"
                  />
                </div>
                <div className="col-md-12 py-3">
                  <label>Email</label>
                  <input
                    className="input1"
                    placeholder="email"
                    type="email"
                    name="user_email"
                  />
                </div>
                  <div className="col-md-12 py-3">
                  <label>Subjet</label>
                  <input
                    type={'text'}
                    className="input1"
                    placeholder="Subjet"
                    name="subject"
                  />
                </div>
                <div className="col-md-12 py-3">
                  <label>Message</label>
                  <textarea
                    className="input1"
                    placeholder="message"
                    name="message"
                  />
                </div>
               
                <div className="col-md-12 py-3 d-flex justify-content-center">
                  <input className="data-from-btn" type="submit" value="Send" />
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
}

export default MailComponent;
