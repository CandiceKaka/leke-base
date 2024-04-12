
export interface BusinessHeaderMenusProps{
  key:string,
  url:string,
  defaultActive:boolean
}

export interface BusinessHeaderSubsProps{
  roleId:number,
  menus:BusinessHeaderMenusProps[]
}

export interface BusinessHeaderProps {
  onlyShowToolbar?:boolean,
  roleId?:number,
  projectName?:string,
  icon?: string,
  title: string,
  extraTitle?: string,
  subs?:BusinessHeaderSubsProps[],
  activeKey?: string,
  defaultSubs?: boolean,
  hide?: boolean,
  hideToolbar?: boolean,
  hidePhoto?: boolean,
  fullScreen?:boolean,
  hideSecondary?:boolean,
  saveUserInfo?:(value)=>any,
  renderHeader?: ()=>HTMLElement|any,
}