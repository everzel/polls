import ToolboxIcon from './svg/toolbox.svg';
import './index.css';

/**
 * Persona Quote Tool for the Editor.js
 */
export default class PersonaQuote {
  /**
   * @param data
   * @param config
   * @param api
   */
  constructor({ data, config, api }) {
    this.api = api;

    this.nodes = {
      wrapper: null,
      selectDefault: null,
      pollPlaceholder: null,
      pollsSelect: null
    };

    this.config = {
      pollPlaceholder: config.pollPlaceholder || 'Poll',
      polls: config.polls || [],
      selectPlaceholder: config.selectPlaceholder || 'Select'
    };

    this.data = Object.assign({}, data);
  }

  /**
   * @returns {{icon: *, title: string}}
   */
  static get toolbox() {
    return {
      icon: ToolboxIcon,
      title: 'Poll'
    };
  }

  /**
   * @returns {{input: any, pollsSelect: string, pollPlaceholder: string, baseClass: ScrollLogicalPosition, wrapper: string, fields: string, settingsWrapper: string, card: string}}
   * @constructor
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,

      wrapper: 'cdx-persona-quote',
      card: 'cdx-persona-quote__card',
      fields: 'cdx-persona-quote__fields',
      pollPlaceholder: 'cdx-persona-personas__placeholder',
      pollsSelect: 'cdx-persona-personas__select',

      settingsWrapper: 'cdx-persona-quote__settings'
    };
  }

  /**
   * @param toolsContent
   * @returns {PersonalityToolData}
   */
  save(toolsContent) {
    return this.data;
  }

  /**
   * @returns {null}
   */
  render() {
    const { pollId } = this.data;

    this.nodes.wrapper = this.make('div', [this.CSS.baseClass, this.CSS.wrapper]);

    this.nodes.pollPlaceholder = this.make('div', this.CSS.pollPlaceholder, {
      contentEditable: false,
      innerHTML: this.config.pollPlaceholder
    });

    this.nodes.wrapper.appendChild(this.nodes.pollPlaceholder);

    this.nodes.pollsSelect = this.make('select', this.CSS.pollsSelect);

    let selected = {};

    if (!pollId) {
      selected = {
        selected: true
      };
    }

    this.nodes.pollsSelect.appendChild(
      this.make('option', null, Object.assign({
        innerHTML: this.config.selectPlaceholder,
        hidden: true
      }, selected))
    );

    this.config.polls.forEach((element) => {
      let selectedOption = {};

      if (element.id == pollId) {
        selectedOption = {
          selected: true
        };
      }

      const option = this.make('option', null, {
        innerHTML: element.name
      }, Object.assign({
        value: element.id,
        'data-id': element.id
      }, selectedOption));

      this.nodes.pollsSelect.appendChild(option);
    });

    const callbackSelect = (option) => {
      this.data.pollId = option.dataset.id;

      window.dispatchCustomEvent(window, 'changeTune');
    };

    this.nodes.pollsSelect.addEventListener('change', function () {
      callbackSelect(this.options[this.selectedIndex]);
    });

    this.nodes.wrapper.appendChild(this.nodes.pollsSelect);

    return this.nodes.wrapper;
  }

  /**
   * @param savedData
   * @returns {boolean}
   */
  validate(savedData) {
    return true;
  }

  /**
   * Helper method for elements creation
   * @param tagName
   * @param classNames
   * @param attributes
   * @param data
   * @return {HTMLElement}
   */
  make(tagName, classNames = null, attributes = {}, data = {}) {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    for (const dataName in data) {
      el.setAttribute(dataName, data[dataName]);
    }

    return el;
  }
}
