/**
 * change from https://github.com/vuejs/vue/blob/dev/src/shared/util.js
 */

export function isObj(v: any): boolean {
  return v !== null && typeof v === 'object';
}

export function isUndef(v: any): boolean {
  return v === undefined || v === null;
}

export function isDef(v: any): boolean {
  return v !== undefined && v !== null;
}

export function isPrimitive(value: any): boolean {
  const type = typeof value;
  return (
    type === 'string' ||
    type === 'number' ||
    type === 'symbol' ||
    type === 'boolean'
  );
}

const _hasOwn = Object.prototype.hasOwnProperty;
export function hasOwn(obj: any, key: string) {
  return _hasOwn.call(obj, key);
}

export function cached(fn: (arg: string) => any): (arg: string) => any {
  const map = Object.create(null);
  return function (arg: string) {
    const hit = map[arg];
    return hit || (map[arg] = fn(arg));
  };
}

const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cached((str: string) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

export function assign(to: object, from: object): any {
  for (const key in from) {
    to[key] = from[key];
  }
}
