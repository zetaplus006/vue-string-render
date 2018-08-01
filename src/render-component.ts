import Vue from 'vue';
import { IData } from './interfaces';
import { renderString } from './render-string';

export function renderComponet(tag: object, data: IData, children: string[], parent: Vue) {
  const vm = new Vue(tag);
  
}
