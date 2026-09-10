export const ZODIAC = [
  { name: 'Capricorn (Jadi)', from: [12, 22], to: [1, 19], trait: 'zimmedar aur nazam-o-zabt wale', element: 'Zameen' },
  { name: 'Aquarius (Dalw)', from: [1, 20], to: [2, 18], trait: 'khud-mukhtar aur naye khayalat wale', element: 'Hawa' },
  { name: 'Pisces (Hoot)', from: [2, 19], to: [3, 20], trait: 'hassas aur tasawwur-pasand', element: 'Pani' },
  { name: 'Aries (Hamal)', from: [3, 21], to: [4, 19], trait: 'himmati aur jald faisla karne wale', element: 'Aag' },
  { name: 'Taurus (Sor)', from: [4, 20], to: [5, 20], trait: 'sabr wale aur practical', element: 'Zameen' },
  { name: 'Gemini (Jauza)', from: [5, 21], to: [6, 20], trait: 'baaton ke maahir aur curious', element: 'Hawa' },
  { name: 'Cancer (Saratan)', from: [6, 21], to: [7, 22], trait: 'jazbaati aur khayal rakhne wale', element: 'Pani' },
  { name: 'Leo (Asad)', from: [7, 23], to: [8, 22], trait: 'pur-etimaad aur leader tabiyat', element: 'Aag' },
  { name: 'Virgo (Sumbula)', from: [8, 23], to: [9, 22], trait: 'mehnati aur baareek-bini wale', element: 'Zameen' },
  { name: 'Libra (Meezan)', from: [9, 23], to: [10, 22], trait: 'mutwazin aur insaaf-pasand', element: 'Hawa' },
  { name: 'Scorpio (Aqrab)', from: [10, 23], to: [11, 21], trait: 'gehri soch wale aur pur-jazba', element: 'Pani' },
  { name: 'Sagittarius (Qaus)', from: [11, 22], to: [12, 21], trait: 'azaad-khayal aur safar-pasand', element: 'Aag' },
]

export function getZodiac(dob) {
  const [, m, d] = dob.split('-').map(Number)
  for (const z of ZODIAC) {
    const [fm, fd] = z.from
    const [tm, td] = z.to
    if (fm > tm) {
      if ((m === fm && d >= fd) || (m === tm && d <= td)) return z
    } else if ((m === fm && d >= fd) || (m === tm && d <= td) || (m > fm && m < tm)) {
      return z
    }
  }
  return ZODIAC[0]
}

export function getLifePath(dob) {
  const digits = dob.replace(/-/g, '').split('').map(Number)
  let sum = digits.reduce((a, b) => a + b, 0)
  while (sum > 9) sum = String(sum).split('').reduce((a, b) => a + Number(b), 0)
  return sum
}

export function getLuckyNumber(name, dob) {
  const str = (name + dob).toLowerCase().replace(/[^a-z0-9]/g, '')
  let sum = 0
  for (let i = 0; i < str.length; i++) sum += str.charCodeAt(i)
  while (sum > 9) sum = String(sum).split('').reduce((a, b) => a + Number(b), 0)
  return sum || 1
}
