import test from 'ava';
import Vue from 'vue';
import { renderToString } from '../../lib/vue-string-render.esm';

test('pure', t => {
  const vm = new Vue({
    render() {
      return <div>test</div>;
    }
  });
  const str = renderToString(vm)
  t.deepEqual(str, '<div>test</div>')
});

test('class', t => {
  const vm = new Vue({
    data() {
      return {
        a: true,
        b: false
      }
    },
    render() {
      return <div class={['class1', { 'a': this.a, 'b': this.b }]}>test</div>;
    }
  });
  const str = renderToString(vm)
  t.deepEqual(str, '<div class="class1 a">test</div>')
});