"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, Row, ToggleButton, Column } from "@once-ui-system/core";

import { routes, display, person, about, blog, work, gallery } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Fade fillWidth position="fixed" height="80" zIndex={9} />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
      >
        <div style={{ maxWidth: '1500px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '12px', paddingRight: '12px' }}>
          {/* Logo */}
          <Row gap="12" vertical="center" style={{ flex: '0 0 auto' }}>
            <img src="/trademarks/isotipo.png" alt="Pablo Lacán" style={{ width: '40px', height: '40px' }} />
            <img src="/trademarks/logo-dark.png" alt="Pablo Lacán" style={{ height: '28px', width: 'auto', display: 'none' }} className="desktop-logo" />
          </Row>

          {/* Menú Central - Desktop */}
          <div style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }} className="desktop-menu">
            <Row fillWidth horizontal="center" style={{ maxWidth: 'fit-content' }}>
              <Row
                background="page"
                border="neutral-alpha-weak"
                radius="m-4"
                shadow="l"
                padding="4"
                horizontal="center"
                zIndex={1}
              >
                <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
                  {routes["/"] && (
                    <ToggleButton
                      href="/"
                      label="Inicio"
                      selected={pathname === "/"}
                    />
                  )}
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  {routes["/about"] && (
                    <>
                      <Row s={{ hide: true }}>
                        <ToggleButton
                          prefixIcon="person"
                          href="/about"
                          label={about.label}
                          selected={pathname === "/about"}
                        />
                      </Row>
                      <Row hide s={{ hide: false }}>
                        <ToggleButton
                          prefixIcon="person"
                          href="/about"
                          selected={pathname === "/about"}
                        />
                      </Row>
                    </>
                  )}
                  {routes["/work"] && (
                    <>
                      <Row s={{ hide: true }}>
                        <ToggleButton
                          prefixIcon="grid"
                          href="/work"
                          label={work.label}
                          selected={pathname.startsWith("/work")}
                        />
                      </Row>
                      <Row hide s={{ hide: false }}>
                        <ToggleButton
                          prefixIcon="grid"
                          href="/work"
                          selected={pathname.startsWith("/work")}
                        />
                      </Row>
                    </>
                  )}
                  {routes["/blog"] && (
                    <>
                      <Row s={{ hide: true }}>
                        <ToggleButton
                          prefixIcon="book"
                          href="/blog"
                          label={blog.label}
                          selected={pathname.startsWith("/blog")}
                        />
                      </Row>
                      <Row hide s={{ hide: false }}>
                        <ToggleButton
                          prefixIcon="book"
                          href="/blog"
                          selected={pathname.startsWith("/blog")}
                        />
                      </Row>
                    </>
                  )}
                  {routes["/gallery"] && (
                    <>
                      <Row s={{ hide: true }}>
                        <ToggleButton
                          prefixIcon="gallery"
                          href="/gallery"
                          label={gallery.label}
                          selected={pathname.startsWith("/gallery")}
                        />
                      </Row>
                      <Row hide s={{ hide: false }}>
                        <ToggleButton
                          prefixIcon="gallery"
                          href="/gallery"
                          selected={pathname.startsWith("/gallery")}
                        />
                      </Row>
                    </>
                  )}
                  {display.themeSwitcher && (
                    <>
                      <Line background="neutral-alpha-medium" vert maxHeight="24" />
                      <ThemeToggle />
                    </>
                  )}
                </Row>
              </Row>
            </Row>
          </div>

          {/* Derecha - Desktop */}
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-menu">
            {display.themeSwitcher && <ThemeToggle />}
            <a
              href="https://core.pablolacan.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.875rem',
                color: 'var(--neutral-on-background-strong)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid var(--neutral-alpha-weak)',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              ¿Eres cliente? Login →
            </a>
          </div>

          {/* Hamburger - Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              flex: '0 0 auto',
            }}
            className="mobile-menu-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </Row>

      {/* Mobile Offcanvas Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            animation: 'fadeIn 0.2s',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '80%',
              maxWidth: '400px',
              background: 'var(--page-background)',
              padding: '24px',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
              overflowY: 'auto',
              animation: 'slideInRight 0.3s',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src="/trademarks/logo-dark.png" alt="Pablo Lacán" style={{ height: '28px', width: 'auto' }} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '32px',
                    lineHeight: '1',
                    padding: '0',
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '32px' }}>
                {routes["/"] && (
                  <a href="/" style={{ padding: '12px', fontSize: '1.125rem', fontWeight: '500', textDecoration: 'none', color: pathname === "/" ? 'var(--brand-on-background-strong)' : 'var(--neutral-on-background-strong)', borderRadius: '8px', transition: 'background 0.2s' }}>
                    Inicio
                  </a>
                )}
                {routes["/about"] && (
                  <a href="/about" style={{ padding: '12px', fontSize: '1.125rem', fontWeight: '500', textDecoration: 'none', color: pathname === "/about" ? 'var(--brand-on-background-strong)' : 'var(--neutral-on-background-strong)', borderRadius: '8px', transition: 'background 0.2s' }}>
                    {about.label}
                  </a>
                )}
                {routes["/work"] && (
                  <a href="/work" style={{ padding: '12px', fontSize: '1.125rem', fontWeight: '500', textDecoration: 'none', color: pathname.startsWith("/work") ? 'var(--brand-on-background-strong)' : 'var(--neutral-on-background-strong)', borderRadius: '8px', transition: 'background 0.2s' }}>
                    {work.label}
                  </a>
                )}
                {routes["/blog"] && (
                  <a href="/blog" style={{ padding: '12px', fontSize: '1.125rem', fontWeight: '500', textDecoration: 'none', color: pathname.startsWith("/blog") ? 'var(--brand-on-background-strong)' : 'var(--neutral-on-background-strong)', borderRadius: '8px', transition: 'background 0.2s' }}>
                    {blog.label}
                  </a>
                )}
              </div>

              <div style={{ height: '1px', background: 'var(--neutral-alpha-weak)', margin: '24px 0' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {display.themeSwitcher && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px' }}>
                    <span style={{ fontSize: '0.875rem' }}>Tema</span>
                    <ThemeToggle />
                  </div>
                )}
                <a
                  href="https://core.pablolacan.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--brand-on-background-medium)',
                    color: 'var(--brand-on-background-strong)',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                  }}
                >
                  ¿Eres cliente? Login →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
