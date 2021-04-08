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
        "https://via.placeholder.com/400x350/500"
      }
      media={`(min-width:${mediasize}px)`}
    />
    <img
      alt="test"
      src={"http://placeimg.com/640/480/animals"}
    />
  </picture>
);
// 'https://i.picsum.photos/id/1011/450/600/'
// "http://placeimg.com/450/600/nature"
