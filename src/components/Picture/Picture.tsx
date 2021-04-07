interface CompProps {
  mediasize: string;

  clPicture: string;
}

export const Picture: React.FC<CompProps> = ({
  mediasize,
  clPicture,
}) => (
  <picture className={clPicture}>
    <source
      srcSet={
        "http://placeimg.com/450/600/nature"
      }
      media={`(min-width:${mediasize}px)`}
    />
    <img
      alt="test"
      src={"http://placeimg.com/640/480/animals"}
    />
  </picture>
);
