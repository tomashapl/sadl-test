import { Observable } from "apollo-link";

const promiseToObservable = (promise) =>
  new Observable((subscriber: any) => {
    promise.then(
      (value) => {
        if (subscriber.closed) return;
        subscriber.next(value);
        subscriber.complete();
      },
      (err) => subscriber.error(err)
    );
    return subscriber; // this line can removed, as per next comment
  });

export default promiseToObservable;
