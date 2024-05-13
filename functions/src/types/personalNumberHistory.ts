import { TimestampType } from "../helpers/timestampToDate"

export interface PersonalNumberHistory {
  _id: string
  company_id: string
  date: TimestampType | Date | null
  delta: number
  foreign_id: string
  gamification_id: string
  id: string
  money: number
  partner_company_id: string
  personal_number: number
  points_type_id: string
  reason: string
  type: string
  user_id: string
}
