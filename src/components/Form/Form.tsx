import {useState, useRef} from "react";
import {RouteComponentProps} from "react-router-dom";
import {
  NavLink,
  Redirect,
} from "react-router-dom";
import {Input} from "./../Input/Input";
import "./form.scss";

interface CompProps extends RouteComponentProps {
  isRegister: boolean;
  clClassF: string;
  seClass: string;
}
interface Login {
  state: boolean;
  path: string;
}

export const FormComp: React.FC<CompProps> = ({
  isRegister,
  clClassF,
  seClass,
  match,
  location,
}): JSX.Element => {
  const [error, setError] = useState<string>("");
  const [loggedIn, setLogin] = useState<Login>({
    state: false,
    path: "",
  });
  const usernameRef = useRef<HTMLInputElement | null>(
    null
  );
  const passwordRef = useRef<HTMLInputElement | null>(
    null
  );
  const confirmPasswordRef = useRef<HTMLInputElement | null>(
    null
  );

  function submitMe(e: React.FormEvent): void {
    e.preventDefault();
    if (isRegister) {
      console.log("NOT HERE");
      const passwordVerified = checkPattern(
        passwordRef.current!.value
      );
      const passwordConfirmVerified = checkPattern(
        confirmPasswordRef.current!.value
      );

      if (
        passwordVerified &&
        passwordConfirmVerified
      ) {
        console.log("ok");
        const isUser = userExists(
          usernameRef.current!.value
        );

        if (isUser) {
          setError(
            () => "Username is already taken"
          );
          resetFields(true);
        } else {
          window.sessionStorage.setItem(
            String(usernameRef.current!.value),
            String(passwordRef.current!.value)
          );
          resetFields(true);
          setLogin(() => ({
            state: true,
            path: "/logon",
          }));
          return;
        }
        console.log(isUser, "isUser");
        return;
      } else {
        console.log("not here");
        setError(
          () => "Please check your fields"
        );
        resetFields(true);
        return;
      }
    } else {
      const isUser = userExists(
        usernameRef.current!.value
      );
      if (isUser) {
        const userPass = window.sessionStorage.getItem(
          isUser
        );
        console.log(
          userPass === passwordRef.current!.value
        );
        if (
          userPass === passwordRef.current!.value
        ) {
          console.log("login");
          setLogin(() => ({
            state: true,
            path: `/content/${
              usernameRef.current!.value
            }`,
          }));
          resetFields(false);
          return;
        }
      } else {
        setError(
          () => "One of the fields is incorrect"
        );
        resetFields(false);
      }
    }
  }
  function checkPattern(str: string): string {
    // eslint-disable-next-line
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[^!@#\$%\^&\*](?=.{7,})/gm.test(
      str
    );
    console.log(isValid);
    return isValid ? str : "";
  }

  function userExists(str: string): string {
    return Object.keys(window.sessionStorage)
      .filter((el) => el === str)
      .join(" ");
  }
  function resetFields(needed: boolean): void {
    usernameRef.current!.value = "";
    passwordRef.current!.value = "";
    if (needed) {
      confirmPasswordRef.current!.value = "";
    }
  }
  return (
    <section className={seClass}>
      {console.log(match, location)}
      <form
        className={clClassF}
        onSubmit={submitMe}>
        <p>{error}</p>
        <Input
          laClass="form_label"
          clClass="form_username"
          spClass="form_span"
          placeholder="Username"
          erClass="form_error"
          type="text"
          laMerge="form_merge"
          hasLock={false}
          r={usernameRef}
          pass={false}
          length={5}
        />
        <Input
          laClass="form_label"
          clClass="form_password"
          spClass="form_span"
          placeholder="Password"
          erClass="form_error"
          type="password"
          laMerge="form_merge"
          clLock="form_lock"
          hasLock={true}
          r={passwordRef}
          pass={true}
          error={error}
          length={8}
        />
        {isRegister ? (
          <Input
            laClass="form_label"
            clClass="form_password"
            spClass="form_span"
            placeholder="Confirm Password"
            erClass="form_error"
            type="password"
            laMerge="form_merge"
            clLock="form_lock"
            hasLock={true}
            r={confirmPasswordRef}
            pass={true}
            error={error}
            length={8}
          />
        ) : undefined}
        <input
          className="form_submit ripple"
          value="SUBMIT"
          type="submit"
        />

        <NavLink
          className="form_navlink"
          to={isRegister ? "/logon" : "/"}>
          {isRegister
            ? `I have allready an account`
            : `I want to sign up`}
        </NavLink>
      </form>
      {loggedIn.state ? (
        <Redirect
          to={{
            pathname: loggedIn.path,
            state: {logedIn: true},
          }}
        />
      ) : undefined}
    </section>
  );
};
