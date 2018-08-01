import test from 'ava';
import Vue from 'vue';
import { renderToString } from '../../lib/vue-string-render.esm';


test('test1', t => {
  const Child = Vue.extend({
    render() {
      return <input value="test"></input>
    }
  })

  const vm = new Vue({
    render() {
      return <div><Child></Child></div>
    }
  });
  const str = renderToString(vm)
  t.deepEqual(str, '<div><input value="test"></input></div>')
});