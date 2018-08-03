/**
 * change from https://github.com/vuejs/vue/blob/dev/src/core/vdom/helpers/extract-props.js
 */

import { IData, VueCtor } from './interfaces';
import { hasOwn, hyphenate, isDef, isUndef } from './utils';

export function extractProps(ctor: VueCtor, data: IData) {
  const propOptions = ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  const res = {};
  const { attrs, props } = data;
  if (isDef(attrs) || isDef(props)) {
    for (const key in propOptions) {
      const altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        const keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          // tslint:disable-next-line:no-console
          console.warn(
            `Prop "${keyInLowerCase}" is passed to component ` +
            `, but the declared prop name is` +
            ` "${key}". ` +
            `Note that HTML attributes are case-insensitive and camelCased ` +
            `props need to use their kebab-case equivalents when using in-DOM ` +
            `templates. You should probably use "${altKey}" instead of "${key}".`
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
        checkProp(res, attrs, key, altKey, false);
    }
  }
  data.props = res;
}

function checkProp(
  res: any,
  hash: any,
  key: string,
  altKey: string,
  preserve: boolean
): boolean {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}
