import Vue from 'vue';
import { IData, ITaga } from './interfaces';
import { renderString } from './renderString';

export function renderToString(vm: Vue) {
  const render = vm.$options.render;
  if (!render) {
    return '';
  }
  const createStringWithCtx = createString.bind(vm);
  return render.call(vm, createStringWithCtx);
}

export function createString(tag: ITaga, data?: IData, children?: string[]) {
  if (Array.isArray(data)) {
    children = data as any;
  }
  if (typeof tag === 'string') {
    return renderString(tag, data, children);
  }
}
