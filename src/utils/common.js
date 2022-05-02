import dayjs from "dayjs";

export function dateFormat(v, type = 'YYYY-MM-DD') {
  if (!v) return ''
  return dayjs.unix(v).format(type)
}

export function http(url, methods = 'get') {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve([true, JSON.parse(xhr.responseText)]);
        } else {
          resolve([false]);
        }
      }
    }
    xhr.open(methods, url)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send()
  })
}