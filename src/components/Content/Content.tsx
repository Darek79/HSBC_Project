/* eslint-disable @typescript-eslint/no-unused-vars */
import "./content.scss";
import {
  useState,
  useEffect,
  createRef,
} from "react";
import {Card} from "./../Card/Card";
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
  const nodeRef;;
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

      if (time - parsed.lastChecked > 60) {
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

  useEffect(() => {
    console.log(data.length, imagesCount - 1);
    if (data.length === imagesCount - 1) {
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
  }, [data]);

  return (
    <section className={clSection}>
      {data.length > 0 &&
        data.map((el) => (
          <Card
            key={el.title}
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
            r={nodeRef}
          />
        ))}
    </section>
  );
};
