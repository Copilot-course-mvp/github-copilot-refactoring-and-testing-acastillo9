import type { Coffee } from '../../models/Coffee';
import { formatPrice } from '../../utils/priceFormatter';
import './CoffeeCard.css';

interface CoffeeCardProps {
  coffee: Coffee;
  onAddToCart: (coffee: Coffee) => void;
}

export function CoffeeCard({ coffee, onAddToCart }: CoffeeCardProps) {
  return (
    <div className="coffee-card" data-testid={`coffee-card-${coffee.id}`}>
      <span className="coffee-card__emoji">{coffee.imageEmoji}</span>
      <h3 className="coffee-card__name">{coffee.name}</h3>
      <p className="coffee-card__description">{coffee.description}</p>
      <div className="coffee-card__footer">
        <span className="coffee-card__price">{formatPrice(coffee.price)}</span>
        <button
          className="coffee-card__button"
          onClick={() => onAddToCart(coffee)}
          aria-label={`Add ${coffee.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
