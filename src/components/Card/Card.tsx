import {memo, createRef} from "react";
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
  i?: number;
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
  }): JSX.Element => {
    const nodeRef = createRef<HTMLElement>();

    return (
      <NavLink
        to={{
          pathname: `/post/${id}/${userName}`,
          state: {
            userId: userId,
            title: title,
            body: body,
            referrer: window.location.pathname,
          },
        }}
        className={cardLink}>
        <section className={clItem} ref={nodeRef}>
          <p className={clUser}>{userId}</p>
          <Picture
            mediasize="1200"
            mediasize1="318"
            clPicture="picture_item"
          />
          <p className={clTitle}>{title}</p>
          <p className={clBody}>{body}</p>
        </section>
      </NavLink>
    );
  }
);
