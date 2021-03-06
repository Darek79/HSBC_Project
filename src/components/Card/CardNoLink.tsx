import {Picture} from "./../Picture/Picture";
import {
  useLocation,
  Link,
} from "react-router-dom";

import "./card.scss";

interface Match {
  userId: string;
  body: string;
  title: string;
  referrer: string;
}

interface CompProps {
  clItem: string;
  cardSolo: string;
  clTitle: string;
  clBody: string;
  clUser: string;
}

export const CardNoLink: React.FC<CompProps> = ({
  clItem,
  cardSolo,
  clTitle,
  clBody,
  clUser,
}): JSX.Element => {
  const {state, pathname} = useLocation<Match>();
  return (
    <section className={`${clItem} ${cardSolo}`}>
      {console.log(state, pathname, "path")}
      <Link
        to={`/content/${state.referrer}`}
        className="card_solo_x"></Link>
      <p className={clUser}>{state.userId}</p>
      <Picture
        mediasize="1000"
        mediasize1="318"
        clPicture="picture_item"
      />
      <p className={clTitle}>{state.title}</p>
      <p className={clBody}>{state.body}</p>
    </section>
  );
};
