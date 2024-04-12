interface optionsType{
    method?:string,
    url?:string,
    params?: any,
    data?:any,
    headers?:any,
    timeout?:number,
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent:
         any) => void;
}
type httpType=<T>(options:optionsType)=>Promise<T>
interface propsType {
    http:httpType
}

export let http:httpType;


export default function (props:propsType) {
    if(props.http){
        http=props.http;
    }
}
