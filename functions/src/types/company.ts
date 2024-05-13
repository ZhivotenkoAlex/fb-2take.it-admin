import { TimestampType } from "../helpers/timestampToDate"

export enum RewardLayout {
  Box = "Box",
  Rounded = "Rounded",
  Default = "Default",
  PandG = "PandG",
  Cocacola = "Cocacola",
  Cocacola2 = "Cocacola2",
  None = "None",
}

export enum Period {
  Minute = "MINUTE",
  Hour = "HOUR",
  Day = "DAY",
  Month = "MONTH",
}

export enum ActiveTab {
  Home = "home",
  ReceiptsTab = "receipts-tab",
  Cards = "cards",
  Gazetki = "gazetki",
}

export enum Currency {
  Points = "POINTS",
  PLN = "PLN",
  CZK = "CZK",
  UAH = "UAH",
  SKK = "SKK",
  EUR = "EUR",
}

export enum ScorecardLayout {
  Default = "Default",
  PandG = "PandG",
  Cocacola = "Cocacola",
}

export enum TaskLayout {
  PandG = "PandG",
  Default = "Default",
  Cocacola = "Cocacola",
}

export interface Company {
  _id: string
  name: string | null
  url_name: string
  email: string | null
  phone: string | null
  img: string | null
  description: string | null
  nip: string
  pin: number
  address: string | null
  is_full: boolean
  is_accepted: boolean
  is_demo: boolean
  created_time?: Date | TimestampType | null
  made_full_time?: Date | TimestampType | null
  modified_time?: Date | TimestampType | null
  domain: string
  entry_points: number
  presta_hash: string
  secure_key: string
  css_file: string | null
  template_file: string
  user_data_url: string | null
  user_data_secret: string
  iframe_url: string
  smtp: string
  mail_activation_subject: string | null
  mail_activation_template: string | null
  mail_register_subject: string | null
  mail_register_template: string | null
  mail_prizes: string
  mail_technical: string
  has_custom_bill: boolean
  custom_bill_smtp: string | null
  custom_bill_email: string
  has_gamification: boolean
  shown_survey: number
  rules: string | null
  prizes: string
  help: string | null
  contact_text: string | null
  company_rules: string | null
  company_rules_en: string | null
  company_rules_ru: string | null
  rules_necessarily: boolean
  is_embed_cached: boolean
  annoying_modal: boolean
  mobile_icons_on_desktop: boolean
  after_logout_popup_id: number
  background_login: string | null
  background_loyalty: string | null
  background_login_m: string | null
  background_loyalty_m: string | null
  main_color: string
  primary_color: string
  main_font_color: string
  primary_font_color: string
  menu_color: string
  menu_color_active: string
  test_mode: boolean
  map_url: string | null
  mobile_menu_order: string
  third_company_url: string
  company_url: string | null
  third_company: string | null
  login_css: string | null
  is_gamification_ranking_hidden: boolean
  is_lottery: boolean
  mobile_login_css: string | null
  template: number
  color_scheme: number
  dark_scheme: number | null
  logo_image: string | null
  login_text_1_line: string | null
  login_text_2_line: string
  login_text_below_form: string | null
  ico_awards: string | null
  ico_gamification: string | null
  ico_history: string | null
  ico_account: string | null
  ico_contact: string | null
  ico_logout: string | null
  ico_showgallery: string | null
  ico_billmap: string | null
  ico_m_map: string | null
  ico_m_bill_map: string | null
  ico_m_html: string | null
  ico_m_receipt: string | null
  ico_m_photo: string | null
  ico_m_share: string | null
  ico_m_contact: string | null
  ico_m_gallery: string | null
  ico_m_survey: string | null
  ico_m_awards: string | null
  layout_is_round_corners: boolean
  layout_background_color_outer: string
  layout_background_color_inner: string
  layout_text_color: string
  layout_link_color: string
  layout_menu_color: string
  layout_loader_color_inner: string
  layout_loader_color_outer: string
  layout_loader_color_shadow: string
  layout_gradient_start: string
  layout_gradient_end: string
  layout_icons_saturation: number
  layout_icons_hue: number
  layout_icons_brightness: number
  layout_font_font_type: string
  layout_font_url: string
  layout_login_image: string | null
  layout_login_image_width: number
  partner_logo_image: string | null
  layout_custom_css: string | null
  layout_custom_js: string | null
  layout_has_close: boolean
  mobile_policy_url: string
  email_platform_name: string | null
  email_platform_resign: string | null
  email_platform_contact: string | null
  profile_need_address: boolean
  profile_survey_id: number
  has_cookie_check: number
  type: number | null
  is_master: number
  master_id: number | null
  is_deployed: number
  new_structure_deployed: number
  prize_email_on: number
  prize_email_text_for_user: string | null
  prize_email_text_for_admin: string | null
  prize_email_admin_emails: string | null
  is_recommendations: number
  recommendations_tag: string
  time_over: number | null
  products_over: number | null
  only_email_login: number
  login_surname_filed: number
  signup_sms: string | null
  login_phone_filed: number
  smsapi_sender_name: string | null
  sms_reminder_days: number | null
  sms_reminder_template: string | null
  sms_final_positive_template: string | null
  sms_final_negative_template: string | null
  sms_accept_template: string | null
  sms_decline_template: string | null
  survey_fillout_template: string | null
  direct_signup_password: number
  is_iqos: number
  do_send_email_notifications_for_acceptance: number
  need_profile_data: string
  reward_limit_amount: number | null
  reward_limit_period_value: number | null
  reward_limit_period: Period | null
  reward_limit_total: number
  products_order: "price" | "order_num"
  redirect_after_login: string | null
  force_redirect_after_login: number
  bought_info: string | null
  bought_info_en: string | null
  bought_info_ru: string | null
  agkn_tag_bpid: string
  is_v3: number
  partner_of_company: string
  partner_of_company_id: number
  partner_accepted: number
  can_have_partners: number
  show_partnership_products: number
  secret_code: string | null
  secret_code_points: number | null
  secret_codes: number
  is_suprise_mode: number | null
  has_expenses: number
  has_loyalty: number
  default_lang: string
  expenses_bg: string | null
  vue_color_scheme: string | null
  vue_active_tab: ActiveTab | null
  vue_has_leaflets: number
  vue_has_cards: number
  vue_has_recommendations: number
  vue_has_expenses: number
  fcm_key: string | null
  block_wizard: number
  uvp_link: string | null
  is_uvp: number
  uvp_question: string | null
  uvp_steps: string
  uvp_gamification_id: number | null
  points_view_type: number | null
  enable_chat: number
  enable_chat_new: number
  anonymous_login_issuer: string
  anonymous_login_audience: string
  anonymous_login_well_known_server_base_url: string
  anonymous_login_ips: string
  force_email_popup: number
  mautic_creds: string | null
  request_fcm: number
  is_cookie_checked: number
  use_new_auth: number | null
  disable_analytics: number
  is_apple_login: number
  is_sms_login: number
  is_facebook_login: number
  is_email_login: number
  is_google_login: number
  active_game: number
  is_disabled: number
  info_color: string | null
  success_color: string | null
  warning_color: string | null
  error_color: string | null
  Login_btn_bg: string | null
  Login_btn_color: string | null
  Cancel_btn_bg: string | null
  Cancel_btn_color: string | null
  Forgot_btn_bg: string | null
  Forgot_btn_color: string | null
  Login_Tab_bg: string | null
  Login_Tab_color: string | null
  Home_Tab_bg: string | null
  Home_Tab_color: string | null
  Register_btn_bg: string | null
  Register_btn_color: string | null
  allow_social_login: number | null
  has_terms: number | null
  taskfabposition: "left" | "right" | null
  showLogo: number | null
  logoPosition: "left" | "center" | "right" | null
  shortLogo: string | null
  showMenu: number | null
  shadowColor: string | null
  shadowOpacity: string | null
  shadowDirection: "left" | "top" | "right" | "bottom" | null
  shadowSize: string | null
  rewardLayout: RewardLayout
  pointLayout: "Text" | "Shape" | null
  taskLayout: TaskLayout | null
  rewardOrder: number | null
  pointOrder: number | null
  taskOrder: number | null
  showContent: number | null
  contentOrder: number | null
  content1: string | null
  content2: string | null
  content3: string | null
  content4: string | null
  content5: string | null
  showCashbackGlobalStatuses: number | null
  showScoreCard: number | null
  scorecardOrder: number | null
  scorecardLayout: ScorecardLayout | null
  anonymous_channel_id: string | null
  mics_api_key: string | null
  mics_provider_id: string | null
  has_cashback: number | null
  cashback_currency: Currency | null
  country: string | null
  receipts_on_hold: number | null
  has_incentives: number | null
  fanpage_id: number | null
  test_fanpage_id: number | null
  android_app_url: string | null
  ios_app_url: string | null
  login_logo: string | null
  login_pic: string | null
  index_component: string | null
  is_vue_loyalty: number
  email_activation_link: number
  uvp_logo: string | null
  js_for_button: string | null
  js_button_click_event: string | null
  client_group: string | null
  main_points_name: "point" | "bon"
  custom_strings: string | null
  ch_rule_name: string | null
  user_sms_verification_required: number
  cookie_popup_enabled: number
  cookie_popup_title: string | null
  cookie_popup_text: string | null
  cookie_popup_checkbox: number
  cookie_popup_error_message: string | null
  cookie_popup_button_text: string | null
  mautic_admin_id: number | null
  header_custom_js: string | null
  is_custom_js_in_login: number
  use_simple_login: number
}
