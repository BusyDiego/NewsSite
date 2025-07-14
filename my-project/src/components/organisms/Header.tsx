import React from 'react';
import { Text, Button } from '../atoms';
import { SearchBar } from '../molecules';
import './Header.css';

interface HeaderProps {
  title: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  showSearch?: boolean;
  navItems?: { label: string; onClick: () => void }[];
}

export const Header: React.FC<HeaderProps> = ({
  title,
  searchValue = '',
  onSearchChange,
  onSearch,
  showSearch = false,
  navItems = [],
}) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Text variant="h2" className="header-title">
            {title}
          </Text>
        </div>
        
        {navItems.length > 0 && (
          <nav className="header-nav">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="secondary"
                size="small"
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        )}
        
        {showSearch && onSearchChange && onSearch && (
          <div className="header-search">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              onSearch={onSearch}
            />
          </div>
        )}
      </div>
    </header>
  );
};