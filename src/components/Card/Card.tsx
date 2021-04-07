import {Picture} from "./../Picture/Picture";
import {NavLink} from "react-router-dom";
import {RouteProps} from "react-router-dom";
import "./card.scss";
interface CompProps extends RouteProps {
  userId: string;
  id: number;
  title: string;
  body: string;
  clItem: string;
  cardLink: string;
  clTitle: string;
  clBody: string;
  clUser: string;
  userName: string;
}

export const Card: React.FC<CompProps> = ({
  userId,
  id,
  title,
  body,
  clItem,
  cardLink,
  clTitle,
  clBody,
  clUser,
  userName,
 
}): JSX.Element => {
  return (
    <NavLink
      to={`/post/${id}/${userName}`}
      className={cardLink}>
      <section className={clItem}>
        <p className={clUser}>{userId}</p>
        <Picture
          mediasize="1000"
          clPicture="picture_item"
        />
        <p className={clTitle}>{title}</p>
        <p className={clBody}>{body}</p>
      </section>
    </NavLink>
  );
};
