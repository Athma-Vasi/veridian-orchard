import {Suspense, useEffect, useState} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  Image,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {Menu, Search, ShoppingBag, User} from 'lucide-react';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;

  return (
    <header className="main-header-wrapper">
      {/* header content */}
      <div className="main-header-content">
        {/* mobile menu toggle */}
        <HeaderMenuMobileToggle />

        <NavLink prefetch="intent" to="/" className="logo-navlink">
          <h1 className="logo">Veridian Orchard</h1>
        </NavLink>

        {/* desktop navigation */}
        <div className="main-header-nav-wrapper">
          <HeaderMenu
            menu={menu}
            viewport="desktop"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
        </div>

        {/* header call to actions */}
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </header>
  );

  
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const {close} = useAside();

  if (menu === null || menu === undefined || menu.items.length === 0) {
    return null;
  }

  return (
    <nav
      className={
        viewport === 'desktop'
          ? 'main-header-nav-desktop'
          : 'main-header-nav-mobile'
      }
      role="navigation"
    >
      {/* mobile */}
      {viewport === 'mobile' && (
        <div className="mobile-navigation">
          {/* mobile nav links */}
          <div className="navlinks-mobile">
            {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
              if (!item.url) return null;

              // if the url is internal, we strip the domain
              const url =
                // development store
                item.url.includes('myshopify.com') ||
                // custom domain
                // veridian-orchard.com/collections
                item.url.includes(publicStoreDomain) ||
                // primary domain
                // store.veridian-orchard.com/collections
                item.url.includes(primaryDomainUrl)
                  ? // internal link - strip the domain
                    // /collections
                    new URL(item.url).pathname
                  : // external link - leave the url as is
                    // ex: to parner link : https://partners.shopify.com/123456
                    item.url;

              return (
                <NavLink
                  className={({isActive}) =>
                    // `${baseClassName} text-lg py-2 block ${isActive ? 'text-brand-accent' : 'text-black'}`
                    `navlink-mobile ${isActive ? 'active' : ''}`
                  }
                  // end is used to apply active styles only when the path matches exactly
                  end
                  key={item.id}
                  onClick={close}
                  prefetch="intent"
                  to={url}
                >
                  {item.title}
                </NavLink>
              );
            })}
          </div>

          {/* mobile footer links */}
          <div className="footer-navlinks-mobile">
            <NavLink
              to="/"
              className="navlink-mobile"
              onClick={close}
              prefetch="intent"
            >
              <div className="navlink-icon-text">
                <User className="cta-icon" />
                <span className="navlink-text">Account</span>
              </div>
            </NavLink>

            <button
              onClick={() => {
                close();
              }}
              className="footer-button-mobile"
            >
              <div className="button-icon-text">
                <Search className="cta-icon" />
                <span className="button-text">Search</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* desktop */}
      {viewport === 'desktop' && (
        <div className="navlinks-desktop">
          {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
            if (!item.url) return null;

            // if the url is internal, we strip the domain
            const url =
              // development store
              item.url.includes('myshopify.com') ||
              // custom domain
              // veridian-orchard.com/collections
              item.url.includes(publicStoreDomain) ||
              // primary domain
              // store.veridian-orchard.com/collections
              item.url.includes(primaryDomainUrl)
                ? // internal link - strip the domain
                  // /collections
                  new URL(item.url).pathname
                : // external link - leave the url as is
                  // ex: to parner link : https://partners.shopify.com/123456
                  item.url;

            return (
              <NavLink
                className={({isActive}) =>
                  `navlink-desktop ${isActive ? 'active' : ''}`
                }
                // end is used to apply active styles only when the path matches exactly
                end
                key={item.id}
                onClick={close}
                prefetch="intent"
                to={url}
              >
                {item.title}
              </NavLink>
            );
          })}
        </div>
      )}
    </nav>
  );


}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <SearchToggle />
      <NavLink prefetch="intent" to="/" className="account-cta">
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) =>
              isLoggedIn ? (
                <>
                  <User className="cta-icon" />
                  <span className="accessible-hidden">Account</span>
                </>
              ) : (
                <>
                  <User className="cta-icon" />
                  <span className="accessible-hidden">Sign in</span>
                </>
              )
            }
          </Await>
        </Suspense>
      </NavLink>
      <CartToggle cart={cart} />
    </nav>
  );


function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle"
      onClick={() => open('mobile')}
    >
      <Menu className="cta-icon" />
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="search-toggle-cta" onClick={() => open('search')}>
      <Search className="cta-icon" />
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      className="cart-badge-cta"
      onClick={() => {
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      <ShoppingBag className="cta-icon" />
      {count !== null && count > 0 && (
        <span className="badge">{count > 9 ? '9+' : count}</span>
      )}
      {count === 0 && <span className="badge">0</span>}
    </button>
  );

  
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
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
    color: isPending ? 'grey' : 'black',
  };
}
