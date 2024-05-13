import { TimestampType } from "../helpers/timestampToDate"

export interface Purchase {
  _id: string
  curTime?: Date | TimestampType | null
  id: string
  price: string
  productId: string
  userId: string
}
