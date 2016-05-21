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

export const unexisting = (out, inp) => out.withMutations(m => {
    m.update('output', output => output.push(Map({
        cmdList: inp,
        cmdOutput: `bsh: command not found: ${inp}`
    })));
    m.set('input', '');
});

export const author = () => window.open('https://github.com/nicholasglazer', '_blank');

export const quit = () => window.open('https://github.com/NicholasGlazer/nicholasGlazer.github.io', '_parent');
