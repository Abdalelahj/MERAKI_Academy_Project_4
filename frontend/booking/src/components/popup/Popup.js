import React, { useState, useEffect } from "react";
import "./popup.css";
const Popup = () => {
  const [hide, setHide] = useState(true);
 
  const hideMe = () => {
    setHide(false);
  };

  return (
    <>
      {hide && (
        <div className={hide ? "popup" : "block"} onClick={hideMe}>
          <span className="popuptext" id="myPopup">
            fill the search fields
          </span>
        </div>
      )}
    </>
  );
};

export default Popup;
