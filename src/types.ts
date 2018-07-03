declare global {
  const h: Function
}

export interface Props {
  children?: any[];
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

export interface FunctionalUtilities {
  getTag: (vnode: VNode) => string,
  getChildren: (vnode: VNode) => VNode[],
  getText: (vnode: VNode) => string,
  getAttributes: (vnode: VNode) => any;
  replaceAttributes: (vnode: VNode, attributes: any) => void;
}
export interface FunctionalComponent<PropsType> {
  (props?: PropsType & Props, utils?: FunctionalUtilities): VNode;
}
