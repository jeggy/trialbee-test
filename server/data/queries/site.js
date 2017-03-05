import SiteType from '../types/SiteType';

export default {
  type: SiteType,
  resolve: (_, args) => {
    return {
      title: 'Trialbee',
      about: 'Trialbee is a dynamic software company with a single purpose of accelerating clinical research. We provide innovative software solutions that optimize the clinical trial process by enabling all stakeholders to easily communicate and collaborate on a joint platform.',
      cards: [
        {
          title: "Our Services",
          image: {
            path: '/images/services.png',
            alt: 'Services'
          },
          link: {
            url: "/about",
            text: "Services"
          },
          text: "Trialbee is an independent software and service provider specialized in clinical research applications. We are experts of e-recruitment, study retention and EDC solutions."
        },
        {
          title: "Customers say",
          image: {
            path: '/images/customers.png',
            alt: 'Customers'
          },
          link: {
            url: "/about",
            text: "Contact Us"
          },
          text: "\"Working with Trialbee really simplified our efforts finding patients. Trialbee opened new channels for patient recruitment and helped us increase the recruitment rates.\""
        },
        {
          title: "Our goal",
          image: {
            path: '/images/goal.png',
            alt: 'Goals'
          },
          link: {
            url: "/about",
            text: "About Us"
          },
          text: "Trialbee is a dynamic software company with a single purpose of accelerating clinical trials. Our mission is to help bring groundbreaking treatments to the patients faster."
        }
      ]};
  }
}
