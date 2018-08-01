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

test('pure child', t => {
  const vm = new Vue({
    render() {
      return <div>
        inner
        <div>
          <span>test</span>
        </div>
      </div>;
    }
  });
  const str = renderToString(vm)
  t.deepEqual(str, '<div>inner<div><span>test</span></div></div>')
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

test('style', t => {
  const vm = new Vue({
    computed: {
      style() {
        return {
          fontSize: '14px',
          color: '#3cbaff'
        }
      }
    },
    render() {
      return <div style={this.style}>test</div>;
    }
  });
  const str = renderToString(vm)
  t.deepEqual(str, '<div style="color:#3cbaff;font-size:14px;">test</div>')
});

test('attr', t => {
  const vm = new Vue({
    render() {
      return <input value="test" disabled="false"></input>;
    }
  });
  const str = renderToString(vm)
  t.deepEqual(str, '<input disabled="false" value="test"></input>')
});

test('attr', t => {
  const vm = new Vue({
    props: {
      value: String,
      disabled: Boolean
    },
    render() {
      return <input value="test" disabled="false"></input>;
    }
  });
  const str = renderToString(vm)
  t.deepEqual(str, '<input disabled="false" value="test"></input>')
});


