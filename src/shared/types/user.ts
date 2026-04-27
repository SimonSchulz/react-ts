export type Address = {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
}

export type Bank = {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export type Company = {
  department: string
  name: string
  title: string
}

export type Crypto = {
  coin: string
  wallet: string
  network: string
}

export type Hair = {
  color: string
  type: string
}

export type User = {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string

  bloodGroup: string
  height: number
  weight: number
  eyeColor: string

  hair: Hair

  address: Address
  bank: Bank
  company: Company
  crypto: Crypto

  role: string
}
