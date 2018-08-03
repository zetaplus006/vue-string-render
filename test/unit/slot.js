import test from 'ava';
import Vue from 'vue';
import { renderToString } from '../../lib/vue-string-render.esm';


test('solt', t => {
  const Parent = Vue.extend({
    render () {
      return <div>{this.$slots.default}</div>
    }
  })

  const vm = new Vue({
    render () {
      return <Parent><span>test</span></Parent>
    }
  });
  const str = renderToString(vm)
  t.deepEqual(str, '<div><span>test</span></div>')
});