import { TimestampType } from "../helpers/timestampToDate"

enum NotifyPeriod {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ALL = "ALL",
}

export interface Fan {
  _id: string
  company_id: string
  user_id: string
  is_admin: number
  is_loyalty: number
  time?: Date | TimestampType | null | string
  time_backup?: Date | TimestampType | null | string
  size: number
  cnt: number
  recommendation_user_id: string
  recommendation_gamification_id: string
  has_logged_in: number
  creation_browser_hash: string
  is_newsletter: number
  newsletter_time?: Date | TimestampType | null | string
  money: number
  can_notify: number
  notify_period: NotifyPeriod
  seen_help: number
  entry_ip: string | null
  entry_gamification_id: string
  sent_final_sms: number
  last_sent_inactivity_sms?: Date | TimestampType | null | string
  entry_point: string
  entry_referer: string
  entry_source: string | null
  event_id: string
  signup_sms: string | null
  time_over: number | null
  products_over: number | null
  device_token: string | null
  unseen_points: number
  new_user: number
  new_user_vue: number
  gdpr: string
  mid: number | null
  cashback_points: number | null
  invite_code: string | null
  joined_code: string | null
  cashback_name: string | null
  cashback_bank_account: string | null
  tax_id: string | null
  is_blocked: number
  blocked_at?: Date | TimestampType | null | string
  admin_comment: string | null
  current_profile_id: string
  all_profile_ids: string
  archived_at?: Date | TimestampType | null | string
  archived_by: number | string | null
}
