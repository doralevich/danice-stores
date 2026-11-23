import { directionsUrl, type Store } from "@/data/stores";
import { OpenStatus } from "./OpenStatus";

// A garment hang tag: one clipped corner, one punched hole. Store details only.
export function HangTag({ store }: { store: Store }) {
  return (
    <article className="hang-tag relative flex flex-col bg-white px-6 pt-14 pb-6">
      <span className="absolute top-5 left-6 size-5 rounded-full bg-blush" aria-hidden="true" />
      <h3 className="font-display text-3xl text-magenta">{store.streetName}</h3>
      <p className="mt-3 text-lg leading-snug">
        {store.street}
        <br />
        {store.city}, {store.state} {store.zip}
      </p>
      <div className="mt-3 text-lg">
        {store.hours ? <OpenStatus hours={store.hours} /> : null}
      </div>
      <p className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-5 text-lg font-semibold">
        <a
          href={directionsUrl(store)}
          className="underline underline-offset-4 hover:text-magenta"
        >
          Get directions
        </a>
        {store.phone ? (
          <a
            href={`tel:${store.phone.replace(/\D/g, "")}`}
            className="underline underline-offset-4 hover:text-magenta"
          >
            Call the store
          </a>
        ) : null}
      </p>
      {store.verified ? null : (
        <p className="mt-4 border-t border-plum/30 pt-3 text-base">
          Sample store for layout. Not confirmed, hidden on the live site.
        </p>
      )}
    </article>
  );
}
