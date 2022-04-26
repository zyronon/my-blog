import './header.less'
import './header.html'

if (document.readyState !== 'loading') {
  onload()
} else {
  document.addEventListener('DOMContentLoaded', onload)
}

function onload() {
  let spans = document.querySelectorAll('.animate__animated')
  spans.forEach(v => {
    v.addEventListener('mouseenter', function () {
      v.classList.add('animate__bounce')
      v.addEventListener('animationend', function () {
        v.classList.remove('animate__bounce')
      })
    })
  })
}

