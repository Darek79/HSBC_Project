interface CompProps {
  mediasize: string;
  mediasize1: string;
  clPicture: string;
}

export const Picture: React.FC<CompProps> = ({
  mediasize,
  mediasize1,
  clPicture,
}) => (
  <picture className={clPicture}>
    <source
      srcSet={
        "https://via.placeholder.com/400x350/500"
      }
      media={`(min-width:${mediasize}px)`}
    />
    <source
      srcSet={
        "http://placeimg.com/450/350/nature"
      }
      media={`(min-width:${mediasize1}px)`}
    />
    <img
      alt="test"
      src={"http://placeimg.com/450/350/animals"}
    />
  </picture>
);
// 'https://i.picsum.photos/id/1011/450/600/'
// "http://placeimg.com/450/600/nature"
