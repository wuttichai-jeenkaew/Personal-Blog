function HeroSection() {
    return (
      <main className="container px-4 py-8 lg:py-16 mx-auto ">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8" >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-center lg:text-end">
              Stay <br className="hidden lg:block" />
              Informed, <br />
              Stay Inspired
            </h1>
            <p className="text-lg text-gray-500">
              Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
              Inspiration and Information.
            </p>
          </div>
          <div className="w-[386px] ">
          <img
            src="https://s3-alpha-sig.figma.com/img/14d0/ff1e/c045ed1d618b25c84aa4327331ecdaaf?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JHQ2w3412HO781E-WpCXE8ZvxiBZ1-bU7AMS6uX1rYQxj36cHvat46R6zecHKjy6skL4NpNbBGph7hwEVKdCLK~3atoUDPhuDYCy0DjcFSNqW9pzCWHLGpwD-Cdm2R8WJwzkH9EXUJFUqJwBcLuINtfRFfB26CpDUsnVPf3Sns9-mUaDY-nJmS5pWlpES5~0CYbDWXQtIzFtPHNojdqjwqYW3WZIBdLD3vJHviJwphXnnnYVK7--WnGqf58nZfUi7lHEi-7SfLr9FXppVQ0cRSLRu5xNq2KmnSfLxIK7GAANZsnZxkahHsjy8s-RH6VUn8FjtjthHA5E58FIGd3nLA__"
            alt="UserProfile"
            className="h-[529px] w-[386px] object-cover rounded-lg shadow-lg mb-8 lg:mb-0 "
          />
          </div>
          <div className="lg:w-1/3 lg:pl-8">
            <h2 className="text-xl font-semibold mb-2">-Author</h2>
            <h3 className="text-2xl font-bold mb-4">Thompson P.</h3>
            <p className="text-gray-500 mb-4">
              I am a pet enthusiast and freelance writer who specializes in animal
              behavior and care. With a deep love for cats, I enjoy sharing
              insights on feline companionship and wellness.
            </p>
            <p className="text-gray-500">
              When I&apos;m not writing, I spend time volunteering at my local
              animal shelter, helping cats find loving homes.
            </p>
          </div>
        </div>
      </main>
    );
  }

  export default HeroSection