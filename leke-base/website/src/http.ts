const mock={} as any;

export default function http (props) {
    const url=props.url.split("?")[0];
    return Promise.resolve(mock[url]?JSON.parse(JSON.stringify(mock[url])):null);
}

export function extend(opt) {
    Object.assign(mock,opt);
}