import ToolboxIcon from './svg/toolbox.svg';
import './index.css';

/**
 * @typedef {object} PersonalityConfig
 * @description Config supported by Tool
 * @property {string} endpoint - image file upload url
 * @property {string} field - field name for uploaded image
 * @property {string} types - available mime-types
 * @property {object} additionalRequestData - any data to send with requests
 * @property {object} additionalRequestHeaders - allows to pass custom headers with Request
 * @property {string} pollPlaceholder - placeholder for personas select
 * @property {string} selectPlaceholder - placeholder select
 */

/**
 * @typedef {object} UploadResponseFormat
 * @description This format expected from backend on file uploading
 * @property {number} success - 1 for successful uploading, 0 for failure
 * @property {object} file - Object with file data.
 *                           'url' is required,
 *                           also can contain any additional data that will be saved and passed back
 * @property {string} file.url - [Required] image source URL
 */

/**
 * Persona Quote Tool for the Editor.js
 */
export default class PersonaQuote {
  /**
   * @param {PersonalityToolData} data - Tool's data
   * @param {PersonalityConfig} config - Tool's config
   * @param {API} api - Editor.js API
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
      personas: config.personas || [],
      selectPlaceholder: config.selectPlaceholder || 'Select'
    };

    /**
     * Set saved state
     */
    this.data = data;
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   */
  static get toolbox() {
    return {
      icon: ToolboxIcon,
      title: 'Poll'
    };
  }

  /**
   * Empty Quote is not empty Block
   *
   * @public
   * @returns {boolean}
   */
  static get contentless() {
    return true;
  }

  /**
   * Allow to press Enter inside the Quote
   *
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Tool's CSS classes
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      loader: this.api.styles.loader,

      /**
       * Tool's classes
       */
      wrapper: 'cdx-persona-quote',
      card: 'cdx-persona-quote__card',
      fields: 'cdx-persona-quote__fields',
      photo: 'cdx-persona-quote__photo',
      name: 'cdx-persona-quote__name',
      quote: 'cdx-persona-quote__quote',
      position: 'cdx-persona-quote__position',
      pollPlaceholder: 'cdx-persona-personas__placeholder',
      pollsSelect: 'cdx-persona-personas__select',

      settingsWrapper: 'cdx-persona-quote__settings',
      settingsButton: this.api.styles.settingsButton,
      settingsButtonActive: this.api.styles.settingsButtonActive
    };
  }

  /**
   * Return Block data
   * @param {HTMLElement} toolsContent
   * @return {PersonalityToolData}
   */
  save(toolsContent) {
    return this.data;
  }

  /**
   * Sanitizer rules
   */
  static get sanitize() {
    const defaultConfig = {
      br: false,
      b: false,
      i: false,
      a: false
    };

    return {
      name: defaultConfig,
      position: defaultConfig,
      quote: Object.assign({}, defaultConfig, {
        br: true
      })
    };
  }

  /**
   * Renders Block content
   * @return {HTMLDivElement}
   */
  render() {
    this.nodes.wrapper = this.make('div', [this.CSS.baseClass, this.CSS.wrapper]);

    this.nodes.pollPlaceholder = this.make('div', this.CSS.pollPlaceholder, {
      contentEditable: false,
      innerHTML: this.config.pollPlaceholder
    });

    this.nodes.wrapper.appendChild(this.nodes.pollPlaceholder);

    this.nodes.pollsSelect = this.make('select', this.CSS.pollsSelect);

    this.nodes.pollsSelect.appendChild(
      this.make('option', null, {
        innerHTML: this.config.selectPlaceholder,
        selected: true,
        hidden: true
      })
    );

    this.config.personas.forEach((element) => {
      const option = this.make('option', null, {
        innerHTML: element.name
      }, {
        'data-id': element.id
      });

      this.nodes.pollsSelect.appendChild(option);
    });

    const callbackSelect = (option) => {
      this.data.pollId = option.dataset.id;
    };

    this.nodes.pollsSelect.addEventListener('change', function () {
      const selectedOption = this.options[this.selectedIndex];

      callbackSelect(selectedOption);
    });

    this.nodes.wrapper.appendChild(this.nodes.pollsSelect);

    return this.nodes.wrapper;
  }

  /**
   * Validate saved data
   * @param {PersonalityToolData} savedData - tool's data
   * @returns {boolean} - validation result
   */
  validate(savedData) {
    /**
     * Return false if fields are empty
     */
    console.log();
    return this.data.pollId !== undefined;
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
