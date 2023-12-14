import { Observable } from "rxjs";

export const createHTTPObservable = <T>(url: string): Observable<T> => {
  return new Observable((subscriber) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        subscriber.next(data);
      })
      .catch((err) => subscriber.error(err))
      .finally(() => subscriber.complete());
  });
};
