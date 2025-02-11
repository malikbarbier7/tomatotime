import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div className="text-3xl font-bold text-red-500">Hello World</div>
    </>
  )
}

export default App

