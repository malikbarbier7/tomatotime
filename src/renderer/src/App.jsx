import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import './assets/main.css'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <div className="flex flex-col items-center justify-center m-1 ">
      <div className="grid grid-cols-2 gap-1 mb-0">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-[130px] h-[120px] bg-black" />
        ))}
      </div>
      <div className="w-full text-xs text-right text-black mt-1 pr-3">
        made by @M with love
      </div>
    </div>
  )
}

export default App

