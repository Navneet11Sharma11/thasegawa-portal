declare module "*.module.scss";

declare type TEvent<T = string> = React.ChangeEvent<HTMLInputElement & { value: T }>;

declare type DivElementType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

declare type TComponentProps<ElementType> = React.ComponentProps<ElementType>;

declare type TNodeServerRes<T> = {
  type: "ERROR" | "INFO" | "SUCCESS";
  data: T;
  isNotify: boolean;
};
