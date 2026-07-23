import { nanoid } from 'nanoid';

export function generateShortCode(length: number) {
    return nanoid(length);
}
