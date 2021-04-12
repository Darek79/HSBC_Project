import {NavLink} from "react-router-dom";

export const Path404 = (): JSX.Element => {
  return (
    <div className="path404">
      <p className="path404_msg">
        SORRY THIS PAGE DOESNT EXIST
      </p>
      <NavLink className="path404_link" to="/">
        Return to Content
      </NavLink>
    </div>
  );
};
