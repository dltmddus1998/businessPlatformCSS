export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
}

// Encapsulate the HTML element creation
export class BaseComponent<T extends HTMLElement> implements Component {
  // 한 번 만들어진 요소는 변경 불가 (요소 안의 상태들은 변경 가능)
  protected readonly element: T;
  constructor(htmlString: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }

  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error('Parent mismatch‼️');
    }
    parent.removeChild(this.element);
  }
}
