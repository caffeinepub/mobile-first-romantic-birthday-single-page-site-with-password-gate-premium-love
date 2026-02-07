import FlipImageCard from '../components/gallery/FlipImageCard';
import { imageGalleryData } from '../content/mediaPlaceholders';
import { romanticMessages } from '../content/romanticMessages';

export default function ImageMemorySection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background via-romantic-blush/20 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-romantic-rose mb-4">
            Our Beautiful Memories 📸
          </h2>
          <p className="text-lg text-muted-foreground">
            Tap each photo to reveal a special message 💕
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageGalleryData.map((image, index) => (
            <FlipImageCard
              key={index}
              imageSrc={image.src}
              message={romanticMessages[index % romanticMessages.length]}
              cardId={`${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
