export const Footer = () => {
  return (
    <footer className="border-t mt-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 grid grid-cols-3 gap-6 text-sm">
        <div className="flex flex-col gap-1 md:items-start items-start text-left">
          <h3 className="font-semibold text-sm md:text-base">Contact</h3>
          <p className="text-gray-500 text-xs md:text-sm">email@example.com</p>
          <p className="text-gray-500 text-xs md:text-sm">+48 123 456 789</p>
        </div>

        <div className="flex flex-col gap-1 md:items-start items-start text-left">
          <h3 className="font-semibold text-sm md:text-base">Address</h3>
          <p className="text-gray-500 text-xs md:text-sm">Main Street 626</p>
          <p className="text-gray-500 text-xs md:text-sm">Phoenix, MS 29112</p>
          <p className="text-gray-500 text-xs md:text-sm">United States</p>
        </div>

        <div className="flex flex-col gap-1 md:items-start items-start text-left">
          <h3 className="font-semibold text-sm md:text-base">Follow</h3>
          <a
            href="#"
            className="text-gray-500 hover:text-black text-xs md:text-sm"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-black text-xs md:text-sm"
          >
            Twitter
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-black text-xs md:text-sm"
          >
            Telegram
          </a>
        </div>
      </div>

      <div className="border-t py-3 text-center text-[10px] md:text-xs text-gray-500">
        © {new Date().getFullYear()} Store
      </div>
    </footer>
  )
}
