import { useEffect, useRef, useState } from "react";

interface IProps {
  _effect: () => void;
}

export default function useEffectOnce({ _effect }: IProps) {
  const effect = useRef<object>(_effect);
  const destroy = useRef();
  const effectCalled = useRef(false);
  const rendered = useRef(false);

  if (effectCalled.current) {
    rendered.current = true;
  }

  useEffect(() => {
    if (!effectCalled.current) {
      // destroy.current = effect.current();
      effectCalled.current = true;
    }
    return () => {
      if (rendered.current === false) return;
      // if (destroy.current) destroy.current();
    };
  }, []);
}

/***************************************************
 *    For javaScript version
 **************************************************/
// import { useEffect, useRef, useState } from "react";
// export default function useEffectOnce(_effect) {
//   const effect = useRef(_effect);
//   const destroy = useRef();
//   const effectCalled = useRef(false);
//   const rendered = useRef(false);
//   if (effectCalled.current) {
//     rendered.current = true;
//   }
//   useEffect(() => {
//     if (!effectCalled.current) {
//       destroy.current = effect.current();
//       effectCalled.current = true;
//     }
//     return () => {
//       if (rendered.current === false) return;
//       if (destroy.current) destroy.current();
//     };
//   }, []);
// }
