/* eslint-disable react/prop-types */
import { User, X, Map, Wallet, Mail, Route, HandCoins } from 'lucide-react'
import { useLocalStorage } from '@uidotdev/usehooks'

export default function LocalItem({ item }) {
  const [localItems, saveLocalItems] = useLocalStorage('localItems', [])

  const deleteItem = (id) => {
    saveLocalItems(localItems.filter((item) => item.id !== id))
  }

  return (
    <div className="bg-white flex flex-col gap-2 p-2 pb-2.5 border-b border-zinc-400">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-1 text-zinc-600 text-sm rounded w-fit px-1.5 h-8 whitespace-nowrap">
          <User size={16} />{' '}
          <span className={`${item.driver.length > 14 && 'text-xs'} mr-1.5`}>{item.driver}</span>
        </div>

        <div className="flex gap-2">
          {item.timoValue && (
            <a
              title="Timokom link"
              href={item.timoValue}
              target="_blank"
              rel="noreferrer"
              className="border border-zinc-400 text-blue-800 font-medium h-8 w-8 aspect-square flex items-center justify-center rounded active:scale-95 transition-all"
            >
              T
            </a>
          )}

          <a
            title="Google Maps link"
            href={item.mapValue}
            target="_blank"
            rel="noreferrer"
            className="bg-green-600 text-white h-8 w-12 aspect-square flex items-center justify-center rounded active:scale-95 transition-all"
          >
            <Map />
          </a>

          <button
            onClick={() => deleteItem(item.id)}
            className="disabled:bg-gray-400 border border-zinc-400 text-red-600 h-8 w-8 aspect-square flex items-center justify-center rounded active:scale-95 transition-all"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      <div className="mt-1 border border-zinc-400 rounded">
        <div className="flex justify-between bg-zinc-100 border-b border-zinc-400 rounded-t text-zinc-600">
          <small className="w-1/3 text-center">Cena</small>
          <small className="w-1/3 text-center border-x border-zinc-400">Km</small>
          <small className="w-1/3 text-center">€/km</small>
        </div>
        <div className="flex justify-between text-zinc-800">
          <input
            value={item.price}
            readOnly
            type="number"
            className="w-1/3 h-7 text-center"
            placeholder="Price"
          />
          <input
            value={item.km}
            readOnly
            type="number"
            className="w-1/3 h-7 text-center border-x border-zinc-400"
            placeholder="km"
          />
          <b className="w-1/3 flex items-center justify-center h-7 text-center">
            {Number(item.price / item.km).toFixed(2)}
          </b>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="w-full flex items-center gap-1">
          <Wallet size={20} strokeWidth={1.5} /> {Number(item.price - item.km * 1.2).toFixed(2)}
        </p>

        <div className="flex items-center gap-1">
          <Mail size={20} strokeWidth={1.5} />
          <p className="text-sm">{item.info}</p>
        </div>

        <div className="flex gap-2">
          <button
            title={`Our driver will be at the loading location in ${item.arrival}.`}
            onClick={() => {
              navigator.clipboard.writeText(
                `Our driver will be at the loading location in ${item.arrival}.`
              )
            }}
            className="w-fit flex items-center gap-1 bg-gray-200 py-1 px-2 rounded active:scale-95"
          >
            <Route size={20} strokeWidth={1.5} />
            <p className="text-sm">{item.arrival}</p>
          </button>

          <button
            title={`I want to ask for ${
              Math.ceil((item.km * 1.8) / 10) * 10
            }€ for this delivery please 🙏 Do you agree?`}
            onClick={() => {
              navigator.clipboard.writeText(
                `I want to ask for ${
                  Math.ceil((item.km * 1.8) / 10) * 10
                }€ for this delivery please 🙏 Do you agree?`
              )
            }}
            className="w-fit flex items-center gap-1 bg-gray-200 py-1 px-2 rounded active:scale-95"
          >
            <HandCoins size={20} strokeWidth={1.5} />
            {Math.ceil((item.km * 1.8) / 10) * 10}
          </button>
          <button
            title="OK! What is the maximum price you can offer?"
            onClick={() => {
              navigator.clipboard.writeText(`OK! What is the maximum price you can offer?`)
            }}
            className="w-fit flex items-center gap-1 bg-gray-200 py-1 px-2 text-sm font-medium rounded active:scale-95"
          >
            MAX?
          </button>
        </div>
      </div>
    </div>
  )
}
