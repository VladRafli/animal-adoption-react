import { atom } from 'jotai'

const userIdAtom = atom<string>('');
const userAtom = atom<any>({});

export { userIdAtom, userAtom }