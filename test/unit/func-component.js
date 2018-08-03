/* import test from 'ava';
import Vue from 'vue';
import { renderToString } from '../../lib/vue-string-render.esm';

test('pure', t => {

    const Child = {
        functional: true,
        render () {
            return <input value={this.value}></input>
        }
    }


    const vm = new Vue({
        render () {
            return <div><Child value={'test'}></Child></div>;
        }
    });
    const str = renderToString(vm)
    t.deepEqual(str, '<div><input value="test"></input></div>')
}); */

