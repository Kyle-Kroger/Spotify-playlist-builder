// code from https://github.com/vercel/next.js/tree/canary/examples/with-portals

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ClientOnlyPortal = ({ children, selector }) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

export default ClientOnlyPortal;
