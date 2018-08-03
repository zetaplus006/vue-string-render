import Vue, { ComponentOptions, VueConstructor } from 'vue';
export type IFn = (...args: any[]) => any;

export type IPureComponent = (props: any) => string;

export type ITaga = string | object | IFn;

export type IClassData = Array<string | { [key: string]: boolean }> | { [key: string]: boolean };

export type IStyleData = Array<{ [key: string]: string }> | { [key: string]: string };

export interface IData {

  class?: IClassData;

  // todo:添加浏览器引擎前缀
  style?: IStyleData;

  /**
   * 正常的 HTML 特性
   */
  attrs?: {
    [key: string]: string
  };

  /**
   * 组件 props(jsx里拿不到，需要先从attrs中取出)
   */
  props?: {
    [key: string]: any
  };

  scopedSlots?: {
    defalut?: IPureComponent | string[],
    [key: string]: IPureComponent | string[]
  };

  slot?: string;

  is?: any;

  model?: { value: any };

  // 下面的属性暂时应该不用管

  /**
   *  DOM 属性
   */
  domProps?: {
    [key: string]: any
  };

  key?: string;

  ref?: string;

  directives?: any[];

  on?: any;

  nativeOn?: any;

}

export type VueCtor = VueConstructor & { options: ComponentOptions<Vue> };

export interface IFunctionalContext {
  props: { [key: string]: any };

  children: string[];

  slots(): { [key: string]: any };

  data: IData;

  parent: Vue;

  listeners: {};

  injections: { [key: string]: any };
}
