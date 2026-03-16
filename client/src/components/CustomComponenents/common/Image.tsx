const Image = ({ src }: { src: string }) => {
    return (
        <div className="hero-img-container h-full rounded-2xl overflow-hidden shadow">
            <img src={src} alt="Parlour image" className="w-full h-full object-cover brightness-80 sepia-25 contrast-75" />
        </div>
    )
}

export default Image