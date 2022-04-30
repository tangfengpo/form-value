## form-value

[简体中文](./Readme-cn.md)

### Install

```
npm i form-value
```

and in browser

```html
<script src="./browser/form-value.js"></script>
```

### Gets the form values

first, you must be set every item name attribute.

```js
let form = document.querySelector('form')

let data = val(form)
/**
returns
{
  key: value,
  key: value,
  key: [value1, value2],
  ...
}
*/

// if you want to get querystring
let data = val(form, 'querystring')
/**
returns   key=value&key=value...
*/

// if you want to get FormData
let data = val(form, 'formdata')
/**
returns the FormData Object
*/
```

### Assign

You need to pass in a literal object, and the key of the object must be equal to the name attribute of the form item.

```js
let data = {
  text: 'hello world',
  password: 123456,
  sex: 'M'
}
let form = document.querySelector('form')

val(form, data) // Set default values for form entries
```





