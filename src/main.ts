import 'boxicons/css/boxicons.min.css'
import './app.css'
import App from './components/App.svelte'
import './bugsnag'
import './modules/stats'
import { mount } from "svelte";

const app = mount(App, {
  target: document.getElementById('appMathalea') as HTMLElement
})

export default app
