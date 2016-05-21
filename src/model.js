import Rx, {Observable, Concat} from 'rx';
import cycle from 'cycle-react';
import {Map} from 'immutable';
import {history, author, quit, unexisting, reset} from './commandsHandler.js';

function modifications$(intent) {

    const clearInputMod$ = intent.clearInput$.map(() => (cmd) => cmd.remove('input'));

    const changeInputMod$ = intent.changeInput$.map((x) => (cmd) => cmd.set('input', x));

    const submitInputMod$ = intent.submitInput$.map((x) => (cmd) => {
        function update() {
            switch (x) {
                case 'history': return history(cmd, x);
                case 'reset': return reset(cmd);
                case 'reset -a': return window.localStorage.removeItem('itemKey');
                case 'author': return author();
                case 'q':
                case 'quit': return quit();
                default: return unexisting(cmd, x);
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
