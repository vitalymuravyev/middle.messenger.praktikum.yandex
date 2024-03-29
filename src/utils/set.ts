import { merge } from './merge';

type Indexed<T = any> = {
  [key in string]: T;
};

export function set(
  object: Indexed | unknown,
  path: string,
  value: any,
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (path === 'localChat' && value.type !== 'message') {
    (object as any).localChat = {};
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);

  return merge(object as Indexed, result);
}
