'use client';

export function AddressSection() {
  return (
    <section className="page-container bg-white">
      <div className="flex flex-col py-5 lg:flex-row">
        {/* First Column: Address Title (25%) */}
        <div className="mb-8 w-full lg:mb-0 lg:w-1/4">
          <div className="pr-8">
            <h2 className="h2">Địa chỉ</h2>
          </div>
        </div>

        {/* Second Column: Google Map (75%) */}
        <div className="w-full lg:w-3/4">
          <div className="relative h-[716px] w-full overflow-hidden bg-[#d9d9d9]">
            {/* Google Maps Embed */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14877.95966437759!2d105.26059141661106!3d21.21241285408431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134891011e03cad%3A0xb8e91a32073cbe5e!2zS2h1IDgsIMSQw6BvIFjDoSwgVGhhbmggVGjhu6d5IERpc3RyaWN0LCBQaMO6IFRo4buNLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1757186329681!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'grayscale(100%) contrast(1.3)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vina WPC Location"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
