// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173'
const URL_PREFIX = 'https://cataas.com'

test('Have title', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  expect(page).toBeTruthy()
})

test('app shows random fact & image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const text = page.getByRole('paragraph')
  const image = page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  expect(textContent?.length).toBeGreaterThan(0)
  expect(imageSrc?.startsWith(URL_PREFIX)).toBeTruthy()
})

test('button exists', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const button = page.getByRole('button')
  expect(button).toBeTruthy()

  const buttonText = await button.textContent()
  expect(buttonText).toBe('Get new fact')
})

test('button click changes fact & image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const txt = page.getByRole('paragraph')
  const image = page.getByRole('img')

  const textContent = await txt.textContent()
  const imageSrc = await image.getAttribute('src')

  console.log(textContent, imageSrc)

  const button = page.getByRole('button')
  await button.click()

  const newTextContent = await txt.textContent()
  const newImageSrc = await image.getAttribute('src')

  console.log(newTextContent, newImageSrc)

  expect(textContent).not.toBe(newTextContent)
  expect(imageSrc).not.toBe(newImageSrc)
})
