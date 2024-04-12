import { ReactNode } from "react";

export interface IRateProps {
  count?: number;
  allowClear?: boolean;
  allowHalf?: boolean;
  disabled?: boolean;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
  character?: TCharacterType;
  className?: string;
}

export type TCharacterType = ReactNode | ((rateProps: TRatePropsType) => ReactNode);

export type TRatePropsType =  {
  index: number;
}