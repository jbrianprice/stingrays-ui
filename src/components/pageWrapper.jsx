import SiteNav from "./siteNav"

const PageWrapper = ({children}) => {

    return (
        <div>
            <SiteNav />
            {children}
        </div>
    )
}

export default PageWrapper