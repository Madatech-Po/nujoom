#!/usr/bin/env node
// Renders public/icons/icon.svg to the PNG sizes the web manifest and iOS need (NUJ-13).
// Run after changing the SVG:  node scripts/make-icons.mjs
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const svg = await readFile(new URL('../public/icons/icon.svg', import.meta.url), 'utf8')
const outputs = [
  { file: 'icon-192.png', size: 192, padding: 0 },
  { file: 'icon-512.png', size: 512, padding: 0 },
  // Maskable: keep the star inside the 80% safe zone.
  { file: 'icon-maskable-512.png', size: 512, padding: 0.1 },
  { file: 'apple-touch-icon.png', size: 180, padding: 0 },
]

const browser = await chromium.launch()
try {
  for (const { file, size, padding } of outputs) {
    const page = await browser.newPage({ viewport: { width: size, height: size } })
    const inner = Math.round(size * (1 - padding * 2))
    await page.setContent(
      `<html><body style="margin:0;background:#1e1b4b;display:grid;place-items:center;width:${size}px;height:${size}px">` +
        `<div style="width:${inner}px;height:${inner}px">${svg.replace('<svg ', `<svg width="${inner}" height="${inner}" `)}</div>` +
        `</body></html>`,
    )
    await page.screenshot({ path: fileURLToPath(new URL(`../public/icons/${file}`, import.meta.url)) })
    await page.close()
    console.log(`wrote public/icons/${file}`)
  }
} finally {
  await browser.close()
}
