import React from 'react';
import { Text } from '../atoms';
import './Footer.css';

interface FooterProps {
  copyrightText: string;
  links?: { label: string; href: string }[];
  socialLinks?: { platform: string; href: string }[];
}

export const Footer: React.FC<FooterProps> = ({
  copyrightText,
  links = [],
  socialLinks = [],
}) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {links.length > 0 && (
          <div className="footer-links">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
        
        {socialLinks.length > 0 && (
          <div className="footer-social">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
              >
                {social.platform}
              </a>
            ))}
          </div>
        )}
        
        <div className="footer-copyright">
          <Text variant="caption" color="muted">
            {copyrightText}
          </Text>
        </div>
      </div>
    </footer>
  );
};