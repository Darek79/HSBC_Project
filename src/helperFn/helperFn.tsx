import axios, {AxiosResponse} from "axios";
import {v4} from "uuid";
export const fetchFiles = async (
  url: string,
  fnSet: (arg: () => any[]) => void,
  fnErr: (arg: () => string) => void
) => {
  try {
    const {data} = await axios.get(url);
    fnSet(() => [data]);
  } catch (error) {
    if (error) console.log(error);
    fnErr(() => error.message);
  }
};
export function randomNr(): number {
  return Math.floor(Math.random() * 29 + 1);
}
interface Data {
  data: {
    userId: string;
    id: number;
    title: string;
    body: string;
    key: string;
  };
}

export function fetchLimit(
  limit: number,
  n: number,
  fnSet: React.Dispatch<
    React.SetStateAction<any[]>
  >,
  fnError: React.Dispatch<
    React.SetStateAction<string>
  >,
  fnNumber: () => number,
  names: string[]
) {
  let clear: number;
  if (n === limit) {
    return;
  } else {
    const prom: Promise<Data> = new Promise(
      (res, rej) => {
        clear = window.setTimeout(() => {
          try {
            const data: Promise<
              AxiosResponse<any>
            > = axios.get(
              `https://jsonplaceholder.typicode.com/posts/${n}`
            );

            res(data);
          } catch (error) {
            rej(error.message);
          }
        }, 2000);
      }
    );
    prom
      .then(({data}) => {
        const nr = fnNumber();
        data.userId = names[nr];
        data.key = v4();
        fnSet((p) => [data, ...p]);
        clearTimeout(clear);
      })
      .catch((error) => {
        fnError(() => error.message);
        return false;
      })
      .then((d) => {
        if (d || d === undefined) {
          fetchLimit(
            limit,
            n + 1,
            fnSet,
            fnError,
            fnNumber,
            names
          );
        }
      });
  }
}
export const names = [
  "Maksym",
  "Walery",
  "Ryszard",
  "Chryseis",
  "Linos",
  "Eos",
  "Olga",
  "Alexander",
  "Łucja",
  "Ewa",
  "Andromeda",
  "Antoni",
  "Jurek",
  "Aleksander",
  "Ikaros",
  "Kepheus",
  "Oliwer",
  "Zachariasz",
  "Ikaros",
  "Eunika",
  "Afrodite",
  "Kasia",
  "Marzena",
  "Klementyna",
  "Halina",
  "Sandra",
  "Calliope",
  "Marysia",
  "Elektra",
  "Iwo",
];
