import { useEffect, useState } from "react";

export const useScrollbarState = () => {
  const [stuckAtBottom, setStuckAtBottom] = useState(false);

  useEffect(() => {
    const handleStuckState = (state: boolean) => setStuckAtBottom(state);
    events.on("UPDATE_STUCK_STATE", handleStuckState);

    return () => {
      events.off("UPDATE_STUCK_STATE", handleStuckState);
    };
  }, []);

  return { stuckAtBottom, setStuckAtBottom };
};
