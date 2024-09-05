import React, { useState } from "react";

const Employeesidebar = ({ onButtonClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleIconClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const sidebar11Style = {
    position: "relative",
    height: "100%",
  };

  const verticalBar11Style = {
    backgroundColor: "rgb(7, 10, 92)",
    width: "80px",
    height: "100%",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "30px",
    marginTop: "-25%",
    marginLeft: "-40%",
    gap: "15px",
  };

  const verticalBarIcon11Style = {
    width: "50%",
    height: "5%",
    margin: "30px 0",
    transition: "transform 0.3s ease",
  };

  const verticalBarIcon11HoverStyle = {
    transform: "scale(1.05)",
  };

  const dropdownContent11Style = {
    position: "absolute",
    top: "-20px",
    left: "48px",
    height: "100%",
    width: "300%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    transform: "translateX(-125%)",
    pointerEvents: "none",
    zIndex: 3,
  };

  const dropdownContent11ShowStyle = {
    transform: "translateX(0)",
    pointerEvents: "auto",
  };

  const buttonStyle = {
    padding: "10px",
    textAlign: "center",
    border: "none",
    color: "white",
    marginTop: "13%",
    height: "10%",
    borderRadius: "14%",
    width: "90%",
    boxSizing: "border-box",
    cursor: "pointer",
    marginLeft: "5%",
    backgroundColor: "transparent",
    boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
    borderRadius: "30px",
  };

  const buttonHoverStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "scale(1.05)",
    boxShadow: "0px 12px 20px 0px rgba(7, 7, 7, 0.3)",
    color: "#f0f0f0",
  };

  return (
    <div
      className={`sidebar11 ${isDropdownOpen ? "show-dropdown11" : ""}`}
      style={sidebar11Style}
    >
      <div
        className="vertical-bar11"
        onClick={handleIconClick}
        style={verticalBar11Style}
      >
        <img
          src="https://img.icons8.com/?size=100&id=8951&format=png&color=FFFFFF"
          alt="Conference Icon"
          className="vertical-bar-icon11"
          style={verticalBarIcon11Style}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform =
              verticalBarIcon11HoverStyle.transform)
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
        />
        <img
          src="https://img.icons8.com/?size=100&id=34401&format=png&color=FFFFFF"
          alt="Cash In Hand Icon"
          className="vertical-bar-icon11"
          style={verticalBarIcon11Style}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform =
              verticalBarIcon11HoverStyle.transform)
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
        />
        <img
          src="https://img.icons8.com/?size=100&id=qaDBSQJh1PHW&format=png&color=FFFFFF"
          alt="Leave House Icon"
          className="vertical-bar-icon11"
          style={verticalBarIcon11Style}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform =
              verticalBarIcon11HoverStyle.transform)
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
        />
        <img
          src="https://img.icons8.com/?size=100&id=GlEOr5x0aJpH&format=png&color=FFFFFF"
          alt="Checked User Male Icon"
          className="vertical-bar-icon11"
          style={verticalBarIcon11Style}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform =
              verticalBarIcon11HoverStyle.transform)
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
        />
      </div>
      <div
        className="dropdown-content11"
        style={{
          ...dropdownContent11Style,
          ...(isDropdownOpen ? dropdownContent11ShowStyle : {}),
        }}
      >
        <button
          className="button44"
          onClick={() => onButtonClick("myteam")}
          style={buttonStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, buttonHoverStyle)
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, buttonStyle)
          }
        >
          MY TEAM
        </button>
        <button
          className="button55"
          onClick={() => onButtonClick("salaryReports")}
          style={buttonStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, buttonHoverStyle)
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, buttonStyle)
          }
        >
          PAY SLIPS
        </button>
        <button
          className="button66"
          onClick={() => onButtonClick("leave")}
          style={buttonStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, buttonHoverStyle)
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, buttonStyle)
          }
        >
          TIME OFF
        </button>
        <button
          className="button77"
          onClick={() => onButtonClick("Holiday")}
          style={buttonStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, buttonHoverStyle)
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, buttonStyle)
          }
        >
          HOLIDAY CALENDAR
        </button>
      </div>
    </div>
  );
};

export default Employeesidebar;
