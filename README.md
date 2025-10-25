# 🌿 Veridian Orchard: E-Commerce Platform

A high-performance, fully custom e-commerce solution built on the Shopify platform for a specialty houseplant and gardening supply retailer. This project demonstrates advanced Shopify Theme Development, custom Front-End Engineering, and Back-End integration using the native Shopify Hydrogen & Oxygen ecosystem.

## 🛠️ Tech Stack

| Category             | Tools & Technologies                           |
| -------------------- | ---------------------------------------------- |
| Front-end Framework  | Shopify Hydrogen (React framework with Vite)   |
| Platform Integration | Shopify Storefront API (for all data fetching) |
| Styling              | Latest native CSS styling.                     |
| Languages            | TypeScript, HTML5, CSS3                        |

## Key Architectural Decisions and Rationale

- **Headless Commerce with Hydrogen**: Chose Shopify Hydrogen to leverage its optimized React framework tailored for Shopify, enabling a decoupled architecture that enhances performance and scalability.
- **Data Modeling with Metafields and Metaobjects**: Utilized Shopify's Metafields and Metaobjects to create flexible, structured data models that support complex product attributes and reusable content, facilitating easier management and scalability.
- **Theme Customization**: Extensively modified core Hydrogen files to create a unique design while ensuring compatibility with Shopify's Admin Editor, allowing the client to manage content without code changes.
- **Performance Optimization**: Focused on optimizing front-end performance through code refactoring, efficient data fetching strategies, and adherence to modern web standards (e.g., using native CSS), ensuring a fast and seamless user experience.
- **Modular Design for Maintainability**: Adopted a modular approach in theme development, allowing for easy updates and maintenance by the client without requiring code changes, thus ensuring long-term sustainability of the platform.
- **Cart Management**: Implemented advanced cart functionalities using React Hooks and context to provide a dynamic and responsive custom shopping experience, enhancing user engagement and conversion rates.
- **TypeScript Adoption**: Leveraged TypeScript for type safety and improved developer experience, reducing runtime errors and enhancing code maintainability.
- **SEO and AI Best Practices**: Ensured the platform adheres to SEO best practices and optimized for AI-driven search engines by utilizing React Server Components for server-side rendering, resulting in improved search engine rankings and visibility.

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
