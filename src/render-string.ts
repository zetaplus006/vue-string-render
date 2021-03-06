import { IClassData, IData, IStyleData } from './interfaces';
import { assign, hasOwn, hyphenate, isObject, isUndef } from './utils';

export function renderString(tag: string, data: IData, childrens?: string[]): string {
  // tslint:disable-next-line:no-console
  // console.log(data);
  const str = [
    // tslint:disable-next-line:max-line-length
    `<${tag}${getClassesString(data.class)}${getStyleString(data.style)}${getAttrsString(data.attrs)}${getInputValue(data)}>`,
    childrens && childrens.join('') || '',
    `</${tag}>`
  ].join('');
  return str;
}

export function getClassesString(classData: IClassData | undefined): string {
  if (!classData) {
    return '';
  }
  let classList = [];
  if (Array.isArray(classData)) {
    classList = classData.map(data => {
      if (typeof data === 'string') {
        return data;
      } else {
        return getClassFromObj(data).join(' ');
      }
    });
  } else if (isObject(classData)) {
    classList = getClassFromObj(classData);
  } else {
    classList.push(classData);
  }
  return ' class="' + classList.join(' ') + '"';
}

export function getClassFromObj(obj: object) {
  const keys = Object.keys(obj), classList = [];
  let len = keys.length, key;
  while (len--) {
    key = keys[len];
    if (obj[key]) {
      classList.push(key);
    }
  }
  return classList;
}

export function getStyleString(styleData: IStyleData | undefined): string {
  if (!styleData) return '';
  const map = Object.create(null);
  if (Array.isArray(styleData)) {
    styleData.forEach(item => assign(map, item));
  } else {
    assign(map, styleData);
  }
  const keys = Object.keys(map);
  let len = keys.length, key, styleStr = '';
  while (len--) {
    key = keys[len];
    styleStr += `${hyphenate(key)}:${map[key]};`;
  }
  return ` style="${styleStr}"`;
}

export function getAttrsString(attrs: { [key: string]: string } | undefined) {
  if (isUndef(attrs)) {
    return '';
  }
  const keys = Object.keys(attrs);
  let len = keys.length, key, attrsStr = '';
  while (len--) {
    key = keys[len];
    attrsStr += ` ${key}="${attrs[key]}"`;
  }
  return attrsStr;
}

/**
 * 适配v-model或value={xxxx}
 */
export function getInputValue(data: IData) {
  if (data.attrs && hasOwn(data.attrs, 'value')) return '';
  if (data.domProps && hasOwn(data.domProps, 'value')) {
    const value = data.domProps.value;
    return ` value="${value}"`;
  } else {
    return '';
  }
}
