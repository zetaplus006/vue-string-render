import test from 'ava';
import Vue from 'vue';
import { renderToString } from '../../lib/vue-string-render.esm';


test('test1', t => {
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

  const vm = new Child();
  const str = renderToString(vm)
  t.deepEqual(str, '<input value="test"></input>')
});

test('test2', t => {
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

test('test2', t => {
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
      return <div><c></c></div>
    },
    components: {
      c: Child
    }
  });
  const str = renderToString(vm)
  t.deepEqual(str, '<div><input value="test"></input></div>')
});
