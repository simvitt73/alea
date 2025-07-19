// Important ! afin de ne pas instancier 2 fois THREE, et d'utiliser celui de AFrame et de bénéficier des types de THREE
// Il est indispensable de l'importer de cette manière depuis solidesThreeJs.ts

import {
  createEdgesFromGeometry,
  createMeshFromGeometry,
  createPrismGeometry,
  createPyramidGeometry,
  createTruncatedPyramidGeometry,
  THREE, type THREEType
} from './solidesThreeJs'

/**
 * Classe pour visualiser une scène 3D avec Three.js
 * SceneViewer.ts : Intégration Three.js avec rendu en 3 passes (pointillés, faces, traits pleins)
 * @auhor Jean-Claude LHOTE
 */
export class SceneViewerThreeJs {
  public readonly id: string
  private _container: HTMLElement
  private renderer: THREEType.WebGLRenderer
  private scene: THREEType.Scene
  private camera: THREEType.PerspectiveCamera
  private controls: any
  private width: number
  private height: number
  private rig: THREEType.Object3D
  private rigPosition: THREEType.Vector3
  private cameraDistance: number
  private rigRotationY: number = 0
  private rigRotationX: number = 0
  private minDistance: number = 2
  private maxDistance: number = 20

  constructor (container?: HTMLElement, width = 400, height = 400) {
    // Génère un id unique (préfixe utile pour le debug)
    this.id = 'scenejs-' + (typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 10))
    this._container = container || document.body
    this.width = width
    this.height = height

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('#DDD')

    this.rigPosition = new THREE.Vector3(0, 0, 0)
    this.cameraDistance = 8

    this.rig = new THREE.Object3D()
    this.rig.position.copy(this.rigPosition)
    this.scene.add(this.rig)

    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
    this.camera.position.set(1, 0.5, this.cameraDistance)
    this.camera.lookAt(this.rig.position)

    this.rig.add(this.camera)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(width, height)
    // Ajoute l'id sur le canvas pour le retrouver dans le DOM
    this.renderer.domElement.id = this.id
    this.renderer.domElement.style.display = 'none'
    this._container.appendChild(this.renderer.domElement)
    // 4. Lumière
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(2, 3, 1)
    this.scene.add(light)
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.4))

    this.animate()

    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }
    let lastTouchDistance = 0

    const canvas = this.renderer.domElement

    // Drag souris
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true
      previousMousePosition = { x: e.clientX, y: e.clientY }
      canvas.style.cursor = 'grabbing'
    })
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - previousMousePosition.x
      const deltaY = e.clientY - previousMousePosition.y
      this.rigRotationY -= deltaX * 0.5
      this.rigRotationX -= deltaY * 0.5
      this.rigRotationX = Math.max(-80, Math.min(80, this.rigRotationX))
      previousMousePosition = { x: e.clientX, y: e.clientY }
    })
    document.addEventListener('mouseup', () => {
      isDragging = false
      canvas.style.cursor = 'grab'
    })

    // Molette zoom
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault()
      this.cameraDistance += e.deltaY * 0.01
      this.cameraDistance = Math.max(this.minDistance, Math.min(this.maxDistance, this.cameraDistance))
    })

    // Touches
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      } else if (e.touches.length === 2) {
        const [t1, t2] = e.touches
        lastTouchDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
      }
    }, { passive: false })

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x
        const deltaY = e.touches[0].clientY - previousMousePosition.y
        this.rigRotationY -= deltaX * 0.5
        this.rigRotationX -= deltaY * 0.5
        this.rigRotationX = Math.max(-80, Math.min(80, this.rigRotationX))
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      } else if (e.touches.length === 2) {
        const [t1, t2] = e.touches
        const currentDistance = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
        const delta = currentDistance - lastTouchDistance
        this.cameraDistance -= delta * 0.01
        this.cameraDistance = Math.max(this.minDistance, Math.min(this.maxDistance, this.cameraDistance))
        lastTouchDistance = currentDistance
      }
    }, { passive: false })

    canvas.addEventListener('touchend', () => {
      isDragging = false
      lastTouchDistance = 0
    }, { passive: false })
  }

  set container (newContainer: HTMLElement) {
    if (this._container && this.renderer.domElement.parentNode === this._container) {
      this._container.removeChild(this.renderer.domElement)
    }
    this._container = newContainer
    this._container.appendChild(this.renderer.domElement)
    this.renderer.domElement.style.display = 'block'
  }

  get container () {
    return this._container
  }

  private applyPolygonOffset (mesh: THREEType.Mesh) {
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    for (const mat of materials) {
      mat.polygonOffset = true
      mat.polygonOffsetFactor = 1
      mat.polygonOffsetUnits = 1
    }
  }

  addWireframePrism (
    sides: number,
    radius: number,
    bottom: number,
    top: number,
    withBottomBase = false,
    withTopBase = false,
    material?: THREEType.Material
  ) {
    const geometry = createPrismGeometry(sides, radius, bottom, top, withBottomBase, withTopBase)
    const mesh = createMeshFromGeometry(geometry, material)
    this.applyPolygonOffset(mesh)
    const edgesDashed = createEdgesFromGeometry(geometry, true)
    const edgesSolid = createEdgesFromGeometry(geometry, false)

    mesh.renderOrder = 0
    edgesDashed.renderOrder = 1
    edgesSolid.renderOrder = 2

    this.scene.add(mesh)
    this.scene.add(edgesDashed)
    this.scene.add(edgesSolid)
  }

  addWireframePyramid (
    sides: number,
    radius: number,
    bottom: number,
    top: number,
    withBase = false,
    material?: THREEType.Material
  ) {
    const geometry = createPyramidGeometry(sides, radius, bottom, top, withBase)
    // Le mesh doit être créé avec dashed = false et le material
    const mesh = createMeshFromGeometry(geometry, material)
    this.applyPolygonOffset(mesh)
    const edgesDashed = createEdgesFromGeometry(geometry, true)
    const edgesSolid = createEdgesFromGeometry(geometry, false)

    mesh.renderOrder = 0
    edgesDashed.renderOrder = 1
    edgesSolid.renderOrder = 2

    this.scene.add(mesh)
    this.scene.add(edgesDashed)
    this.scene.add(edgesSolid)
  }

  addWireframeTruncatedPyramid (
    sides: number,
    bottomRadius: number,
    topRadius: number,
    bottom: number,
    top: number,
    withBottomBase = false,
    withTopBase = false,
    material?: THREEType.Material
  ): void {
    const geometry = createTruncatedPyramidGeometry(sides, bottomRadius, topRadius, bottom, top, withBottomBase, withTopBase)
    const mesh = createMeshFromGeometry(geometry, material)
    this.applyPolygonOffset(mesh)
    const edgesDashed = createEdgesFromGeometry(geometry, true)
    const edgesSolid = createEdgesFromGeometry(geometry, false)

    mesh.renderOrder = 0
    edgesDashed.renderOrder = 1
    edgesSolid.renderOrder = 2

    this.scene.add(mesh)
    this.scene.add(edgesDashed)
    this.scene.add(edgesSolid)
  }

  animate () {
    // Appliquer la rotation du rig
    this.rig.rotation.y = THREE.MathUtils.degToRad(this.rigRotationY)
    this.rig.rotation.x = THREE.MathUtils.degToRad(this.rigRotationX)
    // Mettre à jour la distance caméra
    this.camera.position.set(1, 0.5, this.cameraDistance)
    this.camera.lookAt(this.rig.position)
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => this.animate())
  }

  showSceneAt (parentElement: HTMLElement) {
    this.container = parentElement
  }

  setRigPosition (x: number, y: number, z: number) {
    this.rig.position.set(x, y, z)
  }
}
