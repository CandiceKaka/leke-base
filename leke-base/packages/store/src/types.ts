export type paramsType<K>={
    [P in keyof K]?: K[P]
}
export type getDataType<T=any>=()=>T
export type setDataType<T=any>=(newData:paramsType<T> | ((data:T)=>paramsType<T>))=>void
export interface storeType<T=any> {
    getData:getDataType<T>,
    setData:setDataType<T>
}
