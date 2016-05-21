import {Observable}  from 'rx';
import {Map, fromJS} from 'immutable';

export default function state() {
    const storedData = JSON.parse(localStorage.getItem('itemKey'))
    const initialData = fromJS({
        input: '',
        output: storedData || []
    });
    return Observable.just(initialData);
}

