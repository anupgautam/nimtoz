const SidebarTest = () => {
    return (
        <>
            <div
                id="hs-application-sidebar"
                className="
    hs-overlay 
    fixed inset-y-0 start-0 z-[60] 
    h-full 
    bg-white border-e border-gray-200
    transition-all duration-300 ease-in-out 
    w-[80px] lg:w-[260px] 
    hover:w-[260px] 
    flex flex-col items-center lg:items-start
    overflow-hidden
  "
                role="dialog"
                tabIndex={-1}
                aria-label="Sidebar"
            >
                <nav className="flex flex-col space-y-4 mt-10">
                    <a href="/page1" className="flex items-center space-x-2">
                        <span className="icon">
                            {/* Icon for Page 1 */}
                            🏠
                        </span>
                        <span className="hidden lg:inline-block">Page 1</span>
                    </a>

                    <a href="/page2" className="flex items-center space-x-2">
                        <span className="icon">
                            {/* Icon for Page 2 */}
                            📁
                        </span>
                        <span className="hidden lg:inline-block">Page 2</span>
                    </a>

                    <a href="/page3" className="flex items-center space-x-2">
                        <span className="icon">
                            {/* Icon for Page 3 */}
                            ⚙️
                        </span>
                        <span className="hidden lg:inline-block">Page 3</span>
                    </a>
                </nav>
            </div>

        </>
    )
}
export default SidebarTest