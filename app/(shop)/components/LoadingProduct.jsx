

export default function LoadingProduct() {
  return (
    <div className="w-full bg-primary drop-shadow-lg  animate-pulse">
      <section className="group relative p-6 bg-[#f6f6f6] w-full h-[350px] cursor-pointer">

        <div className="w-full h-full bg-slate-300 "></div>

        <div className="group group-hover:h-[80px] h-[55px] md:h-0 w-full group-hover:flex absolute bottom-0 left-0 bg-gray-400 bg-opacity-50 z-[1] transition-all duration-300">

          <div className="md:hidden flex group-hover:flex items-center justify-around h-full w-full p-2">
          </div>

        </div>
      </section>

      <section className="text-center text-2xl mt-2 text-white">
        {/* <h1>{name}</h1>
        <p>{price}$</p> */}
      </section>
    </div>
  )
}
