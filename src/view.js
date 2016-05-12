import rx, {Observable} from 'rx';
import React from 'react';
import {component} from 'cycle-react';

const Prompt = component('Prompt', function (interactions, props) {
    const onInputSubmit = interactions.get('onSubmit')
                                      .do(ev => ev.preventDefault())
                                      .map(ev => ev.target.elements.cmdline.value);
    const onInputKeyUp = interactions.get('onKeyUp');
    const onInputChange = interactions.get('onChange');

    return {
        view: props.get('putCmd').map(input =>
            <form className="cmd-form"
              onSubmit={interactions.listener('onSubmit')}>
              <span className="prompt" >$ </span>
              <input className="cmd-input"
                type="text"
                onKeyUp={interactions.listener('onKeyUp')}
                onChange={interactions.listener('onChange')}
                value={input}
                autoFocus={true}
                name="cmdline" />
            </form>
        ),
        events: {
            onInputSubmit,
            onInputKeyUp,
            onInputChange
        }
    }
});

const CommandOutput = component('CommandOutput', function (interactions, props) {
    const vtree$ = props.get('output').map(item => {
        const style={
            color: 'red',
            fontSize: '20px'
        }
        return <li style={style}>{item}</li>
    });
    return {
        view: vtree$
    };
});

export default function view(cl$, interactions) {
    return cl$.map(cl =>
         <div>
            {console.log("cl all: ",cl)}
            {console.log('cl cmdList: ', cl.cmdList)}
            <CommandOutput output={cl.output}/>
            <Prompt putCmd={cl.input}
              onInputKeyUp={interactions.listener('onInputKeyUp')}
              onInputChange={interactions.listener('onInputChange')}
              onInputSubmit={interactions.listener('onInputSubmit')}
            />
         </div>
    );
}
