declare const h: Function;

export interface Props {
  [key: string]: any
}

export interface VNode {
  vtag?: string | number;
  vkey?: string | number;
  vtext?: string;
  vchildren?: VNode[];
  vattrs?: any;
  vref?: (elm: any) => void;
  elm?: Element|Node;
}
