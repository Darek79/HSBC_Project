/* eslint-disable @typescript-eslint/no-unused-vars */
import "./content.scss";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {Card} from "./../Card/Card";
import {RouteComponentProps} from "react-router-dom";
import {
  fetchLimit,
  names,
  randomNr,
} from "./../../helperFn/helperFn";
const userpost = {
  userId: "Tomek",
  id: 1,
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body:
    "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
};
interface CompProps
  extends RouteComponentProps<{name: string}> {
  clSection: string;
}
export const Content: React.FC<CompProps> = ({
  match,
  location,
  clSection,
}): JSX.Element => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    // fetchFiles(
    //   "https://jsonplaceholder.typicode.com/posts/1",
    //   setData,
    //   setError
    // );
    // fetchLimit(
    //   3,
    //   1,
    //   setData,
    //   setError,
    //   randomNr,
    //   names
    // );
  }, []);

  return (
    <section className={clSection}>
      {console.log(match)}
      <Card
        userId={userpost.userId}
        id={userpost.id}
        title={userpost.title}
        body={userpost.body}
        clItem="card_item"
        cardLink="card_link"
        clUser="card_user"
        clTitle="card_title"
        clBody="card_body"
        userName={match.params.name}
      />
      <Card
        userId={userpost.userId}
        id={userpost.id}
        title={userpost.title}
        body={userpost.body}
        clItem="card_item"
        cardLink="card_link"
        clUser="card_user"
        clTitle="card_title"
        clBody="card_body"
        userName={match.params.name}
      />

      <Card
        userId={userpost.userId}
        id={userpost.id}
        title={userpost.title}
        body={userpost.body}
        clItem="card_item"
        cardLink="card_link"
        clUser="card_user"
        clTitle="card_title"
        clBody="card_body"
        userName={match.params.name}
      />
      <Card
        userId={userpost.userId}
        id={userpost.id}
        title={userpost.title}
        body={userpost.body}
        clItem="card_item"
        cardLink="card_link"
        clUser="card_user"
        clTitle="card_title"
        clBody="card_body"
        userName={match.params.name}
      />
      <Card
        userId={userpost.userId}
        id={userpost.id}
        title={userpost.title}
        body={userpost.body}
        clItem="card_item"
        cardLink="card_link"
        clUser="card_user"
        clTitle="card_title"
        clBody="card_body"
        userName={match.params.name}
      />

      <Card
        userId={userpost.userId}
        id={userpost.id}
        title={userpost.title}
        body={userpost.body}
        clItem="card_item"
        cardLink="card_link"
        clUser="card_user"
        clTitle="card_title"
        clBody="card_body"
        userName={match.params.name}
      />
      <Card
        userId={userpost.userId}
        id={userpost.id}
        title={userpost.title}
        body={userpost.body}
        clItem="card_item"
        cardLink="card_link"
        clUser="card_user"
        clTitle="card_title"
        clBody="card_body"
        userName={match.params.name}
      />
      <Card
        userId={userpost.userId}
        id={userpost.id}
        title={userpost.title}
        body={userpost.body}
        clItem="card_item"
        cardLink="card_link"
        clUser="card_user"
        clTitle="card_title"
        clBody="card_body"
        userName={match.params.name}
      />

      <Card
        userId={userpost.userId}
        id={userpost.id}
        title={userpost.title}
        body={userpost.body}
        clItem="card_item"
        cardLink="card_link"
        clUser="card_user"
        clTitle="card_title"
        clBody="card_body"
        userName={match.params.name}
      />
      <Card
        userId={userpost.userId}
        id={userpost.id}
        title={userpost.title}
        body={userpost.body}
        clItem="card_item"
        cardLink="card_link"
        clUser="card_user"
        clTitle="card_title"
        clBody="card_body"
        userName={match.params.name}
      />
      <Card
        userId={userpost.userId}
        id={userpost.id}
        title={userpost.title}
        body={userpost.body}
        clItem="card_item"
        cardLink="card_link"
        clUser="card_user"
        clTitle="card_title"
        clBody="card_body"
        userName={match.params.name}
      />

      <Card
        userId={userpost.userId}
        id={userpost.id}
        title={userpost.title}
        body={userpost.body}
        clItem="card_item"
        cardLink="card_link"
        clUser="card_user"
        clTitle="card_title"
        clBody="card_body"
        userName={match.params.name}
      />
      {console.log(data.length > 0 && data)}
      {data.length > 0 &&
        data.map((el) => <p>{el.userId}</p>)}
    </section>
  );
};
