import { TimestampType } from "../helpers/timestampToDate"

export enum BillStatus {
  RejectionByClientSideError = -5,
  RejectedByIntegrationPartner = -4,
  RejectedByUser = -3,
  RejectedByModerator = -2,
  RejectedByAutomation = -1,
  Awaiting = 0,
  AcceptedByAutomation = 1,
  AcceptedByModerator = 2,
  AcceptedByUser = 3,
  AcceptedByIntegrationPartner = 4,
}

interface Product {
  name: string
  number: number
  price_single: number
  price_total: number
  vat_code: string
}

export interface GamificationBill {
  _id: string
  id: string
  gamification_id: string
  api_id: string | null
  prev_api_id: string
  txt_api_id: string | null
  bill_image: string | null
  all_api_ids: string
  all_max_difference: number
  admin: number
  user_id: number
  temporary_user_id: number | null
  header: string
  nip: string
  name: string
  address: string
  is_corrected: number
  was_corrected: number
  description: string
  lat: string
  lng: string
  sum: number
  match_score: number
  nip_score: number
  matched: number
  date?: TimestampType | Date | null
  btime: string
  cash: string | null
  number: string | null
  code: string | null
  products_string?: string
  locations_string: string
  text_string: string | null
  header_text_string: string | null
  title_1: string | null
  title_2: string | null
  address1_city: string | null
  address1_code: string | null
  address1_number: string | null
  address1_street: string | null
  address2_city: string | null
  address2_code: string | null
  address2_number: string | null
  address2_street: string | null
  real_address_city: string | null
  real_address_code: string | null
  real_address_number: string | null
  real_address_street: string | null
  real_nip: string | null
  is_original: number
  similarity_index_id: string
  most_similar_id: string
  most_similar_similarity_level: number
  marked_by_user_to_recheck: string
  time_added?: TimestampType | Date | null
  time_processed?: TimestampType | Date | null
  is_nip_match: number
  is_processed: number
  is_finished: number
  is_success: number
  status: BillStatus
  user_comment: string | null
  is_retriable: number
  got_points: number
  points: number
  store_id: number | null
  shop_name: string
  comment: string
  is_visible: number
  is_wydatki: number
  been_changed: number
  score: number
  old_score: number
  original_nip: string
  original_date: string
  original_number: string
  original_sum: string
  original_cash: string
  original_btime: string
  original_width: number
  original_height: number
  event_id: number
  check_results: string
  is_fv: number
  is_b2b: number
  is_card: number
  was_notification_sent: number
  sender_id: number
  counter: number
  same_shop_day_count: number
  infopage_id: number | null
  device_id: number | null
  previous_scan_id: number
  blovly_lottery: number | null
  blovly_lottery_2: number | null
  info: string | null
  might_be_fraud: number
  admin_comment: string | null
  cca_proceeded: number
  products?: Array<Product>
}
