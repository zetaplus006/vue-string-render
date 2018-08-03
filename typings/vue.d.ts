import {VueConstructor} from 'vue'
import Vue from 'vue';

declare module "vue/types/vue"{
    interface VueConstructor<V extends Vue = Vue> {
        util:{
            warn(smg:string,vm:Vue):void,
            extend(VueConstructor):void,
            mergeOptions(parent:any,child:any,vm?:Vue):any,
            defineReactive:any
        }

    }

    interface VueConfiguration{
        isReservedTag:(key:string)=>boolean
    }
}