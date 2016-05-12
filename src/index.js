import React              from 'react';
import ReactDOM, {render} from 'react-dom';
import {component}        from 'cycle-react';
import view               from './view';
import state              from './state';
import model              from './model';
import intent             from './intent';

const Root = component(
    'Root',
    (interactions) => view(model(intent(interactions), state()), interactions)
);

ReactDOM.render(
    <Root />,
    document.querySelector('#app')
);
