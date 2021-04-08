import {
  memo,
  MutableRefObject,
  RefObject,
} from "react";
import {Picture} from "./../Picture/Picture";
import {NavLink} from "react-router-dom";

import "./card.scss";

interface CompProps {
  userId?: string;
  id?: number;
  title?: string;
  body?: string;
  userName?: string;
  clItem: string;
  cardLink: string;
  clTitle: string;
  clBody: string;
  clUser: string;
  r: HTMLDivElement;
}

export const Card: React.FC<CompProps> = memo(
  ({
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
    r,
  }): JSX.Element => {
    return (
      <NavLink
        to={{
          pathname: `/post/${id}/${userName}`,
          state: {
            userId: userId,
            title: title,
            body: body,
          },
        }}
        className={cardLink}>
        <section className={clItem} ref={r}>
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
  }
);
