import type { BrowserContext, Page } from 'playwright'

export type ExerciseType = 'classique' | 'simple'

export const ViewValidKeys = <const>['start', 'diaporama', 'apercu', 'eleve', 'LaTeX', 'AMC']
type ViewValidKeysType = typeof ViewValidKeys
export type View = ViewValidKeysType[number]
export function isView (obj: unknown): obj is View {
  if (obj == null || typeof obj !== 'string') return false
  return ViewValidKeys.includes(obj as View)
}

export const StudentVariationValidKeys = <const>['Tous les exercices sur une page', 'Une page par exercice', 'Toutes les questions sur une page', 'Une page par question', 'Course aux nombres']
type StudentVariationValidKeysType = typeof StudentVariationValidKeys
export type StudentVariation = StudentVariationValidKeysType[number]
export function isStudentVariation (obj: unknown): obj is StudentVariation {
  if (obj == null || typeof obj !== 'string') return false
  return StudentVariationValidKeys.includes(obj as StudentVariation)
}

export const LatexVariationValidKeys = <const>['Coopmaths', 'Classique', 'ProfMaquette', 'ProfMaquetteQrcode', 'Can']
type LatexVariationValidKeysType = typeof LatexVariationValidKeys
export type LatexVariation = LatexVariationValidKeysType[number]
export function isLatexVariation (obj: unknown): obj is LatexVariation {
  if (obj == null || typeof obj !== 'string') return false
  return LatexVariationValidKeys.includes(obj as LatexVariation)
}

export const AMCVariationValidKeys = <const>['AMCcodeGrid', 'AMCassociation', 'manuscrits']
type AMCVariationValidKeysType = typeof AMCVariationValidKeys
export type AMCVariation = AMCVariationValidKeysType[number]
export function isAMCVariation (obj: unknown): obj is AMCVariation {
  if (obj == null || typeof obj !== 'string') return false
  return AMCVariationValidKeys.includes(obj as AMCVariation)
}

export type Variation = '' | StudentVariation | LatexVariation | AMCVariation

export type CallbackType = (page: Page, view: View, variation: Variation, exerciseType: ExerciseType, questionNb: number) => Promise<void>

export async function testAllViews (url: string, page: Page, context: BrowserContext, questionsNb: number, exerciseType: ExerciseType, callback: CallbackType) {
  await page.goto(url)
  await page.waitForLoadState('networkidle')
  await callback(page, 'start', '', exerciseType, questionsNb)
  await checkSlideshow(page, exerciseType, questionsNb, callback)
  await callback(page, 'start', '', exerciseType, questionsNb)
  await checkStudent(page, context, exerciseType, questionsNb, callback)
  await callback(page, 'start', '', exerciseType, questionsNb)
  await checkLatex(page, exerciseType, questionsNb, callback)
  await callback(page, 'start', '', exerciseType, questionsNb)
  await checkAmc(page, exerciseType, questionsNb, callback)
  await callback(page, 'start', '', exerciseType, questionsNb)
}

async function checkSlideshow (page: Page, exerciseType: ExerciseType, questionsNb: number, callback: CallbackType) {
  await page.locator('div[data-tip="Diaporama"]').click()
  await checkSlideshowPlay(page, questionsNb, exerciseType, callback)
  await checkSlideshowPreview(page, questionsNb, exerciseType, callback)
  await page.locator('.bx-x').first().click()
}

async function checkSlideshowPlay (page: Page, questionsNb: number, exerciseType: ExerciseType, callback: CallbackType) {
  await page.locator('#diaporama-play-button').click()
  callback(page, 'diaporama', '', exerciseType, questionsNb)
}

async function checkSlideshowPreview (page: Page, questionNb: number, exerciseType: ExerciseType, callback: CallbackType) {
  await page.locator('.bx-detail').click()
  await callback(page, 'apercu', '', exerciseType, questionNb)
  await page.locator('.bx-arrow-back').click()
}

async function checkStudent (page: Page, context: BrowserContext, exerciseType: ExerciseType, questionNb: number, callback: CallbackType) {
  await page.locator('.bx-link').click()
  await checkStudentVariation('Tous les exercices sur une page', page, context, exerciseType, questionNb, callback)
  await checkStudentVariation('Une page par exercice', page, context, exerciseType, questionNb, callback)
  await checkStudentVariation('Toutes les questions sur une page', page, context, exerciseType, questionNb, callback)
  await checkStudentVariation('Une page par question', page, context, exerciseType, questionNb, callback)
  await checkStudentVariation('Course aux nombres', page, context, exerciseType, questionNb, callback)
  await page.locator('.bx-x').first().click()
}

async function checkStudentVariation (variation: Variation, page: Page, browserContext: BrowserContext, exerciseType: ExerciseType, questionNb: number, callback: CallbackType) {
  await page.click(`text=${variation}`)
  page.click('text=Visualiser') // Si on await ici, on risque de manquer le context.waitForEvent('page') qui suit
  const newPage = await browserContext.waitForEvent('page')
  await newPage.waitForLoadState('networkidle')

  if (variation === 'Course aux nombres') {
    await newPage.click('text=Démarrer')
    await newPage.waitForTimeout(6000)
  }
  await callback(newPage, 'eleve', variation, exerciseType, questionNb)
  await newPage.close()
}

async function checkLatex (page: Page, exerciseType: ExerciseType, questionsNb: number, callback: CallbackType) {
  await checkLatexVariation(page, 'LaTeX', 'Coopmaths', exerciseType, questionsNb, callback)
  await checkLatexVariation(page, 'LaTeX', 'Classique', exerciseType, questionsNb, callback)
  await checkLatexVariation(page, 'LaTeX', 'ProfMaquette', exerciseType, questionsNb, callback)
  await checkLatexVariation(page, 'LaTeX', 'ProfMaquetteQrcode', exerciseType, questionsNb, callback)
  await checkLatexVariation(page, 'LaTeX', 'Can', exerciseType, questionsNb, callback)
}

async function checkLatexVariation (page: Page, view: 'LaTeX' | 'AMC', variation: LatexVariation | AMCVariation, exerciseType: ExerciseType, questionsNb: number, callback: CallbackType) {
  await page.locator(`button[data-tip="${view}"]`).click()
  await page.click(`input[type="radio"][value="${variation}"]`)
  await waitForLatex(page, variation)
  await callback(page, view, variation, exerciseType, questionsNb)
  await page.locator('.bx-x').first().click()
}

async function waitForLatex (page: Page, model: LatexVariation | AMCVariation) {
  switch (model) {
    case 'Coopmaths':
      await page.waitForFunction(() => {
        const preElement = document.querySelector('pre')
        if (preElement && preElement.textContent) {
          return preElement.textContent.includes('\\begin{EXO}{')
        }
        return false
      })
      break
    case 'Classique':
      await page.waitForFunction(() => {
        const preElement = document.querySelector('pre')
        if (preElement && preElement.textContent) {
          return preElement.textContent.includes('\\begin{EXO}{')
        }
        return false
      })
      break
    case 'ProfMaquette':
      await page.waitForFunction(() => {
        const preElement = document.querySelector('pre')
        if (preElement && preElement.textContent) {
          return preElement.textContent.includes('\\begin{Maquette}[Fiche]{Niveau= ,Classe= ,Date=   ,Theme=Exercices}')
        }
        return false
      })
      break

    default:
      break
  }
}

async function checkAmc (page: Page, exerciseType: ExerciseType, questionsNb: number, callback: CallbackType) {
  await checkLatexVariation(page, 'AMC', 'AMCcodeGrid', exerciseType, questionsNb, callback)
  await checkLatexVariation(page, 'AMC', 'AMCassociation', exerciseType, questionsNb, callback)
  await checkLatexVariation(page, 'AMC', 'manuscrits', exerciseType, questionsNb, callback)
}
