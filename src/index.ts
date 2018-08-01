import Vue from 'vue';
import { IData, ITaga } from './interfaces';
// import { renderComponet } from './render-component';
import { renderString } from './render-string';

export function renderToString(vm: Vue) {
  const render = vm.$options.render;
  if (!render) {
    return '';
  }
  const createStringWithCtx = createString.bind(vm);
  return render.call(vm, createStringWithCtx);
}

export function createString(tag: ITaga, data?: IData, children?: string[]) {
  if (typeof tag === 'object') {
    // tslint:disable-next-line:no-console
    console.log(arguments);
  }

  if (Array.isArray(data)) {
    children = data as any;
  }
  if (typeof tag === 'string') {
    return renderString.call(this, tag, data, children);
  } else if (typeof tag === 'function') {
    // return renderComponet(tag, data, children, this);
    const vm = new (tag as any)({});
    const render = vm.$options.render;
    if (!render) {
      return '';
    }
    const createStringWithCtx = createString.bind(vm);
    return render.call(vm, createStringWithCtx);
  }
}
