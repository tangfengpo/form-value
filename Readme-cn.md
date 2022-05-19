## form-value

### 介绍

插件不依赖任何库和框架，使用原生DOM完成

插件提供 `val()` 函数，可以使用 `val(form)` 获取表单各项的值，也可以使用 `val(form, data)` 为表单进行数据回填。

### 安装

```
npm i form-value
```

浏览器端

```html
<script src="./browser/form-value.js"></script>
```

### 获取表单项值

首先，你必须设置每个表单项的 `name` 属性值

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

需要传递一个字面量对象, 并且对象的键必须等于表单各项的`name` 属性值.

从 `1.0.4` 版本开始，支持 DOMStringMap类型的数据，即 通过 `元素.dataset` 得到的对象。

```js
let data = {
  text: 'hello world',
  password: 123456,
  sex: 'M'
}
let form = document.querySelector('form')

val(form, data) // Set default values for form entries
```





