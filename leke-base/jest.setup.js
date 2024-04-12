import {configure} from '@leke/rc';
import http,{extend} from './website/src/http';
import glob from 'glob';

configure({http});

glob.sync('./packages/rc/components/**/mock.{ts,js}').forEach(path=>{
    extend(require(path).default);
});
