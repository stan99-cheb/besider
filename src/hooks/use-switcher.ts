import { useCallback, useState } from "react";

const useSwitch = (initial = false) => {
  const [open, setOpen] = useState(initial);

  const toggle = useCallback(
    () => {
      setOpen((prev) => !prev);
    }, []
  );

  return [open, toggle] as const;
};

export default useSwitch;