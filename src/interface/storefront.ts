export interface StorefrontEntry {
  name: string
  item: string
}
export interface Item {
  section: string
  storefronts: StorefrontEntry[]
}

export interface Layout {
  data: Item[]
}
