import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Orange from "../../images/laranjasmall.png";

const CustomLogo = function() {
  const location = useLocation();
  const [rotateOrange, setRotateOrange] = useState({
    transform: "rotate(0.2turn)",
  });
  const [turns, setTurns] = useState(0.2);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count < 5) {
      const timer = setTimeout(() => {
        const newTurn = turns + 0.2;
        setRotateOrange({ transform: `rotate(${newTurn}turn)` });
        setTurns(turns + 0.2);
        setCount(count + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [count, rotateOrange, turns]);

  useEffect(() => {
    setCount(0);
    setTurns(0.2);
    setRotateOrange({
      transform: "rotate(0.2turn)",
    });
  }, [location]);

  return (
    <div className="">
      <img
        src={Orange}
        alt="logo"
        className="position-fixed bottom-0 end-0 mb-2 me-2 img-fluid orangesize"
        style={rotateOrange}
      />
    </div>
  );
};

export default CustomLogo;
