import type { Coffee } from '../../models/Coffee';
import { coffees } from '../../data/coffees';
import { CoffeeCard } from './CoffeeCard';
import './CoffeeMenu.css';

interface CoffeeMenuProps {
  onAddToCart: (coffee: Coffee) => void;
}

export function CoffeeMenu({ onAddToCart }: CoffeeMenuProps) {
  return (
    <section className="coffee-menu" data-testid="coffee-menu">
      <h2 className="coffee-menu__title">Our Menu</h2>
      <div className="coffee-menu__grid">
        {coffees.map((coffee) => (
          <CoffeeCard
            key={coffee.id}
            coffee={coffee}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
