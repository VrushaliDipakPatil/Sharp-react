import React from "react";
import Link from 'next/link';

const NewsPage = () => {
  return (
    <>
      <ul>
        <li>
          <Link href="/news/next-js-greate"> Next jjs is great framework</Link>
        </li>
        <li>
          <Link href="/news/something else">something else article</Link>
        </li>
      </ul>
    </>
  );
};

export default NewsPage;
