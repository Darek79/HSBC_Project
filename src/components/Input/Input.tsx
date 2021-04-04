import React, {
  useState,
  useRef,
  useEffect,
  RefObject,
} from "react";
import lockOpen from "./../../assets/Lockopen.svg";
import lockClosed from "./../../assets/Lockclosed.svg";
interface CompProps {
  clClass: string;
  laClass: string;
  spClass: string;
  placeholder: string;
  erClass: string;
  type: string;
  laMerge: string;
  clLock?: string;
  hasLock: boolean;
  r: RefObject<HTMLInputElement>;
  pass: boolean;
  error?: string;
}
interface inputEvent {
  target: HTMLInputElement;
}
export const Input: React.FC<CompProps> = ({
  clClass,
  laClass,
  erClass,
  spClass,
  laMerge,
  clLock,
  placeholder,
  type,
  hasLock,
  pass,
  error,
  r,
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(
    false
  );
  function showPass(): void {
    setOpen((p) => !p);
  }
  return (
    <label className={laClass}>
      <span className={`${spClass} ${laMerge}`}>
        {placeholder}
      </span>
      <input
        ref={r}
        className={`${clClass} ${laMerge}`}
        type={!open ? type : "text"}
        minLength={pass ? 8 : undefined}
        required={true}
      />

      <span className={`${erClass} ${laMerge}`}>
        {""}
      </span>
      {hasLock ? (
        <img
          src={!open ? lockClosed : lockOpen}
          className={clLock}
          onClick={showPass}
        />
      ) : undefined}
    </label>
  );
};
