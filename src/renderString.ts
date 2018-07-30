import { IClassData, IData } from './interfaces';
import { isObj } from './utils';

export function renderString(tag: string, data: IData, childrens?: string[]): string {
  // tslint:disable-next-line:no-console
  // console.log('--data--:', data);
  const str = [
    `<${tag}${getClassesString(data.class)}>`,
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
  } else if (isObj(classData)) {
    classList = getClassFromObj(classData);
  } else {
    classList.push(classData);
  }
  return ' class="' + classList.join(' ') + '"';
}

export function getClassFromObj(obj) {
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
