import React from 'react';

// Try to find the best title and image from different API shapes
const titleOf = (item) =>
  item?.title || item?.name || item?.slug || item?.id || 'Untitled';

const imageOf = (item) =>
  item?.image || item?.img || item?.poster || item?.cover || item?.picture || '';

export default function AnimeGrid({ items = [], emptyText = 'No results' }) {
  if (!items.length) {
    return <p className="opacity-70">{emptyText}</p>;
  }

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
      {items.map((it, idx) => (
        <div key={it?._id || it?.id || it?.slug || idx} className="rounded-lg shadow p-2 bg-white text-black">
          <div className="w-full aspect-[3/4] bg-gray-200 overflow-hidden rounded">
            {imageOf(it) ? (
              <img src={imageOf(it)} alt={titleOf(it)} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm opacity-60">No image</div>
            )}
          </div>
          <div className="mt-2 text-sm font-medium line-clamp-2">{titleOf(it)}</div>
          {/* If you want a detail link later, you can add a button here */}
        </div>
      ))}
    </div>
  );
}
