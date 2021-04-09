import {useEffect, useState} from "react";

export const ElementObserver = (
  arg: any[],
  arg2: {threshold: number}
): void => {
  const [nodes, setNodes] = useState<
    React.SetStateAction<any[]>
  >([]);

  useEffect(() => {
    let observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry.isIntersecting);
      },
      arg2
    );
    console.log(arg);
    arg.map((el) => observer.observe(el.current));
  }, []);
};
