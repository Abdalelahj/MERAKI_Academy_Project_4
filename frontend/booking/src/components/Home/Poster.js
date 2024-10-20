import React from "react";
import "./home.css";
const Poster = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", gap: "2em" }}
      className="posterImg"
    >
      <div>
        <img
          alt="proposition"
          src="https://zen.wego.com/web/illustrations/look-no-further.png"
          height="100"
          width="100"
        />
        <div>Best Travel Apps in Jordan</div>
        <div>Highly rated on App Store and Google Play</div>
      </div>
      <div>
        <img
          alt="proposition"
          src="https://zen.wego.com/web/illustrations/shop-with-confidence.png"
          height="100"
          width="100"
        />
        <div>Final prices</div>
        <div>No additional taxes or fees.</div>
      </div>
      <div>
        <img
          alt="proposition"
          src="https://zen.wego.com/web/illustrations/pay-the-way-you-want.png"
          height="100"
          width="100"
        />
        <div>Wide payment options</div>
        <div>Search results that match your preferred payment methods</div>
      </div>
      <div>
        <img
          alt="proposition"
          src="https://zen.wego.com/web/illustrations/instant-booking.png"
          height="100"
          width="100"
        />
        <div>Faster and easier booking</div>
        <div>
        Search, compare and book at maximum speed with elite providers.
          
        </div>
      </div>
    </div>
  );
};

export default Poster;
