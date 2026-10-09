import fs from 'node:fs'
import { build } from 'vite'

const VALID_CSS = '.a {\n  color: red;\n}\n'
const INVALID_CSS = '.a:: {\n  color: red;\n}\n'

const steps = [
  ['write INVALID css -> expected to fail', INVALID_CSS],
  ['restore VALID css -> should succeed', VALID_CSS],
  ['edit VALID css    -> should succeed', VALID_CSS + '\n'],
]

fs.writeFileSync('style.css', VALID_CSS)

const watcher = await build({ logLevel: 'silent', build: { watch: {} } })

watcher.on('event', (event) => {
  if (event.code === 'BUNDLE_END') console.log('   ✅ build succeeded')
  if (event.code === 'ERROR') {
    const reason = String(event.error.message)
      .split('\n')
      .find((line) => line.includes('SyntaxError'))
    console.log(`   ❌ ${reason?.trim() ?? event.error.message}`)
  }
  event.result?.close?.()
})

console.log('initial build with VALID css')
steps.forEach(([label, css], i) => {
  setTimeout(() => {
    console.log(label)
    fs.writeFileSync('style.css', css)
  }, 2000 * (i + 1))
})
setTimeout(() => watcher.close(), 2000 * (steps.length + 1))
