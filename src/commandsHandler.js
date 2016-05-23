import {Map} from 'immutable';
//TODO clear command window.scrollBy(x, y)

export const history = (out, inp) => out.withMutations(m => {
    const commands = out.get('output')
                        .takeLast(16)
                        .reduce((agg, inp, i) => {
                            agg.push(` ${i + 1} ${inp.get('cmdList')}`);
                            return agg; }, []);

    m.update('output', output => output.push(Map({
        cmdList: inp,
        cmdOutput: commands
    })));
    m.set('input', '');
});

export const reset = (out) => out.withMutations(m => {
    //TODO : also delete localStorage window.localStorage.clear() || removeItem
    m.update('output', output => output.clear().toList());
    m.set('input', '');
});

export const cv = (out, inp) => {
    window.open('http://registry.jsonresume.org/nicholasglazer', '_blank');
    return out.withMutations(m => {
        m.update('output', output => output.push(Map({
            cmdList: inp,
            cmdOutput: 'cv opened in a new window'
        })));
        m.set('input', '');
    });
}


export const cvjson = (out, inp) => {
    window.open('https://github.com/NicholasGlazer/nicholasGlazer.github.io/blob/master/src/resume.json', '_blank');
    return out.withMutations(m => {
        m.update('output', output => output.push(Map({
            cmdList: inp,
            cmdOutput: 'cv in json format opened in a new window'
        })));
        m.set('input', '');
    });
}

export const quit = (out, inp) => {
    window.open('https://github.com/NicholasGlazer/nicholasGlazer.github.io', '_parent');
    return out.withMutations(m => {
        m.update('output', output => output.push(Map({
            cmdList: inp,
            cmdOutput: 'bye =('
        })));
        m.set('input', '');
    });

}

export const help = (out, inp) => out.withMutations(m => {
    m.update('output', output => output.push(Map({
        cmdList: inp,
        cmdOutput: [`help    - information about commands`,
             `quit    - redirect to source code`,
             `q       - quit alias`,
             'reset   - reset output state (will clean terminal output)',
             'history - show command history',
             'cv - curriculum vitae',
             'cv --json - curriculum vitae in json format']
    })));
    m.set('input', '');
});

export const unexisting = (out, inp) => out.withMutations(m => {
    m.update('output', output => output.push(Map({
        cmdList: inp,
        cmdOutput: `bsh: command not found: ${inp}`
    })));
    m.set('input', '');
});
