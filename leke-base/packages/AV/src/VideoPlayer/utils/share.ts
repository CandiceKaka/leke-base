import {initConfig} from './config';
export function getVideoSize(width,height){
    if(width&&height&&width>=initConfig.initWidth&&height>=initConfig.initHeight)return {width,height};
    if(width>=initConfig.initWidth&&height<initConfig.initHeight)return {width,height:initConfig.initHeight};
    if(height>=initConfig.initHeight&&width<initConfig.initWidth)return {width:initConfig.initWidth,height};
    return {width:initConfig.initWidth,height:initConfig.initHeight};
}