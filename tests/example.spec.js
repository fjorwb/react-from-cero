// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173/'
const URL_PREFIX = 'https://cataas.com'

test('Have title', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  await expect(page).toBeTruthy()
})

test('app shows random fact & image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(URL_PREFIX)).toBeTruthy()
})

test('button exists', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const button = await page.getByRole('button')
  await expect(button).toBeTruthy()

  const buttonText = await button.textContent()
  await expect(buttonText).toBe('Get new fact')
})

test('button click changes fact & image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  console.log(textContent, imageSrc)

  const button = await page.getByRole('button')
  await button.click()

  const newTextContent = await text.textContent()
  const newImageSrc = await image.getAttribute('src')

  console.log(newTextContent, newImageSrc)

  await expect(textContent).not.toBe(newTextContent)
  await expect(imageSrc).not.toBe(newImageSrc)
})
