import {Observable}  from 'rx';
import {Map, fromJS} from 'immutable';

export default function state() {
    const initialData = fromJS({
        input: '',
        output: '',
        cmdList: [],
        filterFn: () => true //allow anything
    });
    return Observable.just(initialData);
}

