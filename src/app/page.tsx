import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import BrandStory from '@/components/BrandStory';
import Testimonials from '@/components/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <BrandStory />
      <Testimonials />
    </>
  );
}
