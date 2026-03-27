const Image = ({ src }: { src: string }) => {
    return (
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            <img
                src={src}
                alt="Parlour visual"
                className="w-full h-full object-cover grayscale-[50%] sepia-[10%] brightness-75 hover:grayscale-0 hover:sepia-0 hover:scale-105 transition-all duration-700 ease-out"
            />
        </div>
    )
}

export default Image