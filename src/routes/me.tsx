import { createFileRoute } from '@tanstack/react-router'
import { useMe } from '../shared/api/hooks/useMe.ts'

export const Route = createFileRoute('/me')({
  component: UserPage
})

function UserPage() {
  const { data, isLoading, isError } = useMe()

  if (isLoading) return <div className="text-center">Loading...</div>
  if (isError || !data) return <div className="text-center">Unauthorized</div>

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="flex items-center gap-6">
        <img
          src={data.image}
          alt={data.username}
          className="w-24 h-24 rounded-full"
        />

        <div>
          <h1 className="text-2xl font-semibold">
            {data.firstName} {data.lastName}
          </h1>
          <p className="text-gray-500">@{data.username}</p>
          <p className="text-sm text-gray-500">{data.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-xl flex flex-col gap-2">
          <h2 className="font-semibold">Personal</h2>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
          <p>Age: {data.age}</p>
          <p>Gender: {data.gender}</p>
          <p>Blood: {data.bloodGroup}</p>
          <p>Height: {data.height}</p>
          <p>Weight: {data.weight}</p>
        </div>

        <div className="border p-4 rounded-xl flex flex-col gap-2">
          <h2 className="font-semibold">Address</h2>
          <p>{data.address.address}</p>
          <p>
            {data.address.city}, {data.address.state}
          </p>
          <p>{data.address.postalCode}</p>
        </div>

        <div className="border p-4 rounded-xl flex flex-col gap-2">
          <h2 className="font-semibold">Company</h2>
          <p>{data.company.name}</p>
          <p>{data.company.department}</p>
          <p>{data.company.title}</p>
        </div>

        <div className="border p-4 rounded-xl flex flex-col gap-2">
          <h2 className="font-semibold">Bank</h2>
          <p>Card: **** {data.bank.cardNumber.slice(-4)}</p>
          <p>Expire: {data.bank.cardExpire}</p>
          <p>Currency: {data.bank.currency}</p>
        </div>

        <div className="border p-4 rounded-xl flex flex-col gap-2">
          <h2 className="font-semibold">Crypto</h2>
          <p>{data.crypto.coin}</p>
          <p className="text-xs break-all">{data.crypto.wallet}</p>
        </div>
      </div>
    </div>
  )
}
