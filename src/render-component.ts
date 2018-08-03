import Vue from 'vue';
import { extractProps } from './extract-props';
import { resolveConstructorOptions, transformModel } from './hepler';
import { IData, VueCtor } from './interfaces';
// import { createFunctionalComponent } from './render-functional-component';
import { isDef, isObject, isTrue, isUndef } from './utils';
// import { renderString } from './render-string';

export function renderComponet(parent: Vue, Ctor: VueCtor, data: IData, children: string[]) {
  if (isUndef(Ctor)) {
    return;
  }
  const baseCtor = (parent.$options as any)._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      // tslint:disable-next-line:no-console
      console.warn(`Invalid Component definition: ${String(Ctor)}`, parent);
    }
    return;
  }

  data = data || {};

  // async component todo

  resolveConstructorOptions(Ctor);

  if (isDef(data.model)) {
    transformModel((Ctor as any).options, data);
  }

  extractProps(Ctor, data);

  // functional component todo
  // if (isTrue((Ctor.options as any).functional)) {
  //   return createFunctionalComponent(Ctor, data.props, data, parent, children);
  // }

  if (isTrue((Ctor.options as any).abstract)) {
    const slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  // installComponentHooks(data)

  // to create component instance
  const vm = new Ctor({
    _isComponent: true,
    parent,
    propsData: data.props,
    _componentTag: (Ctor.options as any).tag,
    _parentVnode: { componentOptions: Ctor.options },
    _parentListeners: {},
    _renderChildren: children
  } as any);
  return vm;
}

function getFunctionComponentString(obj) {

}
