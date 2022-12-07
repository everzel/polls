# EditorJS Persona With Select Block

## Install
```
yarn add https://github.com/everzel/editorjs-persona-block-witch-select
```

## Usage
```js
tools: {
    personaQuote: {
        class: PersonaQuote,
        config: {
            endpoint: 'http://localhost:8008/uploadFile',
            namePlaceholder: 'Name',
            positionPlaceholder: 'Position',
            quotePlaceholder: 'Quote',
            personas: [
                {
                    photo: 'https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg',
                    name: 'Test Name',
                    regalia: 'Laravel Developer',
                    about: 'Dev1'
                },
                {
                    photo: 'https://moresxem.com/wp-content/uploads/2020/05/default-avatar_2.png?v=1615837246',
                    name: 'Test Name 2',
                    regalia: 'PHP Developer',
                    about: 'Dev'
                },
            ],
            designs: [
                {
                    key: 'basic',
                    label: 'Basic',
                    icon: '<svg width="20" height="20" viewBox="0 0 20 20"/>...</svg>'
                },
            ],
        },
    }
},
```