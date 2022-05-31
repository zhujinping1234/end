export type Tree = {
  [x: string]: any
  name: string
  children?: Tree[]
}

export type routerAttr = {
  slotList: Tree[]
  page: string
  finput: string
}
