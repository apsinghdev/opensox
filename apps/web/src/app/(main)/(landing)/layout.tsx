import React from 'react'
import Navbar from '@/components/landing-sections/navbar'
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section>
            <Navbar />
            {children}
        </section>
    )
}

export default Layout