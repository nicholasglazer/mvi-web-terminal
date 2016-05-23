import Rx, {Observable, Concat} from 'rx';
import cycle from 'cycle-react';
import {Map} from 'immutable';
import {history, author, quit, unexisting, reset, help, cv, cvjson} from './commandsHandler.js';

function modifications$(intent) {

    const clearInputMod$ = intent.clearInput$.map(() => (cmd) => cmd.remove('input'));

    const changeInputMod$ = intent.changeInput$.map((x) => (cmd) => cmd.set('input', x));

    const submitInputMod$ = intent.submitInput$.map((x) => (cmd) => {
        //TODO: rewrite this project with pure cyclejs
        //TODO: add local storage driver to project, to manipulate local storage
        //TODO: manipulate local storage to create file system

        function update() {
            switch (x) {
                case 'help': return help(cmd, x);
                case 'history': return history(cmd, x);
                case 'reset': return reset(cmd);
                case 'reset -a': return window.localStorage.removeItem('itemKey');
                case 'cv': return cv(cmd, x);
                case 'cv --json': return cvjson(cmd, x);
                case 'q':
                case 'quit': return quit(cmd, x);
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
