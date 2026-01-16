export type Mode = "rewear" | "dowear" | "dowear-plus"

export type Category = "batik" | "kebaya" | "selendang" | "streetwear" | "outerwear"

export type Condition = "like-new" | "good" | "fair"

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "Free Size"

export interface Product {
  id: string
  title: string
  category: Category
  size: Size
  condition: Condition
  price: number
  mode: Mode
  image: string
  description: string
  seller: string
  createdAt: string
  status: "pending" | "approved" | "sold" | "donated"
  fundDestination?: "disaster" | "education" | "general"
}

export interface DonationEvent {
  id: string
  title: string
  type: "disaster" | "charity"
  description: string
  target: number
  raised: number
  image: string
  startDate: string
  endDate: string
  needs: string[]
  distributed: boolean
}

export interface DonationFund {
  total: number
  thisMonth: number
  goal: number
  activeEvents: number
}

export interface ImpactLog {
  id: string
  date: string
  title: string
  description: string
  amount?: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  badges: string[]
  joinedAt: string
}

export interface Purchase {
  id: string
  product: Product
  date: string
  total: number
}

export interface Donation {
  id: string
  product?: Product
  event?: DonationEvent
  type: "dowear" | "dowear-plus"
  date: string
  status: "pending" | "shipped" | "received" | "distributed"
  trackingSteps: { title: string; date: string; completed: boolean }[]
}

export const categories: { value: Category; label: string }[] = [
  { value: "batik", label: "Batik" },
  { value: "kebaya", label: "Kebaya" },
  { value: "selendang", label: "Selendang" },
  { value: "streetwear", label: "Streetwear" },
  { value: "outerwear", label: "Outerwear" },
]

export const conditions: { value: Condition; label: string }[] = [
  { value: "like-new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
]

export const sizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"]

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Vintage Batik Tulis Solo",
    category: "batik",
    size: "M",
    condition: "like-new",
    price: 85000,
    mode: "rewear",
    image: "/vintage-batik-tulis-solo-traditional-indonesian-fa.jpg",
    description:
      "Beautiful hand-drawn batik from Solo with traditional parang motif. Perfect condition, worn only once.",
    seller: "Sari Indah",
    createdAt: "2026-01-10",
    status: "approved",
  },
  {
    id: "2",
    title: "Modern Kebaya Kutubaru",
    category: "kebaya",
    size: "S",
    condition: "good",
    price: 75000,
    mode: "rewear",
    image: "/modern-kebaya-kutubaru-indonesian-traditional-dres.jpg",
    description: "Elegant kutubaru kebaya in soft pink. Great for formal occasions.",
    seller: "Maya Putri",
    createdAt: "2026-01-08",
    status: "approved",
  },
  {
    id: "3",
    title: "Silk Selendang Songket",
    category: "selendang",
    size: "Free Size",
    condition: "like-new",
    price: 95000,
    mode: "rewear",
    image: "/silk-selendang-songket-indonesian-traditional-scar.jpg",
    description: "Luxurious songket selendang with gold thread details from Palembang.",
    seller: "Dewi Ayu",
    createdAt: "2026-01-12",
    status: "approved",
  },
  {
    id: "4",
    title: "Oversized Denim Jacket",
    category: "outerwear",
    size: "L",
    condition: "good",
    price: 65000,
    mode: "rewear",
    image: "/oversized-denim-jacket-vintage-streetwear.jpg",
    description: "Classic oversized denim jacket with distressed details. Y2K vibes!",
    seller: "Rina Cool",
    createdAt: "2026-01-05",
    status: "approved",
  },
  {
    id: "5",
    title: "Graphic Tee Collection",
    category: "streetwear",
    size: "M",
    condition: "fair",
    price: 35000,
    mode: "dowear-plus",
    image: "/vintage-graphic-tee-streetwear-band-shirt.jpg",
    description: "Donated graphic tee for the education fund. Platform will set final price.",
    seller: "Platform",
    createdAt: "2026-01-14",
    status: "approved",
    fundDestination: "education",
  },
  {
    id: "6",
    title: "Warm Winter Sweater",
    category: "outerwear",
    size: "XL",
    condition: "good",
    price: 0,
    mode: "dowear",
    image: "/warm-cozy-winter-sweater-knit.jpg",
    description: "Cozy sweater donated for disaster relief distribution.",
    seller: "Anonymous",
    createdAt: "2026-01-13",
    status: "approved",
  },
  {
    id: "7",
    title: "Batik Mega Mendung",
    category: "batik",
    size: "L",
    condition: "like-new",
    price: 90000,
    mode: "rewear",
    image: "/batik-mega-mendung-cirebon-cloud-pattern.jpg",
    description: "Iconic Cirebon batik with mega mendung cloud pattern. Vibrant colors!",
    seller: "Budi Santoso",
    createdAt: "2026-01-11",
    status: "approved",
  },
  {
    id: "8",
    title: "Casual Hoodie Black",
    category: "streetwear",
    size: "M",
    condition: "good",
    price: 45000,
    mode: "dowear-plus",
    image: "/black-hoodie-casual-streetwear.jpg",
    description: "Simple black hoodie donated to general fund.",
    seller: "Platform",
    createdAt: "2026-01-09",
    status: "approved",
    fundDestination: "general",
  },
]

export const mockEvents: DonationEvent[] = [
  {
    id: "1",
    title: "Flood Relief - Central Java",
    type: "disaster",
    description: "Providing warm clothing and essentials for flood victims in Central Java region.",
    target: 5000000,
    raised: 3250000,
    image: "/flood-relief-volunteers-helping-community.jpg",
    startDate: "2026-01-01",
    endDate: "2026-02-28",
    needs: ["Warm clothes", "Children's wear", "Rain gear", "Blankets"],
    distributed: false,
  },
  {
    id: "2",
    title: "Back to School Campaign",
    type: "charity",
    description: "Uniforms and school clothes for underprivileged students starting the new semester.",
    target: 3000000,
    raised: 1800000,
    image: "/children-school-uniforms-education-charity.jpg",
    startDate: "2026-01-15",
    endDate: "2026-03-15",
    needs: ["School uniforms", "White shirts", "Sports attire"],
    distributed: false,
  },
  {
    id: "3",
    title: "Orphanage Support - Jakarta",
    type: "charity",
    description: "Monthly clothing donation for orphanages across Jakarta.",
    target: 2000000,
    raised: 2000000,
    image: "/orphanage-children-happy-smiling.jpg",
    startDate: "2025-12-01",
    endDate: "2026-01-31",
    needs: ["Casual wear", "Sleepwear", "Shoes"],
    distributed: true,
  },
]

export const mockDonationFund: DonationFund = {
  total: 12500000,
  thisMonth: 2150000,
  goal: 20000000,
  activeEvents: 2,
}

export const mockImpactLogs: ImpactLog[] = [
  {
    id: "1",
    date: "2026-01-15",
    title: "Clothing distributed to flood victims",
    description: "250 pieces of clothing distributed to 3 villages in Central Java",
    amount: 1500000,
  },
  {
    id: "2",
    date: "2026-01-10",
    title: "School uniforms delivered",
    description: "100 school uniforms delivered to Yayasan Pendidikan Harapan",
    amount: 800000,
  },
  {
    id: "3",
    date: "2025-12-28",
    title: "Winter clothing drive completed",
    description: "Successfully collected and distributed winter clothing for mountain communities",
    amount: 1200000,
  },
  {
    id: "4",
    date: "2025-12-15",
    title: "Orphanage monthly donation",
    description: "Monthly clothing package delivered to 5 orphanages in Jakarta",
    amount: 600000,
  },
]

export const mockUser: User = {
  id: "1",
  name: "Anisa Rahmawati",
  email: "anisa@email.com",
  avatar: "/young-indonesian-woman-smiling-profile-photo.jpg",
  badges: ["Impact Donor", "Top Seller", "Eco Warrior"],
  joinedAt: "2025-06-15",
}

export const mockPurchases: Purchase[] = [
  {
    id: "1",
    product: mockProducts[0],
    date: "2026-01-12",
    total: 91800,
  },
  {
    id: "2",
    product: mockProducts[3],
    date: "2026-01-08",
    total: 70200,
  },
]

export const mockDonations: Donation[] = [
  {
    id: "1",
    product: mockProducts[5],
    type: "dowear",
    date: "2026-01-13",
    status: "received",
    trackingSteps: [
      { title: "Donation submitted", date: "2026-01-13", completed: true },
      { title: "Shipping label created", date: "2026-01-13", completed: true },
      { title: "Package shipped", date: "2026-01-14", completed: true },
      { title: "Received at warehouse", date: "2026-01-15", completed: true },
      { title: "Distributed to beneficiary", date: "", completed: false },
    ],
  },
  {
    id: "2",
    product: mockProducts[4],
    type: "dowear-plus",
    date: "2026-01-14",
    status: "pending",
    trackingSteps: [
      { title: "Donation submitted", date: "2026-01-14", completed: true },
      { title: "Item approved", date: "2026-01-14", completed: true },
      { title: "Listed for sale", date: "", completed: false },
      { title: "Item sold", date: "", completed: false },
      { title: "Funds added to pool", date: "", completed: false },
    ],
  },
]

export const mockPendingListings: Product[] = [
  {
    id: "p1",
    title: "Vintage Batik Pekalongan",
    category: "batik",
    size: "M",
    condition: "good",
    price: 70000,
    mode: "rewear",
    image: "/vintage-batik-pekalongan-colorful-pattern.jpg",
    description: "Colorful batik from Pekalongan with floral motifs.",
    seller: "Hendra",
    createdAt: "2026-01-15",
    status: "pending",
  },
  {
    id: "p2",
    title: "Bomber Jacket Army",
    category: "outerwear",
    size: "L",
    condition: "fair",
    price: 0,
    mode: "dowear-plus",
    image: "/army-green-bomber-jacket-streetwear.jpg",
    description: "Army green bomber jacket donated for disaster fund.",
    seller: "Platform",
    createdAt: "2026-01-15",
    status: "pending",
    fundDestination: "disaster",
  },
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function calculateFees(price: number) {
  const adminFee = price * 0.08
  const donationFee = price * 0.07
  const sellerNet = price * 0.85
  return { adminFee, donationFee, sellerNet, total: price }
}
