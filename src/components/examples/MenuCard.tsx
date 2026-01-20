import { MenuCard } from '../MenuCard';
import heroBiryani from '@assets/generated_images/Hero_biryani_dish_61b2c449.png';

const mockItem = {
  id: "1",
  name: "Chicken Biryani",
  description: "Aromatic basmati rice layered with tender chicken, saffron, and traditional spices",
  price: "12.99",
  category: "Biriyani",
  image: "chicken-biryani",
  isVegetarian: false,
  spiceLevel: 3,
  rating: "4.8",
  isAvailable: true,
  dietaryInfo: ["Gluten-Free"],
};

export default function MenuCardExample() {
  return (
    <div className="max-w-sm">
      <MenuCard item={mockItem} imageUrl={heroBiryani} />
    </div>
  );
}
