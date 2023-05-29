import React, { useEffect, useState } from "react";
import OrangeQuarter from "../../images/quartolaranjasmall.png";

const RotatingOrange = function() {
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
  }, []);

  return (
    <div className="mt-4 ml-4">
      <img src={OrangeQuarter} alt="quarterorange" style={rotateOrange} />
    </div>
  );
};

export default RotatingOrange;
