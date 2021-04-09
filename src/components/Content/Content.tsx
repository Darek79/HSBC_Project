/* eslint-disable @typescript-eslint/no-unused-vars */
import "./content.scss";
import "./searchbar.scss";
import {
  useState,
  useEffect,
  useRef,
  createRef,
  MutableRefObject,
} from "react";

import {Card} from "./../Card/Card";
import {Input} from "./../Input/Input";
import {Button} from "./../Button/Button";
import {RouteComponentProps} from "react-router-dom";
import {
  fetchLimit,
  names,
  randomNr,
} from "./../../helperFn/helperFn";

interface CompProps
  extends RouteComponentProps<{name: string}> {
  clSection: string;
  imagesCount: number;
}
export const Content: React.FC<CompProps> = ({
  match,
  location,
  clSection,
  imagesCount,
}): JSX.Element => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [checkVal, setCheck] = useState<boolean>(
    false
  );
  const nodeRef = useRef<IntersectionObserver | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement | null>(
    null
  );
  const currentNode = useRef<null | string>(null);
  let arr: any[] = [];

  useEffect(() => {
    if (sessionStorage.getItem("data")) {
      const time = Math.floor(Date.now() / 1000);
      const object = sessionStorage.getItem(
        "data"
      );
      let parsed: {
        lastChecked: number;
        data: any[];
      } =
        object !== null
          ? JSON.parse(object)
          : {lastChecked: 0, data: []};
      if (object !== null) {
        parsed = JSON.parse(object);
      }
      if (time - parsed.lastChecked > 6000) {
        setData(() => []);
        window.sessionStorage.removeItem("data");
        fetchLimit(
          imagesCount,
          1,
          setData,
          setError,
          randomNr,
          names
        );
      } else {
        setData(() => parsed.data);
      }
    } else {
      fetchLimit(
        imagesCount,
        1,
        setData,
        setError,
        randomNr,
        names
      );
    }
  }, []);

  const handleClick = (): void => {
    if (inputRef.current !== null) {
      console.log(inputRef.current.value);

      setCheck(true);
      for (
        let i = Number(currentNode.current);
        i <
        Number(currentNode.current) +
          (data.length -
            Number(currentNode.current));
        i++
      ) {
        if (
          data[i].title.includes(
            inputRef.current.value
          ) ||
          data[i].body.includes(
            inputRef.current.value
          )
        ) {
          console.log(data[i]);
        } else {
          setError(
            () =>
              `0 results for ${
                inputRef.current!.value
              }`
          );
        }
      }
    }
  };

  useEffect(() => {
    if (data.length === imagesCount - 1) {
      nodeRef.current = new IntersectionObserver(
        ([entry]) => {
          console.log(entry);

          currentNode.current = entry.target.getAttribute(
            "data-index"
          );
        },
        {threshold: 1}
      );
      console.log(arr);
      if (!checkVal) {
        console.log("observe");
        arr.forEach((el) =>
          nodeRef.current!.observe(el.current)
        );
      }

      if (
        !window.sessionStorage.getItem("data")
      ) {
        sessionStorage.setItem(
          "data",
          JSON.stringify({
            lastChecked: Math.floor(
              Date.now() / 1000
            ),
            data,
          })
        );
      }
    }
    return () => {
      if (data.length === imagesCount - 1) {
        nodeRef.current!.disconnect();
      }
    };
  }, [data, checkVal]);

  return (
    <section className={clSection}>
      <div className="search_bar">
        <Input
          hasLock={false}
          laClass="search_bar_label"
          spClass="search_bar_span"
          laMerge="search_bar_merge"
          clClass="search_bar_input"
          pass={false}
          placeholder=""
          r={inputRef}
          length={0}
          erClass="search_bar_error"
          type="text"
        />
        <Button
          txt="SEARCH"
          cn="search_bar_btn ripple"
          fnClick={handleClick}
          disabled={checkVal}
        />
      </div>
      {data.length > 0 &&
        data.map((el, i) => {
          const loopRef = createRef<HTMLSpanElement>();
          arr.push(loopRef);
          return (
            <span
              key={`${el.key}`}
              ref={loopRef}
              data-index={i}>
              <Card
                userId={el.userId}
                id={el.id}
                title={el.title}
                body={el.body}
                clItem="card_item"
                cardLink="card_link"
                clUser="card_user"
                clTitle="card_title"
                clBody="card_body"
                userName={match.params.name}
              />
            </span>
          );
        })}
    </section>
  );
};
