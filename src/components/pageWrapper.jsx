import SiteNav from "./siteNav"

const PageWrapper = ({ children }) => {
    return (
        <div className="relative">
            <SiteNav />
            <div className=" p-6 md:pl-10 w-full">{children}</div>
        </div>
    )
}

export default PageWrapper
