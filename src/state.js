import {Observable}  from 'rx';
import {Map, fromJS} from 'immutable';

export default function state() {
    const initialData = fromJS({
        input: '',
        output: []
    });
    return Observable.just(initialData);
}

