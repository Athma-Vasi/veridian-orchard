import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapIcon,
  Phone,
} from 'lucide-react';
import {Suspense} from 'react';
import {Await, Form, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <div className="footer">
            {/* newsletter signup */}
            <div className="newsletter-signup">
              <h2>Join the Veridian Family. Get Rooted with Us!</h2>
              <p>The First Bloom: New Arrivals & Secret Sales, Delivered.</p>
              <Form className="form">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
                <button type="submit">Subscribe</button>
              </Form>
            </div>

            {/* main footer */}
            <div className="main-container">
              {/* brand column */}
              <div className="brand-column">
                <h2>Our Mission</h2>
                <p>
                  At Veridian Orchard, we cultivate more than just plants; we
                  nurture a community rooted in sustainability, quality, and
                  care. Our mission is to bring the freshest, most vibrant
                  plants from our orchard to your abode, while championing
                  eco-friendly practices that honor the earth.
                </p>

                <div className="social-icons">
                  <a
                    href="https://www.example.com/veridianorchard/"
                    className="instagram"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram />
                  </a>

                  <a
                    href="https://www.example.com/veridianorchard/"
                    className="facebook"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook />
                  </a>

                  <a
                    href="https://www.example.com/veridianorchard/"
                    className="linkedin"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin />
                  </a>
                </div>
              </div>

              {/* contact column */}
              <div className="contact-column">
                <h2>Contact Us</h2>

                <div className="address">
                  <MapIcon />
                  <p>
                    123 Greenhouse Lane
                    <br />
                    Edmonton, AB T5A 0A1
                    <br />
                    Canada
                  </p>
                </div>

                <div className="phone">
                  <Phone />
                  <p>
                    Phone: <a href="tel:+1234567890">(123) 456-7890</a>
                  </p>
                </div>

                <div className="email">
                  <Mail />
                  <p>
                    Email:{' '}
                    <a href="mailto:support@veridian-orchard.com">
                      support@veridian-orchard.com
                    </a>
                  </p>
                </div>
              </div>

              {/* quick links column */}
              <div className="quick-links-column">
                <h2>Quick Links</h2>
                <ul>
                  <li>
                    <NavLink to="/collections/all" style={activeLinkStyle}>
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="pages/our-craft" style={activeLinkStyle}>
                      Our Craft
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="pages/care-guide" style={activeLinkStyle}>
                      Care Guide
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="pages/about-us" style={activeLinkStyle}>
                      About Us
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* policies column */}
              <div className="policies-column">
                <h2>Policies</h2>
                {footer?.menu && header.shop.primaryDomain?.url ? (
                  <FooterMenu
                    menu={footer.menu}
                    primaryDomainUrl={header.shop.primaryDomain.url}
                    publicStoreDomain={publicStoreDomain}
                  />
                ) : (
                  <p>No policies available.</p>
                )}
              </div>
            </div>
            {/* end of main footer */}

            {/* copyright bar */}
            <div className="copyright-bar">
              <p>
                &copy; {new Date().getFullYear()} Veridian Orchard. All rights
                reserved.
              </p>
              <p>Grown with 💚 in Edmonton</p>
            </div>
          </div>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) {
          return null;
        }

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            className={'footer-link'}
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}
