import React              from 'react';
import ReactDOM, {render} from 'react-dom';
import {component}        from 'cycle-react';
import view               from './view';
import state              from './state';
import model              from './model';
import intent             from './intent';
/* import localStorageSink   from './local-storage-sink';*/

function localStorageSink(data) {
    console.log('localStorageSink', data.output)
    let list = data.output.toJS();
    localStorage.setItem('itemKey', JSON.stringify(list));
}

/* const Root = component(
 *     'Root',
 *     (interactions) => view(
 *         model(intent(interactions), state()).subscribe(localStorageSink), interactions
 *     )
 * );
 * */
let Root = component('Root', function computer(interactions) {
    let cmd$ = model(intent(interactions), state());
    cmd$.subscribe(localStorageSink);
    return view(cmd$, interactions);
});

ReactDOM.render(
    <Root />,
    document.querySelector('#app')
);
