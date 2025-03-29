import React from 'react';
import { motion } from "motion/react"
const Banner = () => {
    return (
        <div>
            <div
                className="hero min-h-96 "
                style={{
                    backgroundImage: "url(front-view-business-people-meeting.jpg)",
                }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <motion.h1

                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}

                            className="mb-5 text-5xl font-bold">Hello there</motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-5">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </motion.p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;