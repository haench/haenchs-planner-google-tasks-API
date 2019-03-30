import { useEffect } from "react";
// Hook
function useKeyPress(targetKey, keyFunction) {
  // If released key is our target key then set to false
  const downHandler = ({ key }) => {
    if (key === targetKey && document.activeElement.id === "task") {
      keyFunction();
    }
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  // return keyPressed;
}

export default useKeyPress;
