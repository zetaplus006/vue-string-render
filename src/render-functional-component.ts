import Vue from 'vue';
import { IData, IFunctionalContext, VueCtor } from './interfaces';
import { camelize, hasOwn, isDef, isTrue } from './utils';

export function FunctionalRenderContext(
    data: IData,
    props: any,
    children: string[] | undefined,
    parent: Vue,
    Ctor: VueCtor
) {
    // const options = Ctor.options;
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    let contextVm;
    if (hasOwn(parent, '_uid')) {
        contextVm = Object.create(parent);
        // $flow-disable-line
        contextVm._original = parent;
    } else {
        // the context vm passed in is a functional context as well.
        // in this case we want to make sure we are able to get a hold to the
        // real context instance.
        contextVm = parent;
        parent = (parent as any)._original;
    }

    this.data = data;
    this.props = props;
    this.children = children;
    this.parent = parent;
    this.listeners = {};
    // todo
    // this.injections = resolveInject(options.inject, parent);
    // this.slots = () => resolveSlots(children, parent);
}

export function createFunctionalComponent(
    Ctor: VueCtor,
    propsData: any,
    data: IData,
    contextVm: Vue,
    children?: string[]
): IFunctionalContext {
    const options = Ctor.options;
    const props = {};
    const propOptions = options.props;
    if (propOptions) {
        // tslint:disable-next-line:no-console
        console.warn('not support propsOptions in functional component');
    }
    // if (isDef(propOptions)) {
    //     for (const key in propOptions) {
    //         props[key] = validateProp(key, propOptions, propsData || {});
    //     }
    // } else {
    //     if (isDef(data.attrs)) mergeProps(props, data.attrs);
    //     if (isDef(data.props)) mergeProps(props, data.props);
    // }
    if (isDef(data.attrs)) mergeProps(props, data.attrs);
    if (isDef(data.props)) mergeProps(props, data.props);

    const renderContext = new FunctionalRenderContext(
        data,
        props,
        children,
        contextVm,
        Ctor
    );
    return {
        __isFunctional: true,
        renderContext,
        options
    } as any;
}

function mergeProps(to, from) {
    for (const key in from) {
        to[camelize(key)] = from[key];
    }
}
