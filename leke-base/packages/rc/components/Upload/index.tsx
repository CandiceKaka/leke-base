import React, {useRef} from "react";
import http from '@leke/http';

export interface UploadProps {
    children:React.ReactElement,
    headers:object,
    name:string,
    multiple:boolean,
    url:string,
    onSuccess?:(res:any)=>void,
    onFail?:(err:any)=>void
    accept?:string,
    onUploadProgress?:(progressEvent:any)=>void,
    validate?:(files:any)=>boolean
}

export default function Upload(props:UploadProps) {
    const {children,headers,name,multiple,url,accept,onSuccess,onFail,onUploadProgress,validate}=props;
    const child=React.Children.only(children);
    const inputRef=useRef<HTMLInputElement>(null);

    const onClick=(e)=>{
        child.props.onClick?.(e);
        inputRef.current?.click();
    };
    function onChange(e) {
        const input:HTMLInputElement=e.target;
        const files=input.files;
        if(files&&files.length){
            if(typeof validate==='function' && !validate(files)){
                return false;
            }
            const formData=new FormData();
            Array.from(files).forEach(file=>{
                formData.append(name,file);
            });
            http({
                headers,
                method:'post',
                url,
                data:formData,
                onUploadProgress
            }).then((res)=>{
                input.type='text';
                input.type='file';
                onSuccess&&onSuccess(res);
            }).catch(err=>{
                input.type='text';
                input.type='file';
                onFail&&onFail(err);
            });
        }
    }
    return (
        <>
            <input
                ref={inputRef}
                type="file"
                multiple={multiple}
                accept={accept}
                style={{display:'none'}}
                onChange={onChange}
            />
            {React.cloneElement(child,{onClick})}
        </>
    );
}

Upload.defaultProps={
    headers:{"Content-Type": "multipart/form-data"},
    name:'file',
    multiple:false
};