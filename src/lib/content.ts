/**
 * ============================================================================
 * SITE COPY & DATA — Chat-Link Communication Limited
 * ============================================================================
 * Most of this is REAL, supplied by the client: founding year (2014), the
 * Turkey/USA registrations, coverage regions and countries, partner names,
 * mission and vision, the founder's message, and all contact details.
 *
 * Anything I wrote or inferred is marked `TODO: confirm` inline. The technical
 * specifications (SIP/SMPP parameters) are the biggest one — they are plausible
 * industry defaults, NOT Chat-Link's actual interconnect values, and must be
 * checked against your NOC before publishing.
 * ============================================================================
 */

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Globe2,
  Headphones,
  MessageSquare,
  PhoneCall,
  Route,
  Settings2,
  ShieldCheck,
  Signal,
  Waypoints,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Home — hero                                                                 */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Premium telecom services since 2014",
  headline: "Bridging worlds with premium telecom services",
  subhead:
    "Chat-Link Communication Limited delivers wholesale voice termination and A2P SMS to carriers, operators, and enterprises — with direct routes into the markets most providers struggle to reach.",
  primaryCta: { label: "Get started", href: "/contact" },
  secondaryCta: { label: "Discover our solutions", href: "/services" },
};

/* -------------------------------------------------------------------------- */
/* Home — why choose Chat-Link                                                 */
/* -------------------------------------------------------------------------- */

export type Highlight = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export const whyChooseUs: Highlight[] = [
  {
    title: "Worldwide reach, local impact",
    body: "Global coverage with real depth in Africa, the Middle East, South Asia, and Europe — the regions where route quality actually varies.",
    icon: Globe2,
  },
  {
    title: "Crystal clear communication",
    body: "High-quality, reliable voice termination over direct interconnects with our carrier partners, not resold grey routes.",
    icon: PhoneCall,
  },
  {
    title: "Scalable custom SMS",
    body: "Bidirectional A2P SMS connectivity that scales with your traffic, tailored to the needs of operators, resellers, brands, and OTT providers.",
    icon: MessageSquare,
  },
  {
    title: "24/7 always-on support",
    body: "Round-the-clock support from people who know your routes, so a degraded destination gets attention at 3am, not next business day.",
    icon: Headphones,
  },
];

/* -------------------------------------------------------------------------- */
/* Home / About — company                                                      */
/* -------------------------------------------------------------------------- */

export const about = {
  intro:
    "Since 2014, Chat-Link Communication Limited has been at the forefront of the telecommunications industry, offering a full range of Voice and SMS services across the globe. Our registration in Turkey and the USA underpins our global reach and commitment to excellence.",
  body: "We serve businesses of all sizes by providing reliable and innovative communication solutions that meet the demands of a constantly evolving market. Whether you're looking for international voice termination, wholesale SMS, or customized telecom services, we're here to ensure your communication flows without disruption.",
  mission:
    "To drive global business growth by offering the most reliable and efficient telecom services available.",
  vision:
    "To be the world's leading provider of innovative telecom solutions, transforming how businesses communicate.",
};

/* -------------------------------------------------------------------------- */
/* Services                                                                    */
/* -------------------------------------------------------------------------- */

export type SpecSheet = {
  filename: string;
  language: string;
  code: string;
};

export type Service = {
  id: string;
  eyebrow: string;
  name: string;
  tagline: string;
  body: string;
  closing?: string;
  icon: LucideIcon;
  features: { title: string; body: string }[];
  spec: SpecSheet;
};

export const services: Service[] = [
  {
    id: "voice",
    eyebrow: "Voice",
    name: "Wholesale Voice Termination",
    tagline: "Superior call quality on direct global routes",
    body: "At Chat-Link, we specialize in providing premium wholesale voice termination services, tailored to meet the needs of carriers, VoIP providers, and telecom operators around the globe. With our extensive network of direct routes and deep industry expertise, we guarantee unmatched call quality, reliability, and cost-effective solutions.",
    closing:
      "With a focus on delivering top-tier services and maximizing your profitability, Chat-Link is your trusted partner for wholesale voice solutions. Let us handle your voice traffic while you focus on growing your business.",
    icon: PhoneCall,
    features: [
      {
        title: "A-Z voice termination",
        body: "Comprehensive coverage for voice termination across all major destinations.",
      },
      {
        title: "Direct routes",
        body: "High-quality connections, particularly across Africa, the Middle East, and other key regions, ensuring consistent and clear communication.",
      },
      {
        title: "CLI and non-CLI routes",
        body: "Flexible routing options to suit your specific requirements, whether you need CLI for number presentation or non-CLI for cost optimization.",
      },
      {
        title: "Carrier-grade monitoring",
        body: "Routes are watched continuously for ASR and ACD movement, so a degrading destination is caught before your customers report it.",
        // TODO: confirm — describes intended NOC practice; verify wording with ops.
      },
    ],
    spec: {
      filename: "SIP interconnect",
      language: "ini",
      code: `; Wholesale voice — SIP trunk interconnect
; TODO: confirm — these are industry-standard defaults, NOT Chat-Link's
; live interconnect values. Replace with the real ones from your NOC.

[signalling]
protocol        = SIP over UDP / TCP
port            = 5060
authentication  = IP-based (whitelist) or digest
registration    = not required for static IP peering

[media]
codecs          = G.711 a-law, G.711 u-law, G.729
dtmf            = RFC 2833
fax             = T.38
packetization   = 20 ms

[routing]
number_format   = E.164, international, no leading +
cli             = CLI and non-CLI routes available
capacity        = concurrent channels agreed per interconnect

[quality]
reporting       = ASR / ACD monitored per destination
support         = 24/7 NOC escalation`,
    },
  },
  {
    id: "sms",
    eyebrow: "Messaging",
    name: "SMS Services",
    tagline: "Fast, secure, reliable A2P messaging",
    body: "Deliver fast, secure, and reliable messaging for both wholesale and enterprise clients. Our bidirectional A2P SMS connectivity, backed by advanced real-time monitoring and a focus on emerging markets, empowers Mobile Network Operators, resellers, brands, and OTT providers to communicate without friction.",
    closing:
      "Whether you are terminating aggregated traffic or sending one-time passcodes to your own users, we route it over connections built for deliverability rather than lowest cost alone.",
    icon: MessageSquare,
    features: [
      {
        title: "Bidirectional A2P connectivity",
        body: "Two-way application-to-person messaging, so replies and opt-outs reach you rather than disappearing into the network.",
      },
      {
        title: "Real-time monitoring",
        body: "Advanced real-time monitoring of throughput and delivery, so a failing route is identified while the traffic is still flowing.",
      },
      {
        title: "Emerging-market focus",
        body: "Deep coverage in the markets other providers treat as an afterthought, including Africa, the Middle East, and South Asia.",
      },
      {
        title: "Wholesale and enterprise",
        body: "Connectivity for Mobile Network Operators and resellers, and direct messaging for brands and OTT providers.",
      },
    ],
    spec: {
      filename: "SMPP interconnect",
      language: "ini",
      code: `; A2P SMS — SMPP interconnect
; TODO: confirm — these are industry-standard defaults, NOT Chat-Link's
; live bind parameters. Replace with the real ones from your NOC.

[bind]
protocol        = SMPP v3.4
bind_type       = transceiver (TX / RX also supported)
port            = 2775
credentials     = system_id and password issued per account
ip_whitelist    = required

[addressing]
source_ton_npi  = 5 / 0 (alphanumeric sender ID)
dest_ton_npi    = 1 / 1 (international E.164)
encoding        = GSM 03.38 and UCS-2 (Unicode)
concatenation   = UDH, long messages supported

[delivery]
dlr             = registered_delivery = 1
throughput      = TPS agreed per account
window_size     = agreed per bind

[quality]
monitoring      = real-time delivery and throughput
support         = 24/7 NOC escalation`,
    },
  },
  {
    id: "tailored",
    eyebrow: "Custom",
    name: "Tailored Telecom Solutions",
    tagline: "Built around your infrastructure, not ours",
    body: "Customized solutions designed to integrate seamlessly with your existing business infrastructure for optimal efficiency and savings. If your traffic profile, margins, or destinations don't fit a standard product, we will build the interconnect around them.",
    icon: Settings2,
    features: [
      {
        title: "Custom routing plans",
        body: "Route mixes assembled around your destinations and quality targets rather than a fixed rate card.",
      },
      {
        title: "Infrastructure integration",
        body: "We interconnect with the switch, platform, or aggregator you already run — no migration required.",
      },
      {
        title: "Cost optimization",
        body: "Blended CLI and non-CLI routing where it saves money, premium routes where quality is non-negotiable.",
      },
      {
        title: "Dedicated commercial contact",
        body: "A named person on the commercial side who knows your account and can move on pricing.",
        // TODO: confirm — verify this matches how the commercial team actually works.
      },
    ],
    spec: {
      filename: "Getting connected",
      language: "ini",
      code: `; How an interconnect gets set up

[1_contact]
reach_us        = interconnection@chat-link.net
tell_us         = destinations, monthly volume, quality target
                  (CLI / non-CLI, A2P sender IDs, expected TPS)

[2_commercials]
we_send         = rate card for your destinations
you_confirm     = routes and commercial terms

[3_technical]
exchange        = IP addresses for whitelisting
                  SIP trunk details or SMPP bind credentials
test_traffic    = live test window before commercial traffic

[4_live]
monitoring      = ASR / ACD and delivery watched from day one
support         = 24/7 NOC escalation`,
    },
  },
];

/* -------------------------------------------------------------------------- */
/* Global coverage                                                             */
/* -------------------------------------------------------------------------- */

export type Region = {
  name: string;
  countries: string;
  icon: LucideIcon;
};

export const coverage = {
  intro:
    "With strategic registrations and operations in Turkey and the USA, Chat-Link Communication Limited operates a network covering key regions across Africa, the Middle East, and beyond. Our direct partnerships with major telecom operators mean we deliver premium-quality service even in the most challenging markets.",
  regions: [
    {
      name: "Africa",
      countries: "Ghana, Libya, Zimbabwe",
      icon: Globe2,
    },
    {
      name: "Middle East",
      countries: "UAE, Saudi Arabia, Jordan, Syria",
      icon: Signal,
    },
    {
      name: "South Asia",
      countries: "Afghanistan, Pakistan, Bangladesh",
      icon: Waypoints,
    },
    {
      name: "Europe",
      countries: "Major countries across Europe",
      icon: Route,
    },
  ] satisfies Region[],
};

/* -------------------------------------------------------------------------- */
/* Partners                                                                    */
/* -------------------------------------------------------------------------- */

export type Partner = {
  name: string;
  /** Logo file in /public/partners. Intrinsic width/height prevent layout shift. */
  logo: string;
  width: number;
  height: number;
};

/**
 * Real partner logos, sourced from the client's own existing site
 * (chat-link.net) and served locally from /public/partners. Logos that shipped
 * with a baked-in white background were knocked out to transparency so they can
 * render as clean monochrome silhouettes in both light and dark mode.
 * TODO: confirm each partner has agreed to be named publicly on the new site.
 */
export const partners: Partner[] = [
  { name: "Etisalat", logo: "/partners/etisalat.png", width: 1000, height: 1000 },
  { name: "Sipstatus", logo: "/partners/sipstatus.webp", width: 198, height: 121 },
  { name: "Qatama", logo: "/partners/qatama.png", width: 463, height: 220 },
  { name: "MMD Smart", logo: "/partners/mmd-smart.png", width: 514, height: 220 },
  { name: "GOmobit", logo: "/partners/gomobit.png", width: 457, height: 110 },
  { name: "IDT Corporation", logo: "/partners/idt.png", width: 787, height: 524 },
  { name: "BICS", logo: "/partners/bics.png", width: 440, height: 220 },
];

/* -------------------------------------------------------------------------- */
/* Trust signals                                                               */
/* -------------------------------------------------------------------------- */

export const trustPoints: Highlight[] = [
  {
    title: "Operating since 2014",
    body: "More than a decade interconnecting carriers, VoIP providers, and enterprises across four continents.",
    icon: ShieldCheck,
  },
  {
    title: "Registered in Turkey and the USA",
    body: "Two registered entities underpinning our reach, with offices in İstanbul and Pembroke Pines, Florida.",
    icon: Globe2,
  },
  {
    title: "Direct operator partnerships",
    body: "Interconnects with major telecom operators, so traffic rides direct routes rather than long resale chains.",
    icon: Activity,
  },
];

/* -------------------------------------------------------------------------- */
/* Blog                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * TODO: no blog posts were supplied. This is an empty-state placeholder so the
 * route in your nav resolves. Wire it to a CMS or MDX files when you have
 * content, or remove the Blog link from `mainNav` until then.
 */
export const blogPosts: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}[] = [];
