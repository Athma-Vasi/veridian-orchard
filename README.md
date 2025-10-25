# 🌿 Veridian Orchard: E-Commerce Platform

A high-performance, fully custom e-commerce solution built on the Shopify platform for a specialty houseplant and gardening supply retailer. This project demonstrates advanced Shopify Theme Development, custom Front-End Engineering, and Back-End integration using the native Shopify Liquid and API ecosystem.

## 🎯 Project Goals and Technical Highlights

| Feature                    | Technical Achievement                                                                                                                                                                                                                                                                                                                                             |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headless Commerce          | Implemented the storefront using Shopify Hydrogen (React framework), establishing a fast, decoupled, and scalable front-end powered by the Shopify Storefront API.                                                                                                                                                                                                |
| Data Architecture          | Architected and implemented comprehensive data models utilizing Shopify's Metafields for custom product attributes (e.g., Care Instructions, Locally Sourced) and Metaobjects for structured, reusable content.                                                                                                                                                   |
| Front-End Performance      | Achieved excellent loading speed and a seamless user experience by refactoring and customizing the base theme's JavaScript and CSS, adhering to modern web standards (e.g., using native CSS).                                                                                                                                                                    |
| User Experience (UX)       | Built dynamic, interactive collection pages, enhancing product discovery for users with specific needs (e.g., "Easy Care" or "Air Purifying" collections).                                                                                                                                                                                                        |
| Theme Customization        | Extensive modification of core Hydrogen files, including a custom design template, ensuring a unique brand identity while retaining full compatibility with the Shopify Admin Editor. Designed and developed complex UI components (e.g., filtering, image galleries, cart) using React Hooks, custom component architecture, and modern styling with native CSS. |
| Maintenance & Scalability  | Developed using a modular approach, facilitating easy content updates by the client via the Shopify Admin without touching code.                                                                                                                                                                                                                                  |
| Custom Checkout Experience | Enhanced the checkout process with custom scripts and features to improve conversion rates.                                                                                                                                                                                                                                                                       |
| SEO & AI Best Practices    | Utilized React Server Components (via Hydrogen's architecture) for server-side data fetching and rendering, resulting in near-instantaneous page loads and superior SEO performance. Ensured the platform adheres to SEO best practices to improve search engine rankings and visibility by AI                                                                    |

## 🛠️ Tech Stack

| Category             | Tools & Technologies                           |
| -------------------- | ---------------------------------------------- |
| Front-end Framework  | Shopify Hydrogen (React framework with Vite)   |
| Platform Integration | Shopify Storefront API (for all data fetching) |
| Styling              | Latest native CSS styling.                     |
| Languages            | TypeScript, JavaScript (ES6+), HTML5, CSS3     |

## Key Architectural Decisions and Rationale

- **Headless Commerce with Hydrogen**: Chose Shopify Hydrogen to leverage its optimized React framework tailored for Shopify, enabling a decoupled architecture that enhances performance and scalability.
- **Data Modeling with Metafields and Metaobjects**: Utilized Shopify's Metafields and Metaobjects to create flexible, structured data models that support complex product attributes and reusable content, facilitating easier management and scalability.
- **Performance Optimization**: Focused on optimizing front-end performance through code refactoring, efficient data fetching strategies, and adherence to modern web standards, ensuring a fast and seamless user experience.
- **Modular Design for Maintainability**: Adopted a modular approach in theme development, allowing for easy updates and maintenance by the client without requiring code changes, thus ensuring long-term sustainability of the platform.
- **Cart Management**: Implemented advanced cart functionalities using React Hooks and context to provide a dynamic and responsive shopping experience, enhancing user engagement and conversion rates.
- **TypeScript Adoption**: Leveraged TypeScript for type safety and improved developer experience, reducing runtime errors and enhancing code maintainability.

## 🚀 Getting Started

To set up the project locally, follow these steps:

This project is a standard Hydrogen application.

Prerequisites: Node.js, npm/yarn/pnpm, and a Shopify Private App configured for Storefront API access.

Clone the Repository: git clone git@github.com:Athma-Vasi/veridian-orchard.git

Install Dependencies: npm install

Configure Environment: Create a .env file and set the required Shopify Storefront API credentials.

Run Locally: npm run dev

## Author

- Athma Vasi - [GitHub](https://github.com/Athma-Vasi) | [Email](mailto:athma.vasi@protonmail.com)
