/* eslint-disable @typescript-eslint/no-unused-vars */
import "./content.scss";
import "./searchbar.scss";
import {
  useState,
  useEffect,
  useRef,
  createRef,
} from "react";

import {Card} from "./../Card/Card";
import {Input} from "./../Input/Input";
import {Button} from "./../Button/Button";
import {RouteComponentProps} from "react-router-dom";
import {
  fetchLimit,
  names,
  randomNr,
  checkWidth,
} from "./../../helperFn/helperFn";

interface CompProps
  extends RouteComponentProps<{name: string}> {
  clSection: string;
  imagesCount: number;
}
export const Content: React.FC<CompProps> = ({
  match,
  clSection,
  imagesCount,
  history,
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
      if (time - parsed.lastChecked > 600) {
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
    if (
      inputRef.current !== null &&
      inputRef.current.value
    ) {
      setCheck((p) => !p);
      console.log(checkWidth());
      let nr = checkWidth();
      let end =
        Number(currentNode.current) + nr! <
        data.length
          ? Number(currentNode.current) + nr!
          : Math.abs(
              Number(currentNode.current) -
                data.length
            );
      for (
        let i = Number(currentNode.current);
        i < Number(currentNode.current) + end;
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
          if (
            data[i] &&
            window.location.pathname
          ) {
            history.push(
              `/post/${data[i].id}/${data[i].userId}`,
              {
                userId: data[i].userId,
                title: data[i].title,
                body: data[i].body,
                referrer:
                  window.location.pathname,
              }
            );
          }
        } else {
          setError(
            () =>
              `0 results for ${
                inputRef.current!.value
              }`
          );
          setCheck((p) => !p);
        }
      }
    }
  };

  const resetError = (): void => {
    setError("");
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
      {console.log(history)}
      <div className="search_bar">
        {!error ? (
          <>
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
              erClass="search_bar_error_input"
              type="text"
            />
            <Button
              txt="SEARCH"
              cn="search_bar_btn ripple"
              fnClick={handleClick}
              disabled={checkVal}
            />
          </>
        ) : (
          <div className="search_bar_error">
            <p>{`No results for value ${
              inputRef.current
                ? inputRef.current.value
                : undefined
            }`}</p>
            <Button
              txt="CLOSE"
              cn="search_bar_btn ripple"
              fnClick={resetError}
              disabled={false}
            />
          </div>
        )}
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
