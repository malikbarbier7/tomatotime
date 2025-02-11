import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import './assets/main.css'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div className="relative w-[300px] h-[300px]">
        <div className="grid grid-cols-2 gap-[10px] p-[10px] pb-[1px]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-[130px] h-[130px] bg-black" />
          ))}
        </div>
        <div className="text-xs text-right text-black pr-2 pt-1">
          made by @M with love
        </div>
      </div>
    </>
  )
}

export default App

