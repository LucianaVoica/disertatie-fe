import { Observable } from 'rxjs';
import { useEffect, useState } from 'react';

export const useObservable = <T>(observable: Observable<T>): T | undefined => {
  const [state, setState] = useState<T | undefined>();
  useEffect(() => {
    const subscription = observable.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [observable]);
  return state;
};
