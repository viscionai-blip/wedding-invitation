import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
    { src: "/gallery/moment_1.jpg", alt: "Our Moment" },
    { src: "/gallery/moment_2.jpg", alt: "Us" },
    { src: "/gallery/moment_3.jpg", alt: "Together" },
    { src: "/gallery/moment_4.jpg", alt: "Celebration" },
    { src: "/gallery/moment_5.jpg", alt: "Love" },
    { src: "/gallery/moment_6.jpg", alt: "Memories" },
    { src: "/gallery/moment_7.jpg", alt: "Joy" },
    { src: "/gallery/moment_8.jpg", alt: "Laughter" },
    { src: "/gallery/moment_9.jpg", alt: "Forever" },
    { src: "/gallery/moment_10.jpg", alt: "Journey" },
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <section className="py-12 px-4 relative z-10">
            <div className="flex items-center justify-center mb-10">
                <span className="h-px w-12 bg-white/30"></span>
                <span className="mx-4 font-script text-3xl text-gold drop-shadow-md">Our Moments</span>
                <span className="h-px w-12 bg-white/30"></span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        layoutId={`gallery-image-${index}`}
                        onClick={() => setSelectedImage({ ...img, index })}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            delay: index * 0.05,
                            duration: 0.6,
                            ease: "easeOut"
                        }}
                        whileHover="hover"
                        className={`relative rounded-xl overflow-hidden shadow-lg border border-gold/10 group cursor-pointer
                            ${index === 0 ? 'col-span-2 row-span-2' : ''} 
                            ${index === 3 ? 'row-span-2' : ''}
                        `}
                    >
                        {/* Glass Overlay on Hover */}
                        <motion.div
                            className="absolute inset-0 bg-burgundy/20 z-10"
                            initial={{ opacity: 0 }}
                            variants={{ hover: { opacity: 1 } }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Shine Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent z-20"
                            initial={{ x: '-100%', opacity: 0 }}
                            variants={{
                                hover: {
                                    x: '100%',
                                    opacity: 1,
                                    transition: { duration: 0.8, ease: "easeInOut" }
                                }
                            }}
                        />

                        <motion.img
                            src={img.src}
                            alt={img.alt}
                            variants={{
                                hover: { scale: 1.08 }
                            }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover aspect-square"
                        />

                        {/* Decorative Corner (Gold) */}
                        <motion.div
                            className="absolute bottom-3 right-3 w-2 h-2 bg-gold/80 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)] z-20"
                            initial={{ scale: 0, opacity: 0 }}
                            variants={{ hover: { scale: 1, opacity: 1 } }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
                    >
                        <button
                            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all z-50"
                        >
                            <X size={24} />
                        </button>

                        <motion.img
                            layoutId={`gallery-image-${selectedImage.index}`}
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-screen object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
