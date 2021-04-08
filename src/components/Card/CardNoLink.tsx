import {Picture} from "./../Picture/Picture";
import {useLocation} from "react-router-dom";
import "./card.scss";

interface Match {
  userId: string;
  body: string;
  title: string;
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
  const {state} = useLocation<Match>();
  return (
    <section className={`${clItem} ${cardSolo}`}>
      {console.log(state.userId)}
      <p className={clUser}>{"test"}</p>
      <Picture
        mediasize="1000"
        clPicture="picture_item"
      />
      <p className={clTitle}>{state.title}</p>
      <p className={clBody}>{state.body}</p>
    </section>
  );
};
