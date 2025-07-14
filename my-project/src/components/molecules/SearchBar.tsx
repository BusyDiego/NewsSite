import React from 'react';
import { Input, Button } from '../atoms';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Button type="submit" variant="primary">
        Search
      </Button>
    </form>
  );
};