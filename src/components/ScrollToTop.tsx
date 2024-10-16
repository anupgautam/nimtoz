import ScrollToTop from 'react-scroll-up'


const ScrollToTopComponent = () => {
    return (
        <div className="relative z-[300]">
            <ScrollToTop showUnder={160}>
                <p className='font-bold cursor-pointer text-4xl hover:border-2 text-white bg-orange-400 hover:bg-orange-500 rounded-full hover:border-orange-600 hover:rounded-full p-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                    </svg>
                </p>
            </ScrollToTop>
        </div>
    )
}
export default ScrollToTopComponent