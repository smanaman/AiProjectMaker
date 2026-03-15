import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Layout } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-5 bg-light border-top border-bottom">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <motion.div 
            className="col-lg-6"
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" 
              alt="Team Work" 
              className="img-fluid rounded-4 shadow-lg"
            />
          </motion.div>
          <motion.div 
            className="col-lg-6"
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
          >
            <h2 className="display-6 fw-bold text-dark mb-4">Empowering Developers to Build Faster</h2>
            <p className="text-secondary mb-4 fs-5">
              We bridge the gap between idea and execution. Our AI understands your 
              logic and builds scalable architecture based on industry best practices.
            </p>
            <div className="row g-4">
              <div className="col-sm-6">
                <div className="p-4 bg-white rounded-3 shadow-sm border h-100">
                  <Zap className="text-primary mb-3" size={28} />
                  <h5 className="fw-bold">Instant Setup</h5>
                  <p className="small text-muted mb-0">Zero manual configuration needed.</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-4 bg-white rounded-3 shadow-sm border h-100">
                  <Layout className="text-primary mb-3" size={28} />
                  <h5 className="fw-bold">Clean Code</h5>
                  <p className="small text-muted mb-0">Readable & Maintainable architecture.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;