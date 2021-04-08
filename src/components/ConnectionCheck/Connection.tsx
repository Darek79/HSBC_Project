import {useState, useEffect} from "react";
import "./connection.scss";

export const ContentConnection = (): JSX.Element => {
  const [
    connected,
    setConnect,
  ] = useState<boolean>(true);

  function cb(): void {
    if (!window.navigator.onLine) {
      setConnect(() => false);
      console.log("disconnected");
      return;
    } else if (window.navigator.onLine) {
      console.log("connected");
      setConnect(() => true);
      return;
    }
  }

  useEffect(() => {
    const clear = setInterval(cb, 4000);
    return () => clearInterval(clear);
  }, []);

  return (
    <section
      className={
        connected
          ? "conn_wrapper_closed"
          : "conn_wrapper_open"
      }>
      {!connected ? (
        <div className="conn_error">
          INTERNET CONNECTION LOST
        </div>
      ) : undefined}
    </section>
  );
};
