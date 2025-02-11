import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import './assets/main.css'
import background1 from './assets/images/background1.png'
import background2 from './assets/images/background2.png'
import background3 from './assets/images/background3.png'
import background4 from './assets/images/background4.png'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  const backgrounds = [background1, background2, background3, background4]

  return (
    <div className="flex flex-col items-center justify-center m-1, bg-gray-400">
      <div className="grid grid-cols-2 gap-1 mb-0 mt-2">
        {backgrounds.map((bg, i) => (
          <div
            key={i}
            className="w-[140px] h-[120px] bg-cover bg-center rounded-lg"
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
      </div>
      <div className="w-full text-xs text-right text-black mt-1 pr-3">
        made by @M with love
      </div>
    </div>
  )
}

export default App

