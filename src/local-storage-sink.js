export default function localStorageSink(data) {
    console.log(data.output.toJS())
    let list = data.output.toJS();
    localStorage.setItem('itemKey', JSON.stringify(list));
}
