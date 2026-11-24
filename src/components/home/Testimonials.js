
"use client";

import { useEffect, useState } from "react";

const testimonials = [
    {
        name: "Jinal Goyani",
        country: "Canada",
        image: "/images/testimonials/student-1.jpg",
        feedback:
            "SKIK International provided excellent guidance throughout my application process. Their team supported me at every step and made my journey much easier."
    },
    {
        name: "Sambhubhai Gujarati",
        country: "Australia",
        image: "/images/testimonials/student-2.jpg",
        feedback:
            "I am grateful to the SKIK International team for their support and guidance. They helped me understand the entire process and move forward with confidence."
    },
    {
        name: "Meet Aslaliya",
        country: "UK",
        image: "/images/testimonials/student-3.jpg",
        feedback:
            "The team was helpful, professional and supportive throughout my journey. Thank you for helping me take the next step towards my international education."
    }
];

export default function Testimonials() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const current = testimonials[active];

    return (
        <section className="testimonials-section">
            <div className="testimonials-overlay" />

            <div className="testimonials-content">
                <div className="testimonials-heading">
                    <span />
                    <h2>What Our Students Say</h2>
                    <p>Real experiences. Real journeys. Real success.</p>
                </div>

                <div key={active} className="testimonial-card">
                    <img
                        src={current.image}
                        alt={current.name}
                        className="testimonial-avatar"
                    />

                    <h3>{current.name}</h3>
                    <p className="testimonial-university">
                        {current.country}
                    </p>

                    <blockquote>
                        “{current.feedback}”
                    </blockquote>
                </div>

                <div className="testimonial-dots">
                    {testimonials.map((item, index) => (
                        <button
                            key={index}
                            aria-label={`Show testimonial ${index + 1}`}
                            onClick={() => setActive(index)}
                            className={
                                active === index ? "active" : ""
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
