export interface IPoint {
  id: string
  coordinates: [number, number]
  title: string
  address: string
  label: string
  selected: boolean
}

export type IPointsList = IPoint[]
