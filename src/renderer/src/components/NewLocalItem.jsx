/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { User, Save } from 'lucide-react'
import { useLocalStorage } from '@uidotdev/usehooks'

export const DRIVERS_LIST = [
  { id: 1, driver: 'JACEK KENDZIA' },
  { id: 2, driver: 'SERHII SERDIUKOV' },
  { id: 3, driver: 'OLEH PANASIUK' },
  { id: 4, driver: 'TARAS RUDY' },
  { id: 5, driver: 'OLEKSANDR BOHDAN' },
  { id: 6, driver: 'ANDRII VALIDUDA' },
  { id: 7, driver: 'WASIL MYKHALCHUK' },
  { id: 8, driver: 'WITALII SHEVKOPLIAS' },
  { id: 9, driver: 'IGOR SEMEREI' },
  { id: 10, driver: 'DYMITRO KHALIUK' },
  { id: 11, driver: 'LEONID ZAPOROSHCHENKO' }
]

export default function NewLocalItem({ number }) {
  const [km, setKm] = useState('')
  const [price, setPrice] = useState('')
  const [timoValue, setTimoValue] = useState('')
  const [mapValue, setMapValue] = useState('')
  const [info, setInfo] = useState('')
  const [arrival, setArrival] = useState('')
  const [driver, setDriver] = useState(DRIVERS_LIST[0].driver)
  const [driversList, setDriversList] = useState(false)

  const newLocalItem = {
    id: uuidv4(),
    km,
    price,
    timoValue,
    mapValue,
    driver,
    info,
    arrival,
    created: Date.now()
  }

  const [localItems, saveLocalItems] = useLocalStorage('localItems', [])

  const handleLocalSave = () => {
    if ((km, price, mapValue, info)) {
      saveLocalItems([...localItems, newLocalItem])
      setKm('')
      setPrice('')
      setMapValue('')
      setTimoValue('')
      setInfo('')
      setArrival('')
    }
  }
  return (
    <>
      {driversList && (
        <div onClick={() => setDriversList(false)} className="bg-black/30 fixed inset-0 z-20" />
      )}
      <div className="bg-gradient-to-b from-white to-yellow-50 flex flex-col p-2 pb-2.5 border-b border-zinc-400">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 relative">
            <button
              onClick={() => setDriversList(true)}
              className="bg-white flex items-center justify-center gap-1 border border-zinc-400 text-zinc-600 text-xs font-medium rounded w-fit px-1.5 h-7"
            >
              <User size={16} /> <span className="mr-1.5">{driver}</span>
            </button>
            {driversList && (
              <div className="absolute top-full translate-y-1 left-0 w-fit bg-white text-brack text-sm shadow-md rounded-md overflow-hidden z-30">
                {DRIVERS_LIST.sort((a, b) => (a.driver > b.driver) - (a.driver < b.driver)).map(
                  (driver) => (
                    <button
                      key={driver.id}
                      onClick={() => {
                        setDriversList(false)
                        setDriver(driver.driver)
                      }}
                      className="text-left px-3 py-1.5 w-full hover:bg-gray-100 whitespace-nowrap"
                    >
                      {driver.driver}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <b className="text-xs">{number}</b>

          <div className="flex gap-4">
            <button
              disabled={!km || !price || !mapValue || !info}
              onClick={handleLocalSave}
              className="disabled:bg-gray-200 disabled:text-gray-400 bg-green-600 text-white h-7 w-12 aspect-square flex items-center justify-center rounded active:scale-95 transition-all"
            >
              <Save size={20} />
            </button>
          </div>
        </div>

        <div className="mt-2 border border-zinc-400 rounded-t">
          <div className="flex justify-between bg-zinc-100 border-b border-zinc-400 rounded-t text-zinc-600">
            <small className="w-1/3 text-center">Km</small>
            <small className="w-1/3 text-center border-x border-zinc-400">Cena</small>
            <small className="w-1/3 text-center">€/km</small>
          </div>
          <div className="flex justify-between text-zinc-800 bg-white rounded-b">
            <input
              value={km}
              onChange={(e) => setKm(e.target.value)}
              type="number"
              className="w-1/3 h-7 text-center"
              placeholder="km"
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="w-1/3 h-7 text-center border-x border-zinc-400"
              placeholder="Cena"
            />
            <b className="w-1/3 flex items-center justify-center h-7 text-center">
              {price && km ? (price / km).toFixed(2) : '-'}
            </b>
          </div>
        </div>

        <div className="flex text-sm">
          <input
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            type="text"
            placeholder="Email, info"
            className="w-full px-1.5 h-8 border-b border-l border-zinc-400 bg-white outline-none"
          />
          <input
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            type="text"
            placeholder="До места загрузки..."
            className="w-full px-1.5 h-8 border-b border-x border-zinc-400 bg-white outline-none"
          />
        </div>

        <div className="flex text-sm">
          <input
            value={mapValue}
            onChange={(e) => setMapValue(e.target.value)}
            type="text"
            placeholder="Google Maps link"
            className="w-full rounded-bl px-1.5 h-8 border-b border-l border-zinc-400 bg-white outline-none"
          />
          <input
            value={timoValue}
            onChange={(e) => setTimoValue(e.target.value)}
            type="text"
            placeholder="Timocom link"
            className="w-full rounded-br px-1.5 h-8 border-b border-x border-zinc-400 bg-white outline-none"
          />
        </div>
      </div>
    </>
  )
}
