const _initialUid = 3;

let _uid = _initialUid;

export function newUID() {
    return _uid++;
}