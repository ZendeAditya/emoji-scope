/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
type Props = {};

const ProductHunt = (props: Props) => {
  return (
    <div className="flex items-center justify-center py-10">
      <a
        href="https://www.producthunt.com/posts/emoji-scope?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-emoji&#0045;scope"
        target="_blank"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=480360&theme=neutral"
          alt="producthunt"
          width={400}
          height={400}
        />
      </a>
    </div>
  );
};

export default ProductHunt;
