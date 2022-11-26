import React, { useState, useEffect } from "react";

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);
  const [enterKeyPress, setEnterKeyPress] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
        setEnterKeyPress(false);
      }
    };

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
        setEnterKeyPress(false);
      }
    };

    const enterHandler = ({ key }) => {
      if (key === targetKey) {
        setEnterKeyPress(true);
      }
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    window.addEventListener("keypress", enterHandler);

    return () => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
      window.addEventListener("keypress", enterHandler);
    };
  }, [targetKey]);

  return {
    keyPressed,
    enterKeyPress,
  };
};

export default useKeyPress;
