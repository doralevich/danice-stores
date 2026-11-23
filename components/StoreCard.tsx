import { directionsUrl, type Store } from "@/data/stores";
import { OpenStatus } from "./OpenStatus";

export function StoreCard({ store }: { store: Store }) {
  return (
    <article className="flex flex-col border border-plum/20 p-6">
      <h3 className="text-2xl leading-tight font-bold">{store.streetName}</h3>
      <p className="mt-2 text-lg leading-snug">
        {store.street}
        <br />
        {store.city}, {store.state} {store.zip}
      </p>
      {store.hours ? (
        <div className="mt-3">
          <OpenStatus hours={store.hours} />
        </div>
      ) : null}
      <p className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-5 text-lg font-semibold">
        <a
          href={directionsUrl(store)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-magenta-deep underline underline-offset-4 hover:text-plum"
        >
          Get directions
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        {store.phone ? (
          <a
            href={`tel:${store.phone.replace(/\D/g, "")}`}
            className="text-magenta-deep underline underline-offset-4 hover:text-plum"
          >
            Call the store
          </a>
        ) : null}
      </p>
      {store.verified ? null : (
        <p className="mt-4 text-sm text-plum/70">Sample for layout. Hidden on the live site.</p>
      )}
    </article>
  );
}
