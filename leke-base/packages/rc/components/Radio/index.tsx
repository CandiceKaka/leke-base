import * as React from 'react';
import InternalRadio from './radio';
import { RadioProps } from './interface';
import Group from './group';
import Button from './radioButton';

export type {
    RadioProps
} from './interface';
interface CompoundedComponent
  extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
    Button: typeof Button;
    Group: typeof Group;
}


const Radio = InternalRadio as CompoundedComponent;
Radio.Button = Button;
Radio.Group = Group;
export { Button, Group };
export default Radio;