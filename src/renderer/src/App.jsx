import LocalItem from './components/LocalItem'
import NewLocalItem from './components/NewLocalItem'
import { useLocalStorage } from '@uidotdev/usehooks'

export default function App() {
  const [localItems] = useLocalStorage('localItems', [])

  return (
    <div className="pb-2">
      <NewLocalItem number={1} />
      <NewLocalItem number={2} />

      {localItems
        .sort((a, b) => (a.created < b.created) - (a.created > b.created))
        .map((item) => (
          <LocalItem key={item.id} item={item} />
        ))}
    </div>
  )
}
