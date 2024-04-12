/*
 * @Description: 
 * @Author: linchaoting
 * @Date: 2021-03-02 16:58:46
 * @LastEditTime: 2021-03-19 16:54:00
 */
import React,{useState,useRef} from 'react';
import classNames from 'classnames';
import Input,{InputProps} from './Input';
import omit from 'omit.js';
import Button from '../Button';
import {Search as SearchIcon} from '@leke/icons';

interface SearchProps extends InputProps{
    className?:string,
    size?: 'middle' | 'large',
    enterButton?:React.ReactNode,
    onSearch?:(value)=>void,
}


const baseCls = 'leke-input-search';
const Search:React.FC<SearchProps> = (props) => {
    const {size,onSearch,enterButton,className} = props;
    const inputValueRef = useRef<string>('');
    let searchButton;
    if (enterButton) {
        if (typeof enterButton ==='string') {
            searchButton =  (
                <Button 
                    className="search-button"
                    onClick={()=>{
                        onSearch&&onSearch(inputValueRef.current);
                    }}
                    type="main"
                    size={size}
                >{enterButton}</Button>
            );
        }else{
            searchButton =  (
                <Button 
                    className="search-button"
                    onClick={()=>{
                        onSearch&&onSearch(inputValueRef.current);
                    }}
                    type="main"
                    size={size}
                    icon={enterButton}
                />
            );
        }
        
    }else{
        searchButton =  (
            <Button 
                className="search-button"
                onClick={()=>{
                    onSearch&&onSearch(inputValueRef.current);
                }}
                type="main"
                size={size}
                icon={<SearchIcon/>}
            />
        );
    }


    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        inputValueRef.current = e.target.value;
    };

    const onCustomSearch = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (onSearch) {
            onSearch(inputValueRef.current);
        }
    };

    return (
        <div className={classNames(baseCls)}>
            <Input 
                {...omit(props,['className','size','addonAfter','onChange','onSearch','onPressEnter','enterButton'])}
                className={classNames("search-input",className)}
                size={size}
                addonAfter={searchButton}
                onChange={onChange}
                onPressEnter={onCustomSearch}
            />
        </div>
    );
};
Search.defaultProps={
    size:'middle',
};

export default Search;
