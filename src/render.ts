import { createElement } from './dom';

function title(VNode) {
  document.title = VNode.vchildren[0].vtext;
}

function meta(VNode) {
  const { name, content } = VNode.vattrs;
  const oldNode = document.querySelector(`meta [name="${name}"]`);
  if (oldNode) {
    oldNode.setAttribute('content', content);
  } else {
    const element = createElement(VNode.vtag, VNode.vattrs);
    document.head.appendChild(element);
  }
}

export default {
  title,
  meta
};
