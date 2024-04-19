import { cloneTemplate } from '../lib/dom.js';

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} content
 * @property {boolean} isCompleted
 */
export class TodoList {
  /**
   * @type {Todo[]}
   */
  #todos = [];

  /**
   * @type {HTMLUListElement}
   */
  #listElement;

  /**
   *
   * @param {Todo[]} todos
   */
  constructor(todos) {
    this.#todos = todos;
  }

  /**
   *
   * @param {HTMLUListElement} element
   */
  appendTo(element) {
    const fragment = cloneTemplate('todolist-layout');
    element.append(fragment);
    this.#listElement = document.querySelector('.list-group');
    for (let todo of this.#todos) {
      const t = new TodoListItem(todo);
      this.#listElement.append(t.element);
    }
    const form = document.querySelector('#form-1');
    form.addEventListener('submit', (e) => this.#onSubmit(e));
    const buttonFilterList = document.querySelectorAll('.btn-group button');
    buttonFilterList.forEach((buttonFilter) => {
      buttonFilter.addEventListener('click', (e) => this.#toggleFilter(e));
    });
    this.#listElement.addEventListener('toggle', ({ detail: todo }) => {
      todo.isCompleted = !todo.isCompleted;
      this.#updateStorage();
    });
    this.#listElement.addEventListener('delete', ({ detail: todo }) => {
      this.#todos = this.#todos.filter((t) => t !== todo);
      this.#updateStorage();
    });
  }

  /**
   *
   * @param {PointerEvent} e
   */
  #toggleFilter(e) {
    e.preventDefault();
    const currentButton = e.currentTarget;
    currentButton.parentElement.querySelector('.active').classList.remove('active');
    currentButton.classList.add('active');
    const filter = currentButton.getAttribute('data-filter');
    switch (filter) {
      case 'todo':
        this.#listElement.classList.add('hide-completed');
        this.#listElement.classList.remove('hide-todo');
        break;
      case 'done':
        this.#listElement.classList.remove('hide-completed');
        this.#listElement.classList.add('hide-todo');
        break;
      default:
        this.#listElement.classList.remove('hide-completed');
        this.#listElement.classList.remove('hide-todo');
        break;
    }
  }

  #onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const content = data.get('title').toString().trim();
    if (content === '') {
      return;
    }
    const newTodo = {
      id: Date.now(),
      content,
      isCompleted: false,
    };
    const lastTodo = new TodoListItem(newTodo);
    this.#listElement.prepend(lastTodo.element);
    this.#todos = [...this.#todos, newTodo];
    this.#updateStorage();
    form.reset();
  }

  #updateStorage() {
    localStorage.setItem('todos-list', JSON.stringify(this.#todos));
  }
}
/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} content
 * @property {boolean} isCompleted
 */
class TodoListItem {
  /**
   * @type {Todo}
   */
  #todo;

  /**
   * @type {HTMLElement}
   */
  #element;

  /**
   *
   * @param {Todo} todo
   */
  constructor(todo) {
    this.#todo = todo;
    const id = `todo-${todo.id}`;
    const li = cloneTemplate('todolist-item').firstElementChild;
    li.classList.add(todo.isCompleted ? 'is-completed' : 'hide-completed');
    this.#element = li;
    const checkbox = li.querySelector('input');
    checkbox.setAttribute('id', id);
    if (todo.isCompleted) checkbox.setAttribute('checked', '');
    const label = li.querySelector('label');
    label.setAttribute('for', id);
    label.innerText = todo.content;
    if (todo.isCompleted) label.style.textDecoration = 'line-through';
    const button = li.querySelector('button');
    li.append(checkbox, label, button);
    checkbox.addEventListener('change', (e) => this.#toggleCheckbox(e.currentTarget));
    button.addEventListener('click', (e) => this.#remove(e));
  }

  /**
   *
   * @param {PointerEvent} e
   */
  #remove(e) {
    e.preventDefault();
    const customEvent = new CustomEvent('delete', {
      detail: this.#todo,
      cancelable: true,
      bubbles: true,
    });
    this.#element.dispatchEvent(customEvent);
    this.#element.remove();
  }

  /**
   *
   * @param {HTMLInputElement} checkbox
   */
  #toggleCheckbox(checkbox) {
    const label = this.#element.querySelector('label');
    if (checkbox.checked) {
      this.#element.classList.add('is-completed');
      label.style.textDecoration = 'line-through';
    } else {
      this.#element.classList.remove('is-completed');
      label.style.textDecoration = 'inherit';
    }
    const customEvent = new CustomEvent('toggle', {
      detail: this.#todo,
      cancelable: true,
      bubbles: true,
    });
    this.#element.dispatchEvent(customEvent);
  }

  /**
   * @return {HTMLLIElement}
   */
  get element() {
    return this.#element;
  }
}
