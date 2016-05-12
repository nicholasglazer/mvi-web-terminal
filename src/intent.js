import rx from 'rx';
import cycle from 'cycle-react';

export default function intent(interactions) {
    const ESC_KEY = 27;
    const ENTER_KEY = 13;

    return {
        clearInput$: interactions.get('onInputKeyUp')
                                 .filter(ev => ev.keyCode === ESC_KEY),
        changeInput$: interactions.get('onInputChange')
                                  .map(ev => ev.target.value),
        submitInput$: interactions.get('onInputSubmit')
                                .map(value => String(value).trim())
                                .filter(value => value !== '')
    };
};
