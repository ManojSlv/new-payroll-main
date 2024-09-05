import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TicketContext } from "../../../contexts/TicketContext";

const raiseTicketContainer = {
  padding: "2%",
  background: "transparent",
  borderRadius: "0.8%",
  boxShadow: "0 4% 14% rgba(0, 0, 0, 0.1)",
  border: "0.2% solid #fbfbfb",
  position: "relative",
  overflow: "hidden",
  zIndex: 1,
  width: "70%",
  height: "70vh",
  overflowY: "auto",
  color: "#fbfafa",
  margin: "4% auto",
  boxSizing: "border-box",
  backgroundColor: "rgb(7, 10, 92)",
  marginRight: "40%",
  scrollbarWidth: "none",
};

const raiseTicketContainerBefore = {
  content: "''",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(#47229e)",
  zIndex: -1,
};

const raiseTicketHeading = {
  textAlign: "center",
  color: "white",
  marginBottom: "2%",
};

const raiseTicketFormContainer = {
  marginTop: "2%",
};

const raiseTicketFormGroup = {
  marginBottom: "1.5%",
};

const raiseTicketLabel = {
  display: "block",
  fontWeight: "bold",
  marginBottom: "0.5%",
  color: "rgb(236, 232, 232)",
};

const raiseTicketInput = {
  width: "100%",
  padding: "0.8%",
  boxSizing: "border-box",
  border: "0.1% solid #ccc",
  borderRadius: "0.4%",
  backgroundColor: "#fff",
  marginLeft: "auto",
};

const raiseTicketTextarea = {
  width: "100%",
  padding: "0.8%",
  boxSizing: "border-box",
  border: "0.1% solid #ccc",
  borderRadius: "0.4%",
  backgroundColor: "#fff",
  marginLeft: "auto",
  height: "10%",
};

const raiseTicketFormRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "3%",
  width: "100%",
};

const raiseTicketHalfWidth = {
  flex: 1,
};

const raiseTicketButtonRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1%",
};

const raiseTicketSubmitButton = {
  padding: "1% 1.5%",
  border: "none",
  borderRadius: "0.4%",
  backgroundColor: "#0056B3",
  color: "white",
  cursor: "pointer",
  width: "20%",
};

const raiseTicketCancelButton = {
  padding: "1% 1.5%",
  border: "none",
  borderRadius: "0.4%",
  backgroundColor: "#a71d2a",
  color: "white",
  cursor: "pointer",
  width: "20%",
  marginLeft: "60%",
};

const raiseTicketNotification = {
  position: "fixed",
  bottom: "2%",
  right: "2%",
  backgroundColor: "#4caf50",
  color: "white",
  padding: "1%",
  borderRadius: "0.5%",
  boxShadow: "0 2% 4% rgba(0, 0, 0, 0.2)",
  zIndex: 1000,
};

const notificationBar = {
  backgroundColor: "#4caf50",
  color: "white",
  padding: "1%",
  borderRadius: "0.5%",
  textAlign: "center",
  marginBottom: "2%",
};

const RaiseTicket = () => {
  const [location, setLocation] = useState("");
  const [supportTeam, setSupportTeam] = useState("");
  const [queryType, setQueryType] = useState("");
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();
  const formContainerRef = useRef(null);

  const { addTicket } = useContext(TicketContext);

  const getRecipients = (supportTeam) => {
    const recipients = {
      "HR Support": ["sharathnvmca2023@gmail.com", "sharathachar55@gmail.com"],
      "Manager Support": [
        "sharathachar55@gmail.com",
        "sharathnvmca2023@gmail.com",
      ],
      "Leader Support": [
        "sharathachar88@gmail.com",
        "sharathachar55@gmail.com",
      ],
      "Customer Support": [
        "sharathachar55@gmail.com",
        "sharathnvmca2023@gmail.com",
      ],
    };
    return recipients[supportTeam] || [];
  };

  const sendEmails = async (ticket) => {
    setLoading(true);
    const emailBody = `
            <h3>New Ticket Submitted</h3>
            <p><strong>Location:</strong> ${ticket.location}</p>
            <p><strong>Support Team:</strong> ${ticket.supportTeam}</p>
            <p><strong>Query Type:</strong> ${ticket.queryType}</p>
            <p><strong>Reason:</strong> ${ticket.reason}</p>
            <p><strong>Priority:</strong> ${ticket.priority}</p>
            <p><strong>Description:</strong> ${ticket.description}</p>
            <p><strong>Attachment:</strong> ${
              ticket.attachment ? ticket.attachment : "None"
            }</p>
        `;

    const recipients = getRecipients(ticket.supportTeam);

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipients: recipients,
          subject: "New Ticket Submitted",
          body: emailBody,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const result = await response.json();
      console.log(result);
      setNotification("Ticket submitted successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      setNotification("Failed to submit the ticket. Please try again.");
    } finally {
      setLoading(false);
      scrollToTop();
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: Date.now(),
      location,
      supportTeam,
      queryType,
      reason,
      priority,
      description,
      attachment: attachment ? attachment.name : null,
    };
    addTicket(newTicket);
    sendEmails(newTicket);
    clearForm();
  };

  const clearForm = () => {
    setLocation("");
    setSupportTeam("");
    setQueryType("");
    setReason("");
    setPriority("");
    setDescription("");
    setAttachment(null);
  };

  const handleCancel = () => {
    clearForm();
    navigate(0);
  };

  const scrollToTop = () => {
    if (formContainerRef.current) {
      formContainerRef.current.scrollTop = 0;
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.target.form;
      const formElements = Array.from(form.elements);
      const nextElement = formElements[index + 1];
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  return (
    <div style={raiseTicketContainer}>
      {notification && (
        <div style={notificationBar}>
          <p>{notification}</p>
        </div>
      )}
      <h1 style={raiseTicketHeading}>Raise Ticket</h1>
      <div style={raiseTicketFormContainer} ref={formContainerRef}>
        <form onSubmit={handleSubmit}>
          <div style={raiseTicketFormGroup}>
            <label style={raiseTicketLabel}>Location:</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 0)}
              required
              style={raiseTicketInput}
            >
              <option value="" disabled>
                Select location
              </option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>
          <div style={raiseTicketFormRow}>
            <div style={{ ...raiseTicketFormGroup, ...raiseTicketHalfWidth }}>
              <label style={raiseTicketLabel}>Support Team:</label>
              <select
                value={supportTeam}
                onChange={(e) => setSupportTeam(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
                required
                style={raiseTicketInput}
              >
                <option value="" disabled>
                  Select support team
                </option>
                <option value="HR Support">HR Support</option>
                <option value="Manager Support">Manager Support</option>
                <option value="Leader Support">Leader Support</option>
                <option value="Customer Support">Customer Support</option>
              </select>
            </div>
            <div style={{ ...raiseTicketFormGroup, ...raiseTicketHalfWidth }}>
              <label style={raiseTicketLabel}>Query Type:</label>
              <select
                value={queryType}
                onChange={(e) => setQueryType(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 2)}
                required
                style={raiseTicketInput}
              >
                <option value="" disabled>
                  Select query type
                </option>
                <option value="Leave Query">Leave Query</option>
                <option value="Timesheet">Timesheet</option>
                <option value="Changes to Employee Profile">
                  Changes to Employee Profile
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div style={raiseTicketFormRow}>
            <div style={{ ...raiseTicketFormGroup, ...raiseTicketHalfWidth }}>
              <label style={raiseTicketLabel}>Reason:</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 3)}
                required
                style={raiseTicketInput}
              />
            </div>
            <div style={{ ...raiseTicketFormGroup, ...raiseTicketHalfWidth }}>
              <label style={raiseTicketLabel}>Priority:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 4)}
                required
                style={raiseTicketInput}
              >
                <option value="" disabled>
                  Select priority
                </option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <div style={raiseTicketFormGroup}>
            <label style={raiseTicketLabel}>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 5)}
              required
              style={raiseTicketTextarea}
            />
          </div>
          <div style={raiseTicketFormGroup}>
            <label style={raiseTicketLabel}>Attachment:</label>
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
              onKeyDown={(e) => handleKeyDown(e, 6)}
              style={raiseTicketInput}
            />
          </div>
          <div style={raiseTicketButtonRow}>
            <button
              type="submit"
              disabled={loading}
              style={raiseTicketSubmitButton}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              style={raiseTicketCancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseTicket;
