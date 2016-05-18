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

const CmdItem = component('CmdItem', function (interactions, props) {
    const cOutput$ = props.get('cOutput');
    const cList$ = props.get('cList');

    const vtree$ = props
        .combineLatest(cOutput$,
                       cList$,
                       function (cmd, cOutput, cList) {
                           /* console.log('cmd cmdItem', cmd)*/
                           return <div>
                           <div className='prompt'>{`$ ${cList}`}</div>
                           <div className="output">{cOutput}</div>
                           </div>
                       });
    return {
        view: vtree$
    }
});

const CommandOutput = component('CommandOutput', function (interactions, props) {
    const vtree$ = props.get('output').map(output => {
        return <div>
        {output.map((item, i) =>
            <CmdItem key={i} cList={item.get('cmdList')} cOutput={item.get('cmdOutput')} />
        ).toArray()}
        </div>
    });
    return {
        view: vtree$
    }
});

export default function view(cl$, interactions) {
    return cl$.map(cl =>
         <div>
            {console.log("cl all: ", cl)}
        <div>
        <CommandOutput output={cl.output}/>
        </div>
            <Prompt putCmd={cl.input}
              onInputKeyUp={interactions.listener('onInputKeyUp')}
              onInputChange={interactions.listener('onInputChange')}
              onInputSubmit={interactions.listener('onInputSubmit')}
            />
         </div>
    );
}
