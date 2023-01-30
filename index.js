function val (...argus) {
  let form,
    data = null,
    type = 'json'
  //#region
  if (argus.length === 0)
    throw new Error('The function needs at least 1 argument, but is given 0')

  if (argus.length >= 1) {
    if (argus[0] instanceof HTMLFormElement && argus[0].nodeName === 'FORM') {
      form = argus[0]
    } else {
      throw new Error('param 1 must be a form element.')
    }
  }

  if (argus.length >= 2) {
    if (
      Object.prototype.toString.call(argus[1]) === '[object Object]' ||
      Object.prototype.toString.call(argus[1]) === '[object DOMStringMap]'
    ) {
      data = argus[1]
    } else if (
      typeof argus[1] === 'string' &&
      ['json', 'querystring', 'formdata'].includes(argus[1])
    ) {
      type = argus[1]
    } else {
      throw new Error(
        'param 2 must be an object or a string of json,querystring,formdata'
      )
    }
  }
  //#endregion
  // console.log(form, data, type)
  if (data === null) {
    // get value
    if (type === 'formdata') {
      return new FormData(form)
    }
    let result = {}
    let eles = Array.from(form.querySelectorAll('[name]'))
    eles.forEach(item => {
      // console.log(item.type)
      switch (item.type) {
        case 'text':
        case 'password':
        case 'color':
        case 'date':
        case 'time':
        case 'datetime-local':
        case 'email':
        case 'hidden':
        case 'month':
        case 'number':
        case 'tel':
        case 'range':
        case 'url':
        case 'week':
        case 'search':
        case 'textarea':
        case 'select-one':
          item.value && (result[item.name] = item.value)
          break
        case 'radio':
          item.value && item.checked && (result[item.name] = item.value)
          break
        case 'checkbox':
          if (item.value && item.checked) {
            if (result[item.name]) {
              result[item.name].push(item.value)
            } else {
              result[item.name] = [item.value]
            }
          }
          break
        case 'select-multiple':
          let options = Array.from(item.querySelectorAll('option'))
          options.forEach(option => {
            if (option.selected) {
              if (result[item.name]) {
                result[item.name].push(option.value)
              } else {
                result[item.name] = [option.value]
              }
            }
          })
          break
      }
    })
    if (type === 'json') {
      return result
    }
    if (type === 'querystring') {
      let arr = []
      for (let k in result) {
        if (typeof result[k] === 'string') {
          arr.push(`${encodeURIComponent(k)}=${encodeURIComponent(result[k])}`)
        } else if (Array.isArray(result[k])) {
          result[k].forEach(item => {
            arr.push(`${encodeURIComponent(k)}=${encodeURIComponent(item)}`)
          })
        }
      }
      return arr.join('&')
    }
    // console.log(result)
  } else {
    // set value
    for (let key in data) {
      let ele = Array.from(form.querySelectorAll(`[name=${key}]`))
      let type = ele[0].type || 'text'
      if (ele.length === 0 || type === 'file') continue
      if (ele.length === 1) {
        if (type === 'checkbox' || type === 'radio') {
          if (
            ele[0].value === data[key] ||
            (Array.isArray(data[key]) && data[key].includes(ele[0].value))
          ) {
            ele[0].checked = true
          }
        } else if (type === 'select-multiple') {
          let options = Array.from(ele[0].querySelectorAll('option'))
          options.forEach(item => {
            if (data[key] instanceof Array && data[key].includes(item.value)) {
              item.selected = true
            } else if (
              typeof data[key] === 'string' &&
              item.value == data[key]
            ) {
              item.selected = true
            }
          })
        } else {
          ele[0].value = data[key]
        }
      } else {
        if (type === 'radio') {
          ele.forEach(item => {
            item.value == data[key] && (item.checked = true)
          })
        } else if (type === 'checkbox') {
          ele.forEach(item => {
            if (data[key] instanceof Array && data[key].includes(item.value)) {
              item.checked = true
            } else if (
              typeof data[key] === 'string' &&
              data[key] == item.value
            ) {
              item.checked = true
            }
          })
        } else {
          ele.forEach(item => {
            item.value = data[key]
          })
        }
      }
    }
  }
}

module.exports = val
