import React from 'react';
//import './Services.css';

const Services: React.FC = () => {
  const services = [
    { title: 'Service 1', description: 'Description of service 1' },
    { title: 'Service 2', description: 'Description of service 2' },
  ];

  return (
    <div className="services">
      {services.map((service, index) => (
        <div key={index} className="service-card">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
