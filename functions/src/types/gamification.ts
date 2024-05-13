import { TimestampType } from "../helpers/timestampToDate"

export enum GamificationType {
  LINK = "LINK",
  SHARE = "SHARE",
  PIC = "PIC",
  TEXT = "TEXT",
  REG = "REG",
  PSH = "PSH",
  BILL = "BILL",
  NEWS = "NEWS",
  HTML = "HTML",
  GAL = "GAL",
  SURV = "SURV",
  ASURV = "ASURV",
  QR = "QR",
  EC = "EC",
  PROF = "PROF",
  BAR = "BAR",
  CARD = "CARD",
  LIST = "LIST",
  REC = "REC",
  IMG = "IMG",
  CONT = "CONT",
  FEEDB = "FEEDB",
  NOTIF = "NOTIF",
  QRSCAN = "QRSCAN",
}
export enum LinkShareType {
  N = "N",
  R = "R",
  D = "D",
  T = "T",
}

export enum LinkChoiceType {
  C = "C",
  R = "R",
  A = "A",
  N = "N",
}

export enum Language {
  EN_US = "en_US",
  PL_PL = "pl_PL",
  RU_RU = "ru_RU",
}

export enum PointsLimitPeriod {
  MINUTE = "MINUTE",
  HOUR = "HOUR",
  DAY = "DAY",
  MONTH = "MONTH",
}

export enum BillCountry {
  EN = "EN",
  PL = "PL",
}
export interface Gamification {
  _id: string
  id: number
  type: GamificationType
  company_id: string
  description: string
  tag: string
  points: number
  mainPartnerPoints: number
  productId: number
  start?: Date | TimestampType | null
  finish?: Date | TimestampType | null
  endless: number
  isGuest: number
  nonGuestRedirectType: number
  nonGuestRedirectGamificationId: number
  nonGuestRedirectUrl: string
  recommendationRedirectType: number
  recommendationRedirectGamificationId: number
  recommendationRedirectUrl: string
  isHidden: number
  isOnAllPages: number
  linkUrl: string | null
  linkDays: number
  linkShareType: LinkShareType
  linkChoiceType: LinkChoiceType
  linkText: string
  linkShareTitle: string
  linkShareText: string
  link_share_image: string
  total_limit: number
  used_limit: number
  link_points: number
  link_share_points: number
  link_like_points: number
  link_comment_points: number
  link_click_points: number
  link_only_once: number
  competition_id: number | null
  vote_points: number
  win_points: number
  bill_points: number
  new_user_points: number
  partner_new_user_points: number
  reg_anyway_points: number
  points_custom: number
  points_custom_text: string
  reg_is_give_away: number
  reg_give_away: string
  surv_initial_points: number
  share_fb_app_id: string
  image: string
  show_description: number
  bill_check_nip: number
  bill_description: string
  bill_timeout_days: number
  order_num: number
  title: string
  subtitle: string
  html: string
  login_html: string
  login_header: string
  login_html_color: string
  login_header_color: string
  reg_email: number
  reg_base_url: string
  reg_email_title: string
  reg_email_text: string
  invite_q: number
  invite_reward_per_every: number
  bill_email_title: string | null
  bill_email_text: string
  bill_ownership_warning: number
  bill_ownership_warning_text: string
  bill_embed_callback_url: string | null
  rpoints_email_title: string | null
  rpoints_email_text: string
  email_platform_name: string
  email_platform_resign: string
  news_title: string
  news_is_title_bigger: number
  news_question_wysiwyg: number
  news_question: string
  news_thanks: string
  news_is_policy: number
  news_policy_url: string
  news_css: string
  news_thankyou: number
  news_notify_email: string
  news_login_only: number
  news_login_recommendations: number
  recommendations_tag: string
  modal_time: number
  modal_text: string
  is_higher_than_survey: number
  only_invited: number
  only_mobile: number
  is_off: number
  hide_on_list: number
  share_timeout_hours: number
  modal_css: string
  modal_js: string
  blm_js: string
  ending_text: string
  is_new_version: number
  show_on_url: string
  icon: string
  is_round: number
  share_is_own_text: number
  news_social_where: string
  news_social_fb_only: number
  news_social_text: string
  news_is_phone: number
  news_need_phone: number
  news_before_email: string
  news_after_login_type: number
  news_after_login_url: string
  news_after_login_gamification_id: number
  bill_image: string | null
  bill_header: string
  bill_nip: string | null
  bill_name: string
  bill_address: string
  bill_char_w: number | null
  bill_char_h: number | null
  bill_is_confirmed: number
  bill_is_app_native_correct: number
  bill_is_app_native_scan: number
  survey_id: number
  qr_survey_id: number
  advanced_survey_id: number | null
  time_limit_number: number
  time_limit_minutes: number
  lang: Language
  likes_limit_post: number
  comments_limit_post: number
  social_limit_minutes: number
  likes_limit_number: number
  comments_limit_number: number
  qr_question_id: number | null
  advanced_scoring_conditions: string
  incoming_mail: string
  needed_gamification_ids: string
  needed_gamification_type: string
  has_text_after: number
  done_redirect_type: number
  done_redirect_gamification_id: number
  done_redirect_url: string
  done_button_text: string
  has_prev_button: number
  surv_allow_multiple_fillouts: number
  bill_embeddable: number
  bill_need_uniqueness: number
  bill_embed_domain: string
  bill_embed_callback_key: string
  master_id: number
  deleted_at: string | null
  bill_allow_fv: number
  bill_api_key: string
  bill_api_secret: string
  bill_can_mark: number
  bill_can_be_older_than_user: number
  bill_barcode_required: number
  barcodes_per_product_limit_number: number
  bill_monthly_limit_number: number
  card_loyalty_name: string | null
  is_card_initially_activated: number
  bill_card_descriptor: string
  bill_country: BillCountry
  bill_do_low_quality: number
  points_limit_amount: number | null
  points_limit_period_value: number | null
  points_limit_period: PointsLimitPeriod
  receipts_nip_limit_amount: number | null
  receipts_nip_period_value: number | null
  receipts_nip_period: PointsLimitPeriod
  notify_email_success_subject: string | null
  notify_email_success_text: string
  send_notify_email_on_success: number
  overwrite_points_description: string | null
  is_login_code: number
  add_infopages_numbers: number
  bill_force_manual: number
  bill_is_accepted_by_user: number
  hide_after_use: number
  parent_id: number | null
  allow_registration_same_ip: number
  show_after_registration_date?: Date | TimestampType | null
  show_on_main_page: number
  show_once: number
  fraud_processing: number
}
