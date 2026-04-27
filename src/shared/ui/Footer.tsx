export const Footer = () => {
  return (
    <footer className="border-t mt-12">
      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div className="flex flex-col gap-2 md:items-start items-center text-center md:text-left">
          <h3 className="font-semibold text-base">Contact</h3>
          <p className="text-gray-500">email@example.com</p>
          <p className="text-gray-500">+48 123 456 789</p>
        </div>

        <div className="flex flex-col gap-2 md:items-start items-center text-center md:text-left">
          <h3 className="font-semibold text-base">Address</h3>
          <p className="text-gray-500">Main Street 626</p>
          <p className="text-gray-500">Phoenix, MS 29112</p>
          <p className="text-gray-500">United States</p>
        </div>

        <div className="flex flex-col gap-2 md:items-start items-center text-center md:text-left">
          <h3 className="font-semibold text-base">Follow</h3>
          <a href="#" className="text-gray-500 hover:text-black">
            Instagram
          </a>
          <a href="#" className="text-gray-500 hover:text-black">
            Twitter
          </a>
          <a href="#" className="text-gray-500 hover:text-black">
            Telegram
          </a>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Store. All rights reserved.
      </div>
    </footer>
  )
}
