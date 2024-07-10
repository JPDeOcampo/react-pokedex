import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";



const CardSkeleton = () => {
  return (
    <>
      <div className="skeleton-container">
        <Skeleton
          baseColor="#dddddd"
          highlightColor="#ebebeb"
          className="skeleton-img"
        />
        <Skeleton
          baseColor="#dddddd"
          highlightColor="#ebebeb"
          className="skeleton-name"
        />
        <div className="d-flex justify-content-between w-100">
        <Skeleton
          baseColor="#dddddd"
          highlightColor="#ebebeb"
          className="skeleton-types"
        />
        <Skeleton
          baseColor="#dddddd"
          highlightColor="#ebebeb"
          className="skeleton-types"
        />
        </div>
      </div>
    </>
  );
};

export default CardSkeleton;
