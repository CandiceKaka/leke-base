/*
 * @Description: Input组件、TextArea组件 文档地址https://docs.qq.com/doc/DWXNYVUh6bnR4UnNH
 * @Author: linchaoting
 * @Date: 2020-12-08 09:17:50
 * @LastEditTime: 2021-03-02 17:00:23
 */

import InternalInput,{InputProps} from './Input';
import TextArea from './TextArea';
import InputNumber from './InputNumber';
import Search from './Search';
interface AllInputType extends React.FC<InputProps> {
  TextArea: typeof TextArea;
  InputNumber: typeof InputNumber;
  Search: typeof Search;
}

const Input  = InternalInput as AllInputType;
Input.TextArea = TextArea;
Input.InputNumber = InputNumber;
Input.Search = Search;

export default Input;
