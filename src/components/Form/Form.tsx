import {useEffect, useState, useRef} from "react";
import {
  NavLink,
  Redirect,
} from "react-router-dom";
import {Input} from "./../Input/Input";
import "./form.scss";

interface CompProps {
  isRegister: boolean;
  clClassF: string;
  seClass: string;
}

export const FormComp: React.FC<CompProps> = ({
  isRegister,
  clClassF,
  seClass,
}): JSX.Element => {
  const [error, setError] = useState<string>("");
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

    console.log(usernameRef.current!.value);
    const passwordVerified = checkPattern(
      passwordRef.current!.value
    );
    if (isRegister) {
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
        window.sessionStorage.setItem(
          `User${Date.now()}`,
          JSON.stringify({
            username: usernameRef.current!.value,
            password: passwordRef.current!.value,
          })
        );
        usernameRef.current!.value = "";
        passwordRef.current!.value = "";
        confirmPasswordRef.current!.value = "";
        return;
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

  function userExists(): boolean {
    
  }
  return (
    <section className={seClass}>
      <form
        className={clClassF}
        onSubmit={submitMe}>
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
          />
        ) : undefined}
        <input value="submit" type="submit" />
        <NavLink
          className="form_navlink"
          to="/logon">
          I have allready an account
        </NavLink>
      </form>
    </section>
  );
};
