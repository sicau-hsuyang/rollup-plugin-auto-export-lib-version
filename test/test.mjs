import test from 'ava';
import autoExportVersion from '../dist/index.mjs'

test('type', (t) => {
  t.is(autoExportVersion, 'function')
})