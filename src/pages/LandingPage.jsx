import React  from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Calendar, 
  Users, 
  Globe, 
  ArrowRight, 
  Sun,
  Moon
} from 'react-feather';
import Navbar from '../components/common/Navbar';

const LandingPage = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-500">
        <Navbar/>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20" />
        <div className="container mx-auto px-4 z-10">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Schedule Smarter, Live Better
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Transform your booking experience with our intelligent scheduling platform. Perfect for professionals, teams, and businesses.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/register"
                  className="group flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
  onClick={toggleDarkMode}
  className="px-6 py-3 text-lg font-medium border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
>
  {darkMode ? (
    <>
      <Sun className="inline-block w-5 h-5 mr-2" />
      Light
    </>
  ) : (
    <>
      <Moon className="inline-block w-5 h-5 mr-2" />
      Dark
    </>
  )}
</button>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="hidden md:block"
            >
              {/* Add your hero image here */}
              <img 
                src="/path-to-your-hero-image.svg" 
                alt="Scheduling Illustration"
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Everything you need for seamless scheduling</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <h4 className="text-4xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</h4>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-4xl font-bold text-white">Ready to Transform Your Scheduling?</h2>
            <p className="text-xl text-blue-100">Join thousands of satisfied users who have simplified their booking process</p>
            <Link
              to="/register"
              className="inline-block px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-12">
        {/* Add your footer content here */}
      </footer>
    </div>
  );
};

const features = [
  {
    icon: <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Smart Scheduling",
    description: "Intelligent booking system that adapts to your availability and preferences."
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Timezone Intelligence",
    description: "Automatic timezone detection and conversion for global scheduling."
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Team Coordination",
    description: "Effortlessly manage team availability and group bookings."
  },
  // Add more features as needed
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "1M+", label: "Bookings Made" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" }
];

export default LandingPage;
