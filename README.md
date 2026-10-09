# createSerialPromiseQueue rejection repro

Run `npm start`.

`main.js` imports `style.css?url`. The script runs `vite build --watch`, writes invalid CSS
(Lightning CSS minify fails), then restores valid CSS.

**Expected:** the rebuilds after restoring valid CSS succeed.
**Actual (vite 8.3.4):** every later rebuild fails with the *old* syntax error until the process restarts.
