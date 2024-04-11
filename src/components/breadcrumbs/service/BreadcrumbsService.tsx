import { BehaviorSubject } from 'rxjs';

const namingSubject = new BehaviorSubject<Record<string, string>>({});
const ignoreSubject = new BehaviorSubject<string[]>([]);

export const BreadcrumbsService = {
  dictionaryMapping$: namingSubject,
  ignoringMapping$: ignoreSubject,
  setNameForPath(path: string, displayValue: string) {
    const map = namingSubject.getValue();
    namingSubject.next({
      ...map,
      [path]: displayValue,
    });
  },
  setIgnorePath(path: string) {
    ignoreSubject.next([...ignoreSubject.getValue(), path]);
  },
  initNaming(dictionary: Record<string, string>) {
    namingSubject.next({ ...namingSubject.getValue(), ...dictionary });
  },
  initIgnoring(ignoredSubpaths: string[]) {
    ignoreSubject.next([...ignoreSubject.getValue(), ...ignoredSubpaths]);
  },
};
