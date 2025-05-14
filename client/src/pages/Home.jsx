import React from 'react';
import { FiSearch } from 'react-icons/fi';
import Navbar from '../components/Navbar';
const HomePage = () => {
  const customerSuccessData = [
    { label: 'Properties Sold', value: '200+' },
    { label: 'Happy Clients', value: '10K+' },
    { label: 'Cities Covered', value: '15+' },
  ];

  const features = [
    { title: 'Find Your Dream Property', description: 'Search properties with ease.' },
    { title: 'Connect with Agents', description: 'Get expert advice instantly.' },
    { title: 'Smart Financials', description: 'Explore loan options.' },
  ];

  const properties = [
    { title: 'Serene Villa', price: '$850,000', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
    { title: 'Urban Heights', price: '$1,200,000', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2' },
    { title: 'Lakeside Cottage', price: '$650,000', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', text: 'Found my dream home in just a week!', rating: 5 },
    { name: 'Michael Brown', text: 'The agents were incredibly helpful.', rating: 5 },
    { name: 'Emily Davis', text: 'Smooth process from start to finish.', rating: 4 },
  ];

  const faqs = [
    { question: 'How do I search for properties?', answer: 'Use the search bar to enter your preferred location.' },
    { question: 'What documents do I need to sell?', answer: 'You’ll need property deeds and identification.' },
    { question: 'How can I contact an agent?', answer: 'Use the "Find an Agent" feature.' },
  ];

  return (
    <div className="bg-[#121212] text-[#fff] min-h-screen">
      {}
      <Navbar />

      {}
      <section
        className="relative flex flex-col md:flex-row items-center justify-start px-6 md:px-16 py-20 bg-[#121212] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-[#000000] opacity-50"></div> {}
        <div className="relative max-w-xl space-y-6 z-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Agents. <br /> Tours. <br /> Loans. <br /> <span className="text-[#703BF7]">Homes.</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Enter your preferred area and discover your dream property today.
          </p>
          <div className="flex items-center mt-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Enter an address, neighborhood, city, or ZIP code"
                className="w-full px-4 py-3 pl-12 pr-4 rounded-l-full text-black outline-none border-none focus:ring-2 focus:ring-[#703BF7]"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            </div>
            <button className="bg-[#703BF7] px-6 py-3 rounded-r-full hover:bg-[#5f2cc6] transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Customer Success Data */}
      <section className="px-6 md:px-16 py-10 bg-[#1a1a1a]">
        <div className="flex justify-around text-center">
          {customerSuccessData.map((data, index) => (
            <div key={index}>
              <h3 className="text-3xl font-bold text-[#703BF7]">{data.value}</h3>
              <p className="text-gray-400">{data.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Carousel - Centered */}
      <section className="px-6 md:px-16 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Tamalak?</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] p-6 rounded-lg text-center flex-1 max-w-xs shadow-lg transition-transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="px-6 md:px-16 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg">
              <img src={property.img} alt={property.title} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold mt-4">{property.title}</h3>
              <p className="text-[#703BF7] font-bold mt-2">{property.price}</p>
              <button className="mt-4 bg-[#703BF7] px-4 py-2 rounded-lg hover:bg-[#5f2cc6]">
                View Property
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-16 py-20 bg-[#1a1a1a]">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#252525] p-6 rounded-lg">
              <p className="text-gray-400">{testimonial.text}</p>
              <div className="mt-4 flex items-center">
                <div className="text-yellow-400">{'★'.repeat(testimonial.rating)}</div>
                <p className="ml-2 font-semibold">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="px-6 md:px-16 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="text-gray-400 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-16 py-20 text-center bg-[#1a1a1a]">
        <h2 className="text-3xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
        <p className="text-gray-400 mb-6">Join thousands of happy clients today!</p>
        <button className="bg-[#703BF7] px-6 py-3 rounded-lg hover:bg-[#5f2cc6]">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default HomePage;
