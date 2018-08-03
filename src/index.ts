import Vue from 'vue';
import { resolveComponentOption } from './hepler';
import { IData, ITaga } from './interfaces';
import { renderComponet } from './render-component';
import { renderString } from './render-string';
import { isDef } from './utils';
export function renderToString(vm: Vue) {
  // tslint:disable-next-line:no-console
  const render = vm.$options.render;
  if (!render) {
    return '';
  }
  // const createStringWithCtx = createString.bind(vm);
  const createStringWithCtx = (a, b, c) => createString(vm, a, b, c);
  return render.call(vm, createStringWithCtx);
}

function createString(context: Vue, tag: ITaga, data?: IData, children?: string[]) {
  if (Array.isArray(data)) {
    children = data as any;
  }

  // 动态组件
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    return '';
  }
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] as any };
    children.length = 0;
  }

  if (typeof tag === 'string') {
    if (Vue.config.isReservedTag(tag)) {
      return renderString.call(context, tag, data, children);
    } else {
      let ctor;
      if (isDef(ctor = resolveComponentOption(context.$options, tag))) {
        const vm = renderComponet(context, ctor, data, children);
        return renderToString(vm);
      }
    }

  } else {
    const vm = renderComponet(context, tag as any, data, children);
    return renderToString(vm);
  }
}

export default renderToString;
