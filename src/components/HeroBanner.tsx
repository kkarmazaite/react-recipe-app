
export default function HeroBanner() {
    return (
        <section
            className="h-100 bg-cover bg-center"
            style={{ 
                backgroundImage: `
                    linear-gradient(to right, #1E1B17, transparent),
                    url('/hero-banner-img.jpg')
                ` 
            }}
        >
            <div className="container h-full">
                <div className="flex h-full w-3/4 lg:w-1/3 flex-col justify-center text-white">
                    <h1>
                        Discover Delicious Recipes
                    </h1>

                    <p className="mt-4">
                        Search for recipes and find your next favourite meal
                    </p>
                </div>
            </div>
        </section>
    )
}
