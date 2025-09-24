import { get } from 'svelte/store'
import { updateIframeSize } from '../../lib/components/sizeTools'
import { getUniqueStringBasedOnTimeStamp } from '../../lib/components/time'
import { exercicesParams, globalOptions } from '../../lib/stores/generalStore'
import { MySpreadsheetElement } from '../../lib/tableur/MySpreadSheet'
import Exercice from '../Exercice'
import { createButon, createIButton } from './_components'

export const uuid = 'tableur'
export const titre = 'Tableur'

class ressourceTableur extends Exercice {
  container: HTMLDivElement
  iframe: HTMLIFrameElement
  sheet: MySpreadsheetElement
  teacherText: HTMLDivElement
  iTooltip: HTMLButtonElement
  button: HTMLButtonElement
  constructor() {
    super()
    this.typeExercice = 'html'
    this.titre = 'Tableur'
    this.container = document.createElement('div')
    this.container.setAttribute('overflow', 'auto')
    this.iframe = document.createElement('iframe')
    this.iframe.setAttribute('width', '500')
    this.iframe.setAttribute('height', '315')
    this.iframe.setAttribute('title', 'YouTube video player')
    this.iframe.setAttribute('frameborder', '0')
    this.iframe.setAttribute(
      'allow',
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    )
    this.iframe.setAttribute('allowfullscreen', '')
    this.teacherText = document.createElement('div')
    window.addEventListener('resize', this.updateSize)
    this.container.addEventListener('addedToDom', this.updateSize)
    const timeStamp = getUniqueStringBasedOnTimeStamp('-')
    // constitution d'une ID pour mise en forme dans app.css
    this.iframe.setAttribute('id', 'iframe-tableur' + timeStamp)
    // /!\ pas de mise en formee ici !!!
    // this.iframe.classList.add('my-10')
    this.button = createButon()
    this.button.textContent = 'Valider'
    const tooltip = `Le tableur est fourni de base avec 16 cellules
    Pour en avoir plus il suffit de se déplacer dedans afin de créer des lignes ou des colonnes`
    this.sheet = MySpreadsheetElement.create({
      id: `sheet${timeStamp}`,
      minDimensions: [4, 1],
    })

    this.iTooltip = createIButton({ tooltip, direction: 'bottom' })
    this.container.append(this.sheet, this.teacherText, this.button)
    this.button.addEventListener('click', () => {
      const data = this.sheet.getData()
      this.sup = encodeURIComponent(
        JSON.stringify(
          data.filter(
            (raw: string[]) =>
              raw.filter((cel: string) => cel !== '').length > 0,
          ),
        ),
      )
      exercicesParams.update((l) => {
        if (
          this.numeroExercice !== undefined &&
          l[this.numeroExercice] !== undefined
        ) {
          l[this.numeroExercice].sup = this.sup
        }
        return l
      })
    })
  }

  private updateSize = () => {
    // same function as in video.ts
    updateIframeSize(this.container, this.iframe)
  }

  destroy() {
    window.removeEventListener('resize', this.updateSize)
    this.container.removeEventListener('addedToDom', this.updateSize)
  }

  get html() {
    if (get(globalOptions).v === 'eleve') {
      this.iTooltip.remove()
    }
    if (this.sup2 !== undefined) {
      try {
        this.teacherText.textContent = decodeURIComponent(this.sup2)
      } catch (e) {
        console.error('Invalid URI: ', this.sup2)
      }
    }
    return this.container
  }
}

export default ressourceTableur
