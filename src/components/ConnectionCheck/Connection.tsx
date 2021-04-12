import {useState, useEffect} from "react";
import "./connection.scss";

const iamConnected = (): boolean => {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.onLine === "boolean"
  );
};

export const ContentConnection = (): JSX.Element => {
  const [
    connected,
    setConnect,
  ] = useState<boolean>(iamConnected());

  const cbOnline = (): void => {
    let clear: number;
    const prom = new Promise(
      (resolve, reject) => {
        clear = window.setTimeout(() => {
          resolve(true);
        }, 1000);
      }
    );
    prom.then((d) => {
      setConnect(() => true);
      clearTimeout(clear);
      window.location.reload();
    });
  };

  const cbOffline = (): void =>
    setConnect(() => false);

  useEffect(() => {
    window.addEventListener("online", cbOnline);
    window.addEventListener("offline", cbOffline);

    return () => {
      window.removeEventListener(
        "online",
        cbOnline
      );
      window.removeEventListener(
        "offline",
        cbOffline
      );
    };
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
          <p>INTERNET CONNECTION LOST</p>
        </div>
      ) : undefined}
    </section>
  );
};
