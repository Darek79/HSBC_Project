import {useEffect, useState, useRef} from "react";
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
    setError(() => "");

    if (isRegister) {
      const passwordVerified = checkPattern(
        passwordRef.current!.value
      );
      const passwordConfirmVerified = checkPattern(
        confirmPasswordRef.current!.value
      );

      console.log(
        passwordVerified,
        passwordConfirmVerified
      );

      if (
        passwordVerified &&
        passwordConfirmVerified &&
        passwordVerified ===
          passwordConfirmVerified
      ) {
        const isAvailable = userExists(
          usernameRef.current!.value
        );
        if (isAvailable) {
          window.sessionStorage.setItem(
            usernameRef.current!.value,
            passwordRef.current!.value
          );

          resetFields(true);
          setLogin(() => ({
            state: true,
            path: "/logon",
          }));
          return;
        } else {
          setError(
            () => "Username is already taken"
          );
          resetFields(true);
        }
      } else {
        setError(
          () => "Please check your fields"
        );
        resetFields(true);
      }
    } else {
      const user = window.sessionStorage.getItem(
        usernameRef.current!.value
      );
      if (user === null) {
        setError(() => "Please sign up first");
        resetFields(false);
        return;
      }
      const passwordVerified = checkPattern(
        passwordRef.current!.value
      );
      if (user === passwordVerified) {
        setLogin(() => ({
          state: true,
          path: `/content/${
            usernameRef.current!.value
          }`,
        }));
        resetFields(false);
        console.log("ok");
      } else {
        setError(
          () => "One of the fields is incorrect"
        );
        resetFields(false);
      }
    }
  }
  function checkPattern(str: string): string {
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[^!@#\$%\^&\*](?=.{7,})/gm.test(
      str
    );
    console.log(isValid);
    return isValid ? str : "";
  }

  function userExists(str: string): boolean {
    return window.sessionStorage.getItem(str) ===
      null
      ? true
      : false;
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
