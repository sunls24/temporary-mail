import { persistentAtom } from "@nanostores/persistent"
import { randomAddress } from "@/lib/utils.ts"
import { atom } from "nanostores"

export const $domainList = atom<string[]>([])
export const $address = persistentAtom<string>("address")
export const $history = persistentAtom<string[]>("history", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
})

export function initStore(domainList: string[]) {
  domainList && $domainList.set(domainList)
  if ($address.get()) {
    return
  }
  const cfg = localStorage.getItem("config")
  if (!cfg) {
    updateAddress(randomAddress(domainList[0]))
  } else {
    const state = JSON.parse(cfg).state
    $history.set(state.history)
    updateAddress(state.mail + state.domain)
  }
}

export function updateAddress(address: string) {
  const current = $address.get()
  $address.set(address)
  if (!current) {
    return
  }
  const history = $history.get()
  const index = history.indexOf(address)
  if (index >= 0) {
    history.splice(index, 1)
  }
  history.unshift(current)
  $history.set(history)
}
