import { AspectRatio } from '@radix-ui/react-aspect-ratio';

export default function Home() {
  return (
    <>
      <div className="bg-card -m-6">
        <div className="relative isolate pt-14">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true">
            <defs>
              <pattern
                id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse">
                <path
                  d="M100 200V.5M.5 .5H200"
                  fill="none"
                />
              </pattern>
            </defs>
            <svg
              x="50%"
              y={-1}
              className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
            />
          </svg>
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight sm:text-6xl">RadiX</h1>
              <p className="mt-6 text-lg leading-8 text-secondary-foreground">
                Încarcă radiografiile pulmonare și primește predicții precise în timp real, ajutând la identificarea
                precoce a afecțiunilor și la îmbunătățirea procesului de tratament. Aducem inteligența artificială în
                colaborare cu medicii pentru a oferi soluții rapide și eficiente în diagnosticarea și managementul
                sănătății pulmonare.
              </p>
            </div>
            <div className="sm:mt-[75px] flex-shrink-0 flex-grow">
              <AspectRatio ratio={16 / 9}>
                <img
                  className="w-[386px] rounded-lg object-cover"
                  src="assets/firstpage-image.webp"
                  alt=""
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
