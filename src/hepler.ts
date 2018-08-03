import Vue, { ComponentOptions } from 'vue';
import { IData } from './interfaces';
import { camelize, capitalize, extend, hasOwn } from './utils';

/**
 * 获取本组件内注册的
 */
export function resolveComponentOption (options: any, id: string): any {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
      return;
    }
    const assets = options['components'];
    // check local registration variations first
    if (hasOwn(assets, id)) return assets[id];
    const camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) return assets[camelizedId];
    const PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId];
    // fallback to prototype chain
    const res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if (process.env.NODE_ENV !== 'production' && !res) {
      // tslint:disable-next-line:no-console
      console.warn(
        'Failed to resolve component: ' + id,
        options
      );
    }
    return res;
  }

export function resolveConstructorOptions (Ctor: any) {
    let options = Ctor.options;
    if (Ctor.super) {
      const superOptions = resolveConstructorOptions(Ctor.super);
      const cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        // super option changed,
        // need to resolve new options.
        Ctor.superOptions = superOptions;
        // check if there are any late-modified/attached options (#4976)
        const modifiedOptions = resolveModifiedOptions(Ctor);
        // update base extend options
        if (modifiedOptions) {
          extend(Ctor.extendOptions, modifiedOptions);
        }
        options = Ctor.options = Vue.util.mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }
    return options;
  }

function resolveModifiedOptions (Ctor: any): object|void {
  let modified;
  const latest = Ctor.options;
  const extended = Ctor.extendOptions;
  const sealed = Ctor.sealedOptions;
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {};
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified;
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    const res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res;
  } else {
    return latest;
  }
}

export function transformModel (options: ComponentOptions<any>, data: IData) {
  const prop = (options.model && options.model.prop) || 'value';
  // const event = (options.model && options.model.event) || 'input'
  // tslint:disable-next-line:align
   (data.props || (data.props = {}))[prop] = data.model.value;
 /*  const on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  } */
}
