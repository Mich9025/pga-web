'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

// Image Carousel Component
const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    {
      src: "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-Terraza-exteriorVF-I.A1.8-JPG-scaled.jpg",
      alt: "Terraza Exterior Unique Rosales"
    },
    {
      src: "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-BillarC2VF-I.A-1.8-JPG-scaled.jpg",
      alt: "Sala de Billar Unique Rosales"
    },
    {
      src: "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-Piscina-VF-I.A-0.7-JPG-scaled.jpg",
      alt: "Piscina Unique Rosales"
    },
    {
      src: "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-BarC2VF-I.A-1.5-JPG-scaled.jpg",
      alt: "Bar Unique Rosales"
    },
    {
      src: "https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-CoworkingC2VF-I.A-1.8-JPG-scaled.jpg",
      alt: "Coworking Unique Rosales"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-full w-full">
      {/* Images */}
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentImage ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const LumePage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  // Removed parallax effects

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí se puede agregar la lógica de envío
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div className="relative">
        {/* Video Section */}
        <motion.section 
          className="relative h-screen w-full overflow-hidden sticky top-0 z-50 bg-white"
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/VIDEO-LANDING-LUME-PGA.mov" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="relative z-20 h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center"
            >
              <div>
                <Image
                  src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Logo-final-de-LUME_Blanco.png"
                  alt="Unique Lume Logo"
                  width={200}
                  height={80}
                  className="mx-auto"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

      

        {/* Section 2 - LUME se adapta a ti */}
        <motion.section 
          className="relative overflow-hidden w-screen h-screen sticky top-0 z-40 bg-white"
        >
          <motion.div 
            className="absolute inset-0 bg-[url(https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-Sala-de-reuniones-C3VF-I.A-0.7-JPG-scaled.jpg)] bg-cover md:bg-contain bg-no-repeat bg-center md:bg-left"
          />
          <motion.section 
            className="h-full w-full flex items-center justify-center px-4 md:px-8 relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
        
        <div className="w-full">
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-right mb-12 max-w-7xl mx-auto px-4 md:px-8"
          >
            <h2 className="text-2xl md:text-5xl font-bold text-stone-900 mb-4 flex flex-col md:flex-row items-center justify-center md:justify-end gap-2 md:gap-4">
              <Image
                src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/LUME-sin-fondo.png"
                alt="Lume Logo"
                width={130}
                height={100}
                className="flex items-baseline"
              />
              <span className="text-center md:text-left">Luz que transforma</span>
            </h2>
          </motion.div>
          
          {/* Six Image Grid */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 mb-8 md:mb-16 p-2 md:p-4 bg-white w-full md:w-[70%] md:ml-auto"
          >
            {/* Biblioteca/Coworking */}
            <div className="relative h-[200px] md:h-[500px] overflow-hidden rounded-lg">
              <Image
                src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-LobbyVF-I.A-0.7-JPG-scaled.jpg"
                alt="Coworking Space"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Gimnasio */}
            <div className="relative h-[200px] md:h-[500px] overflow-hidden rounded-lg">
              <Image
                src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-GimnasioVF-I.A-0.7-JPG-scaled.jpg"
                alt="Gimnasio"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Sala de estar */}
            <div className="relative h-[200px] md:h-[500px] overflow-hidden rounded-lg">
              <Image
                src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-GimnasioC2VF-I.A-0.7-JPG-scaled.jpg"
                alt="Sala de estar"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Terraza */}
            <div className="relative h-[200px] md:h-[500px] overflow-hidden rounded-lg">
              <Image
                src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-Terraza-exteriorVF-I.A1.8-JPG-scaled.jpg"
                alt="Terraza Exterior"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Billar */}
            <div className="relative h-[200px] md:h-[500px] overflow-hidden rounded-lg">
              <Image
                src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-BillarC2VF-I.A-1.8-JPG-scaled.jpg"
                alt="Sala de Billar"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Bar */}
            <div className="relative h-[200px] md:h-[500px] overflow-hidden rounded-lg">
              <Image
                src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-BarC2VF-I.A-1.5-JPG-scaled.jpg"
                alt="Bar"                
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
          
          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-right max-w-7xl mx-auto px-4 md:px-8 mb-8"
          >
            {/* <p className="text-xl text-stone-700 mb-2">
              Porque el verdadero lujo está
            </p> */}
            <h3 className="text-xl md:text-4xl font-light text-stone-900">
              en <span className="font-bold">vivir a tu manera.</span>
            </h3>
          </motion.div>
        </div>
          </motion.section>
        </motion.section>    

      {/* Section 1 - Ilumina historias */}
      {/* <motion.section 
        className="py-24 px-4 md:px-8 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-96 lg:h-[550px] rounded-none overflow-hidden shadow-xl border border-stone-200"
            >
              <Image
                src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-Piscina-VF-I.A-0.7-JPG-scaled.jpg"
                alt="Fondo Unique Rosales"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-8 right-8 w-40 h-32 rounded-none overflow-hidden shadow-xl border border-white z-20">
                <Image
                  src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-PiscinaC2-VF-I.A-0.7-JPG-scaled.jpg"
                  alt="Bar Unique Rosales"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-8 left-8 z-20">
                <p className="text-white text-lg font-light tracking-wider bg-black/60 px-6 py-3 uppercase">Luz, Diseño y Caracter</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="border-l border-[#c8a456] pl-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-6xl font-extralight text-stone-900 mb-6 tracking-tight"
                >
                  "Espacios
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-xl text-stone-500 mb-8 font-light tracking-wide"
                >
                  Cada linea revela <br />revela diseño y personalidad."
                  
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 border border-stone-200 shadow-md"
              >
                <p className="text-stone-700 leading-relaxed font-light text-lg">
                  Se convierte en una metáfora visual y emocional del proyecto: un edificio que no solo se construye con concreto, si no que también ilumina aspiraciones, refleja estatus y proyecta un nuevo estándar de vida urbana sofisticada.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>       */}
      
        {/* Image Carousel Section */}
        <motion.section 
          className="relative h-screen w-full overflow-hidden sticky top-0 z-30 bg-white"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="h-full w-full"
          >
            <ImageCarousel />
          </motion.div>
        </motion.section>

        {/* Quote Section */}
      <motion.section 
        className="py-32 px-4 mt-8 md:px-8 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="text-6xl md:text-8xl text-stone-300 font-serif absolute -top-16 left-1/2 transform -translate-x-1/2 select-none">
              "
            </div>
            <h2 className="text-4xl md:text-6xl  text-stone-800  relative z-10">
              {/* <Image
                src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/LUME-sin-fondo.png"
                alt="Lume Logo"
                width={130}
                height={48}
                className="flex items-baseline"
              /> */}
              Más cerca de todo lo que necesitas
            </h2>
            {/* <div className="w-100 h-1 bg-[#fbbf24] mx-auto"></div> */}
          </motion.div>
        </div>
      </motion.section>  

        {/* Ubicación Section */}
        <motion.section 
          className="bg-white relative overflow-hidden w-screen h-screen sticky top-0 z-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="absolute inset-0 z-0"
          />
          <div className="w-full h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
              {/* Columna izquierda - Imagen con dirección */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative h-full overflow-hidden"
              >                
                <Image
                  src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/07/Unique_Rosales-CDLP-Piscina-VF-I.A-0.7-JPG-scaled.jpg"
                  alt="Edificio LUME"
                  fill
                  className="brightness-50 object-cover"
                />
                {/* Overlay con dirección */}
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end">
                  <div className="text-white p-32">
                    <h3 className="text-[#fbbf24] text-lg font-bold mb-2 tracking-wide uppercase">
                      Ubicación
                    </h3>
                    <div className="bg-white/0 rounded-md p-4">
                      <h4 className="text-2xl font-bold mb-1">Calle 74 #3-35</h4>                    
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Columna derecha - Mapa */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8234567890123!2d-74.0567890!3d4.6482837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a123456789a%3A0x123456789abcdef0!2sCalle%2074%20%233-35%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1sen!2sco!4v1234567890123!5m2!1sen!2sco"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Formulario de Contacto */}
        <motion.section 
          className="py-20 px-4 md:px-8 bg-gradient-to-br from-stone-800 to-stone-900 relative overflow-hidden sticky top-0 z-10"
        >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", staggerChildren: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10"
        >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              Contacta con nosotros
            </h2>
            <p className="text-xl text-stone-300">
              Descubre tu nuevo hogar en Unique Lume
            </p>
          </motion.div>
          
          <motion.form
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="nombre" className="block text-white mb-2 font-medium">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="telefono" className="block text-white mb-2 font-medium">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                placeholder="Tu número de teléfono"
                required
              />
            </div>
            
            <div className="mb-8">
              <label htmlFor="mensaje" className="block text-white mb-2 font-medium">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Cuéntanos sobre tu interés en Unique Lume..."
                required
              />
            </div>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#fbbf24] text-white py-4 px-8 rounded-md font-semibold text-lg hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Enviar Mensaje
            </motion.button>
          </motion.form>
        </div>
        </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          className="bg-stone-900 py-8 px-4 md:px-8 relative overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative z-10"
          >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">              
                <p className="text-stone-400 text-sm">
                  {new Date().getFullYear()} - © Todos los derechos reservados.
                </p>
              </div>
              <div className="text-stone-500 text-xs">             
                <Image
                  src="https://slategray-mosquito-366047.hostingersite.com/wp-content/uploads/2025/05/Logo-final-de-PGA-SVG-negro-horizontal.svg"
                  alt="PGA Logo"
                  width={60}
                  height={60}
                  className="opacity-100 invert"
                />
              </div>
            </div>
          </div>
          </motion.div>
        </motion.footer>
      </div>
    </div>
  );
};

export default LumePage;