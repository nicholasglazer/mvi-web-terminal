import rx from 'rx';
import cycle from 'cycle-react';

export default function intent(interactions) {
    const ESC_KEY = 27;
    const ENTER_KEY = 13;
    const TAB_KEY = 14;

    return {
        tabPressed$: interactions.get('tabPressed')
                                 .filter(ev => ev.keyCode === TAB_KEY),
        clearInput$: interactions.get('onInputKeyUp')
                                 .filter(ev => ev.keyCode === ESC_KEY),
        changeInput$: interactions.get('onInputChange')
                                  .map(ev => ev.target.value),
        submitInput$: interactions.get('onInputSubmit')
                                .map(value => String(value).trim())
                                .filter(value => value !== '')
    };
};
