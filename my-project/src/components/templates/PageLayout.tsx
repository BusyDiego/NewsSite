import React from 'react';
import { Header, Footer } from '../organisms';
import './PageLayout.css';

interface PageLayoutProps {
  children: React.ReactNode;
  headerTitle: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  showSearch?: boolean;
  navItems?: { label: string; onClick: () => void }[];
  footerCopyright: string;
  footerLinks?: { label: string; href: string }[];
  footerSocialLinks?: { platform: string; href: string }[];
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  headerTitle,
  searchValue,
  onSearchChange,
  onSearch,
  showSearch,
  navItems,
  footerCopyright,
  footerLinks,
  footerSocialLinks,
}) => {
  return (
    <div className="page-layout">
      <Header
        title={headerTitle}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        onSearch={onSearch}
        showSearch={showSearch}
        navItems={navItems}
      />
      
      <main className="page-layout-main">
        <div className="page-layout-container">
          {children}
        </div>
      </main>
      
      <Footer
        copyrightText={footerCopyright}
        links={footerLinks}
        socialLinks={footerSocialLinks}
      />
    </div>
  );
};