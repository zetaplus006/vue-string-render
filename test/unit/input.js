import test from 'ava';
import Vue from 'vue';
import { renderToString } from '../../lib/vue-string-render.esm';


test('input', t => {
  const Child = Vue.extend({
    data () {
      return {
        value: 'test'
      }
    },
    render () {
      return <input value={this.value}></input>
    }
  })

  const vm = new Vue({
    render () {
      return <div><Child></Child></div>
    }
  });
  const str = renderToString(vm)
  t.deepEqual(str, '<div><input value="test"></input></div>')
});

test('input2', t => {
  const Child = Vue.extend({
    render () {
      return <input value="test"></input>
    }
  })

  const vm = new Vue({
    render () {
      return <div><Child></Child></div>
    }
  });
  const str = renderToString(vm)
  t.deepEqual(str, '<div><input value="test"></input></div>')
});

test('v-model', t => {
  const Child = Vue.extend({
    data () {
      return {
        value: 'test'
      }
    },
    render () {
      return <input v-model={this.value}></input>
    }
  })

  const vm = new Vue({
    render () {
      return <div><Child></Child></div>
    }
  });
  const str = renderToString(vm)
  t.deepEqual(str, '<div><input value="test"></input></div>')
});