interface ButtonProps {
  txt: string;
  cn: string;
  fnClick: () => void;
  disabled: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  txt,
  cn,
  fnClick,
  disabled,
}) => (
  <button
    className={cn}
    onClick={fnClick}
    disabled={disabled}>
    {txt}
  </button>
);
