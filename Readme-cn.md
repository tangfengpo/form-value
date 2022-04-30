## form-value

### 安装

```
npm i form-value
```

浏览器端

```html
<script src="./browser/form-value.js"></script>
```

### 获取表单项值

首先，你必须设置每个表单项的name属性值

```js
let form = document.querySelector('form')

let data = val(form)
/**
返回如下结果
{
  key: value,
  key: value,
  key: [value1, value2],
  ...
}
*/

// 如果你想获取查询字符串结果
let data = val(form, 'querystring')
/**
返回 key=value&key=value...
*/

// 如果你想得到FormData对象
let data = val(form, 'formdata')
/**
返回 the FormData Object
*/
```

### 为表单各项赋值

需要传递一个字面量对象, 并且对象的键必须等于表单各项的name属性值.

```js
let data = {
  text: 'hello world',
  password: 123456,
  sex: 'M'
}
let form = document.querySelector('form')

val(form, data) // Set default values for form entries
```





