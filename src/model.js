import Rx, {Observable, Concat} from 'rx';
import cycle from 'cycle-react';
import {Map} from 'immutable';

function modifications$(intent) {

    const changeInputMod$ = intent.changeInput$.map((x) => (cmd) => {
        return cmd.set('input', x);
    });


    const clearInputMod$ = intent.clearInput$.map(() => (cmd) => {
        return cmd.set('input', '');
    });

    const submitInputMod$ = intent.submitInput$.map((x) => (cmd) => {
        function update() {
            console.log('cmd', cmd);
            switch (x) {
                case 'hello': return cmd.withMutations(m => {
                    m.update('cmdList', (list) => list.push(x));
                    m.set('output', 'world');
                    m.set('input', '');
                });
                default: return cmd.withMutations(m => {
                    m.set('output', `bsh: command not found: ${x} `);
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
