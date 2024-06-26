import { useEffect, useRef } from "react";

export const usePrevios = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
