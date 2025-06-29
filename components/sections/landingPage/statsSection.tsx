import FadeInWhenVisible from "@/components/ui/FadeInWhenVisible";

export default function StatsSection() {
    return (
      <section className="py-20 px-4 lg:px-32 bg-gradient-to-r from-orange-500 to-red-500">
        <FadeInWhenVisible>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-orange-100">Active Suppliers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50,000+</div>
                <div className="text-orange-100">Products Listed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <div className="text-orange-100">Professionals</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1,000+</div>
                <div className="text-orange-100">Active Projects</div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>
    )
}