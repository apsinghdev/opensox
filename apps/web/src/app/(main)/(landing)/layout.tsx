import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section>
            {children}
        </section>
    )
}

export default Layout