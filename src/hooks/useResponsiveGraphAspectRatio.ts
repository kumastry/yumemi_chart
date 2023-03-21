import React from "react";

export const useResponsiveGraphAspectRatio = (): number => {
  const [graphAspectRatio, setGraphAspectRatio] = React.useState(() => {
    if (window.innerWidth > 520) {
      return 2;
    } else {
      return 0.6;
    }
  });

  React.useLayoutEffect(() => {
    const updateSize = (): void => {
      if (window.innerWidth > 520) {
        setGraphAspectRatio(2);
      } else {
        setGraphAspectRatio(0.6);
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  return graphAspectRatio;
};
