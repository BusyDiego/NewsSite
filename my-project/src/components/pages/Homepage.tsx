import React from 'react';
import { Card } from '../molecules';
import { Text, Button } from '../atoms';
import './HomePage.css';

const newsArticles = [
  {
    id: 1,
    title: 'Breaking: Major Scientific Discovery',
    description: 'Scientists have made a groundbreaking discovery that could change our understanding of the universe.',
    image: { src: 'https://via.placeholder.com/400x200', alt: 'Science' },
  },
  {
    id: 2,
    title: 'Tech Industry Announces New Standards',
    description: 'Leading tech companies come together to establish new industry standards for data privacy.',
    image: { src: 'https://via.placeholder.com/400x200', alt: 'Technology' },
  },
  {
    id: 3,
    title: 'Global Climate Summit Reaches Agreement',
    description: 'World leaders have reached a historic agreement on climate action at the global summit.',
    image: { src: 'https://via.placeholder.com/400x200', alt: 'Climate' },
  },
];

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="content">
        <section className="featured-articles">
          {newsArticles.map((article) => (
            <Card
              key={article.id}
              title={article.title}
              description={article.description}
              image={article.image}
              onClick={() => console.log('Article clicked:', article.id)}
            >
              <Button size="small" variant="primary">Read More</Button>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
};