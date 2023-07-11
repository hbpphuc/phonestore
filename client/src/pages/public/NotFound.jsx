import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <section className="w-full h-full flex justify-center py-10 bg-white border-t">
            <div className="text-center">
                <div className="bg-404 w-full h-[400px] bg-center bg-no-repeat">
                    <h1 className="text-center text-[80px] ">404</h1>
                </div>

                <div className="mt-[-50px]">
                    <h3 className="text-[80px]">Look like you're lost</h3>

                    <p>The page you are looking for not avaible!</p>

                    <Link to="/" className="inline-block my-5 text-white p-[10px_20px] bg-main hover:brightness-95">
                        Go to Home
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default NotFound
