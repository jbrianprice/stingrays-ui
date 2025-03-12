import SiteNav from "./siteNav"

const PageWrapper = ({ children }) => {
    return (
        <div>
            <SiteNav />
            <div className=" p-6 md:pl-10 w-full">{children}</div>
        </div>
    )
}

export default PageWrapper
