export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum AgeRange {
  JUNIOR = "JUNIOR",
  MIDDLE = "MIDDLE",
  SENIOR = "SENIOR",
}

export enum Status {
  UNVERIFIED = "UNVERIFIED",
  VERIFIED = "VERIFIED",
  NEED_VERIFICATION = "NEED_VERIFICATION",
  NONE = "",
}

export interface User {
  _id: string
  id: number
  reusableToken: string
  token: string | null
  email: string | null
  tmp_email: string | null
  contact_email: string
  contact_email_confirmed: number
  password: string
  full_name: string
  name: string | null
  surname: string | null
  gender: Gender
  age_range: AgeRange
  phone: string | null
  tmp_phone: string | null
  contact_phone: string | null
  city: string | null
  country: string
  age: number | null
  birthday: Date | null
  address: string | null
  street_number: string
  apartment_number: string
  street_address: string
  zip_code: string
  nick: string
  is_user: number | null
  is_admin: number
  is_superadmin: number
  is_banned: number
  ip: string | null
  avatar: string | null
  recomendation: string | null
  is_b2b_accepted: number
  is_accepted: number | null
  created_at: Date
  access_token: string
  can_do_contests: number
  email_hash: string | null
  has_logged_in: number
  entry_point: string
  entry_referer: string
  registration_method: string
  is_demo: number
  sync_counter: number
  tmp_repaired: number
  lang: string
  plugin_hash: string | null
  email_confirmed: number
  updated_at: Date
  wydatki_token: string
  fb_id: string | null
  google_id: string | null
  apple_id: string | null
  subscribes: string
  message_add: number
  message_rate: number
  is_archivised: number
  recomendation_user_id: number
  time_over_remind_sent: number
  customer_id: string | null
  expires_at: string | null
  refresh_token: string | null
  invite_code: string | null
  cashback_points: number | null
  auth_token: string | null
  smscode: string | null
  phone_confirmed: number
  pg_unique_id: string | null
  pg_janrain_id: string | null
  pg_access_token: string | null
  status: Status
  is_fraud: number
  face_id: string | null
  is_social_login: number
}
