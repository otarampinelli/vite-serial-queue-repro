import styleUrl from './style.css?url'

const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = styleUrl
document.head.append(link)
