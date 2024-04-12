/*
 * @Author: liguodi
 * @LastEditors: liguodi
 * @Description: Alert组件接口定义
 * @Date: 2020-12-03 11:38:25
 * @LastEditTime: 2020-12-07 15:18:55
 */
export interface IAlertProps {
  // 允许用户传入自己的className
  className?: string;
  // 允许用户设置内联
  style?: React.CSSProperties;
  // 类型
  type?: 'success' | 'info' | 'warning' | 'error';
  // 配置closeIcon
  closeIcon?: React.ReactNode;
  // 标题
  title?: React.ReactNode;
  // 提示信息
  message?: React.ReactNode;
  // 扩展的操作选项操作
  action?: React.ReactNode;
  // 配置icon
  icon?: React.ReactNode;
  // 关闭Alert后
  afterClose?: () => void;
}

export interface IAlertState {
  // 动画状态控制
  isStartAnimation: boolean;
  // 关闭状态控制
  closed: boolean;
}
