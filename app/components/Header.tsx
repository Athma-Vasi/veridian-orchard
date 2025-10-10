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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const {type: asideType} = useAside();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      '--announcement-height',
      isScrolled ? '0px' : '40px',
    );
    root.style.setProperty('--header-height', isScrolled ? '60px' : '80px');

    const handleScroll = () => {
      if (asideType !== 'closed') {
        return;
      }

      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    // telling browser we will handle the scroll event
    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled, lastScrollY, asideType]);

  return (
    <div className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      {/* announcement bar */}
      <div
        className={`announcement-header-wrapper ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="container">
          <p className="announcement-header">
            Complimentary shipping on orders over $200!
          </p>
        </div>
      </div>

      {/* main header */}
      <header className="main-header-wrapper">
        <div className="container">
          {/* mobile logo (550 and below) */}
          <NavLink prefetch="intent" to="/" className="mobile-logo-navlink" end>
            <h1 className="mobile-logo">Veridian Orchard</h1>
          </NavLink>

          {/* header content */}
          <div className="main-header-content">
            {/* mobile menu toggle */}
            <HeaderMenuMobileToggle />

            {/* logo (above 550px) */}
            <NavLink prefetch="intent" to="/" className="desktop-logo-navlink">
              <h1 className="desktop-logo">Veridian Orchard</h1>
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
            <div className="header-ctas-wrapper">
              <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );

  // return (
  //   <header className="header">
  //     <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
  //       <strong>{shop.name}</strong>
  //     </NavLink>
  //     <HeaderMenu
  //       menu={menu}
  //       viewport="desktop"
  //       primaryDomainUrl={header.shop.primaryDomain.url}
  //       publicStoreDomain={publicStoreDomain}
  //     />
  //     <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
  //   </header>
  // );
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
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  const baseClassName =
    "transition-all duration-200 hover:text-brand-accent font-source relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-brand-accent after:transition-all after:duration-200 hover:after:w-full";
  const desktopClassName =
    'flex items-center justify-center space-x-12 txt-sm uppercase tracking-wider';
  const mobileClassName = 'flex flex-col px-6';

  if (menu === null || menu === undefined || menu.items.length === 0) {
    return null;
  }

  return (
    <nav
      className={viewport === 'desktop' ? desktopClassName : mobileClassName}
      role="navigation"
    >
      {/* mobile */}
      {viewport === 'mobile' && (
        <>
          {/* mobile nav links */}
          <div className="space-y-6 py-4">
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
                    `${baseClassName} text-lg py-2 block ${isActive ? 'text-brand-accent' : 'text-black'}`
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
          <div className="mt-auto border-t border-gray-100 py-6">
            <div className="space-y-4">
              <NavLink
                to="/account"
                className="flex items-center space-x-2 text-brand-accent hover:text-brand-highlight transition-colors duration-200 ease-in-out"
                onClick={close}
                prefetch="intent"
              >
                <User className="w-5 h-5" />
                <span className="font-worksans text-base">Account</span>
              </NavLink>

              <button
                onClick={() => {
                  close();
                }}
                className="flex items-center space-x-2 text-brand-accent hover:text-brand-highlight transition-colors duration-200 ease-in-out"
              >
                <Search className="w-5 h-5" />
                <span className="font-worksans text-base">Search</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* desktop */}
      {viewport === 'desktop' &&
        (menu || FALLBACK_HEADER_MENU).items.map((item) => {
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
                `${baseClassName} ${isActive ? 'text-brand-accent after:w-full' : 'text-black'}`
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
    </nav>
  );

  // return (
  //   <nav className={className} role="navigation">
  //     {viewport === 'mobile' && (
  //       <NavLink
  //         end
  //         onClick={close}
  //         prefetch="intent"
  //         style={activeLinkStyle}
  //         to="/"
  //       >
  //         Home
  //       </NavLink>
  //     )}
  //     {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
  //       if (!item.url) return null;

  //       // if the url is internal, we strip the domain
  //       const url =
  //         item.url.includes('myshopify.com') ||
  //         item.url.includes(publicStoreDomain) ||
  //         item.url.includes(primaryDomainUrl)
  //           ? new URL(item.url).pathname
  //           : item.url;
  //       return (
  //         <NavLink
  //           className="header-menu-item"
  //           end
  //           key={item.id}
  //           onClick={close}
  //           prefetch="intent"
  //           style={activeLinkStyle}
  //           to={url}
  //         >
  //           {item.title}
  //         </NavLink>
  //       );
  //     })}
  //   </nav>
  // );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav
      className="flex items-center space-x-2 sm:space-x-3 lg:space-x-8"
      role="navigation"
    >
      <SearchToggle />
      <NavLink
        prefetch="intent"
        to="/account"
        className="flex items-center space-x-2 text-brand-accent hover:text-brand-highlight transition-colors duration-200 ease-in-out"
      >
        <User className="w-5 h-5" />
        <span className="sr-only">Account</span>
      </NavLink>
      <CartToggle cart={cart} />
    </nav>
  );
  // return (
  //   <nav className="header-ctas" role="navigation">
  //     <HeaderMenuMobileToggle />
  //     <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
  //       <Suspense fallback="Sign in">
  //         <Await resolve={isLoggedIn} errorElement="Sign in">
  //           {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
  //         </Await>
  //       </Suspense>
  //     </NavLink>
  //     <SearchToggle />
  //     <CartToggle cart={cart} />
  //   </nav>
  // );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle p-2 -ml-2 hover:text-brand-accent transition-colors duration-200"
      onClick={() => open('mobile')}
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button
      className="p-2 hover:text-brand-highlight transition-colors duration-200 ease-in-out"
      onClick={() => open('search')}
    >
      <Search className="w-6 h-6" />
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      className="relative p-2 hover:text-brand-highlight transition-colors duration-200 ease-in-out"
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
      <ShoppingBag className="w-5 h-5" />
      {count !== null && count > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-accent text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-worksans">
          {count > 9 ? '9+' : count}
        </span>
      )}
      {count === 0 && (
        <span className="absolute -top-1 -right-1 bg-gray-300 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-worksans">
          0
        </span>
      )}
    </button>
  );

  // return (
  //   <a
  //     href="/cart"
  //     onClick={(e) => {
  //       e.preventDefault();
  //       open('cart');
  //       publish('cart_viewed', {
  //         cart,
  //         prevCart,
  //         shop,
  //         url: window.location.href || '',
  //       } as CartViewPayload);
  //     }}
  //   >
  //     Cart {count === null ? <span>&nbsp;</span> : count}
  //   </a>
  // );
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
