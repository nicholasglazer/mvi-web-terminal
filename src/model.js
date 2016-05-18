import Rx, {Observable, Concat} from 'rx';
import commandsArr from './commandsHandler.js';
import cycle from 'cycle-react';
import {Map} from 'immutable';

function modifications$(intent) {

    const clearInputMod$ = intent.clearInput$.map(() => (cmd) => cmd.remove('input'));

    const changeInputMod$ = intent.changeInput$.map((x) => (cmd) => cmd.set('input', x));

    const submitInputMod$ = intent.submitInput$.map((x) => (cmd) => {
        function update() {
            console.log('model-submitInputMod$-cmd', cmd);

            // TODO: create command handler
            // array of functions
            // commandsArr.map(x => console.log(x));

            switch (x) {
                case 'history': return cmd.update('output', output => {
                    console.log('history', output)
                    output.map(item => {
                        console.log('history2', item)
                        item.map(x => {
                            console.log('history3', x)
                        })
                    })
                });
                case 'clear': return cmd.withMutations(m => {
                    m.update('output', output => output.clear().toList());
                    m.set('input', '');
                });
                case 'hello': return cmd.withMutations(m => {
                    m.update('output', output => output.push(Map({
                        cmdList: x,
                        cmdOutput: 'WORLD!!!'
                    })));
                    m.set('input', '');
                });
                case 'author': return window.open('https://github.com/nicholasglazer', '_blank');
                case 'q':
                case 'quit': return window.open('https://github.com/NicholasGlazer/nicholasGlazer.github.io', '_parent');
                default: return cmd.withMutations(m => {
                    m.update('output', output => output.push(Map({
                        cmdList: x,
                        cmdOutput: `bsh: command not found: ${x}`
                    })));
                    m.set('input', '');
                });
            }
        }
        return update();
    });

    return Observable.merge(
        changeInputMod$,
        clearInputMod$,
        submitInputMod$
    );
}

export default function model(intent, state) {
    const mod$ = modifications$(intent);
    return state.concat(mod$)
           .scan((cmd, mod) => mod(cmd))
            .map(st => st.toObject());
}
