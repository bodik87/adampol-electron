import LocalItem from './components/LocalItem'
import NewItem from './components/NewItem'
import { useLocalStorage } from '@uidotdev/usehooks'

export default function App() {
  const [localItems] = useLocalStorage('localItems', [])

  return (
    <div className="pb-2">
      <NewItem />

      {localItems
        .sort((a, b) => (a.created < b.created) - (a.created > b.created))
        .map((item) => (
          <LocalItem key={item.id} item={item} />
        ))}
    </div>
  )
}
