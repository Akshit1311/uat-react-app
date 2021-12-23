import * as React from 'react'
export function useWindowSize() {
    const [size, setSize] = React.useState([0, 0]);
    React.useEffect(() => {
      function updateSize() {
        console.log(
          "Window Height, Width",
          window.innerHeight,
          window.innerWidth
        );
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }